import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { configuration, shippingAddress, billingAddress } = await req.json();
    
    if (!configuration) {
      throw new Error("Configuration is required");
    }

    // Initialize Supabase with service role key for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user (optional for guest checkout)
    let user = null;
    let email = "guest@example.com";
    
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
      if (user?.email) {
        email = user.email;
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Calculate total amount (convert from euros to cents)
    const totalAmount = Math.round(configuration.totalPrice * 100);

    // Create order record
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_id: user?.id || null,
        email,
        total_amount: totalAmount,
        currency: "EUR",
        configuration,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        status: "pending"
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `TIM ${configuration.selectedProduct.name}`,
              description: `Your customized TIM configuration`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/website/success?order_id=${order.id}`,
      cancel_url: `${req.headers.get("origin")}/website/configure`,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order with Stripe session ID
    await supabaseClient
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return new Response(JSON.stringify({ url: session.url, order_id: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});