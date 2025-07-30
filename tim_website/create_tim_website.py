import os
import zipfile
from datetime import datetime

# Define output directory inside the user's Documents folder for Windows 11
output_dir = os.path.join(os.path.expanduser("~"), "Documents", "tim_site")
os.makedirs(output_dir, exist_ok=True)

# Current year for footer
current_year = datetime.now().year

# CSS content for styles.css (separate file)
css_content = """
:root {
    --tim-primary: #0066cc;       /* TIM Brand Blue */
    --tim-secondary: #004a99;     /* Darker blue for accents */
    --tim-accent: #00b388;        /* Accent green */
    --tim-bg: #f9fbfd;
    --tim-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
body {
    background-color: var(--tim-bg);
    font-family: var(--tim-font);
    color: #222;
}
.navbar {
    background-color: var(--tim-primary);
}
.navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
    color: white !important;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
}
.navbar-brand img {
    height: 30px;
    border-radius: 5px;
    margin-right: 0.5rem;
}
.nav-link {
    color: #e0e7ff !important;
    font-weight: 500;
}
.nav-link:hover, .nav-link:focus {
    color: var(--tim-accent) !important;
}
.btn-tim-primary {
    background-color: var(--tim-primary);
    border: none;
}
.btn-tim-primary:hover {
    background-color: var(--tim-secondary);
}
footer {
    background-color: var(--tim-secondary);
    color: white;
    padding: 1rem 0;
    text-align: center;
    font-size: 0.9rem;
}
.hero-section {
    padding: 5rem 1rem 4rem;
    text-align: center;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 12px rgba(0,0,0,0.08);
    margin-bottom: 3rem;
}
.store-table thead {
    background-color: var(--tim-primary);
    color: white;
    font-weight: 600;
}
.accordion-button {
    background-color: var(--tim-bg);
    font-weight: 600;
    color: var(--tim-primary);
}

/* Responsive spacing tweaks */
@media (max-width: 576px) {
    .hero-section {
        padding: 3rem 1rem 2rem;
    }
}
"""

# Helper function for common head HTML including bootstrap & styles.css
def common_head(title):
    return f"""
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="styles.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
"""

# Navbar HTML referencing TIM.png logo
navbar_html = """
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <img src="TIM.png" alt="TIM Logo">
      TIM
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" style="filter: invert(100%)"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto gap-3">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="store.html">Store</a></li>
        <li class="nav-item"><a class="nav-link" href="faq.html">FAQs</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
"""

# Footer HTML with dynamic current year
footer_html = f"""
<footer>
    <div class="container">
        &copy; {current_year} TIM – This is Mine. All rights reserved.
    </div>
</footer>
"""

# Site HTML files with consistent navbar and footer, linking styles.css
site_files = {
    "index.html": f"""<!DOCTYPE html>
<html lang="en">
<head>{common_head("TIM – This is Mine")}</head>
<body>
    {navbar_html}
    <main class="container">
        <section class="hero-section">
            <h1 class="display-4 fw-bold mb-3">Self-hosted freedom. No cloud. No subscriptions.</h1>
            <p class="lead mb-4">Your data, your rules — anytime, anywhere, totally private.</p>
            <a href="store.html" class="btn btn-tim-primary btn-lg">Get Your TIM Device</a>
        </section>

        <section>
            <h2 class="mb-4">Why Choose TIM?</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div class="col">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body text-center">
                            <div class="fs-1 mb-3" aria-label="Private">&#x1F512;</div>
                            <h5 class="card-title">Private & Secure</h5>
                            <p class="card-text">Your data never leaves your device, keeping everything safe and under your control.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body text-center">
                            <div class="fs-1 mb-3" aria-label="Offline">&#x1F310;</div>
                            <h5 class="card-title">Offline Ready</h5>
                            <p class="card-text">Full functionality without internet — perfect for privacy and reliable access.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body text-center">
                            <div class="fs-1 mb-3" aria-label="No subscriptions">&#x1F4B8;</div>
                            <h5 class="card-title">No Subscriptions</h5>
                            <p class="card-text">One-time purchase with no hidden fees, ever.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm h-100 border-0">
                        <div class="card-body text-center">
                            <div class="fs-1 mb-3" aria-label="Modular">&#x1F9F9;</div>
                            <h5 class="card-title">Modular & Scalable</h5>
                            <p class="card-text">Add features and integrations as your needs grow.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    {footer_html}
</body>
</html>
""",
    "faq.html": f"""<!DOCTYPE html>
<html lang="en">
<head>{common_head("FAQs - TIM")}</head>
<body>
    {navbar_html}
    <main class="container my-5">
        <h1 class="mb-4">Frequently Asked Questions</h1>
        <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="faq1">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#faq1-collapse" aria-expanded="true" aria-controls="faq1-collapse">
                        Is TIM difficult to set up?
                    </button>
                </h2>
                <div id="faq1-collapse" class="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        No. TIM is plug-and-play, with most modules launching in seconds after setup.
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="faq2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#faq2-collapse" aria-expanded="false" aria-controls="faq2-collapse">
                        What makes TIM different?
                    </button>
                </h2>
                <div id="faq2-collapse" class="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        TIM is purpose-built with an intuitive dashboard and a privacy-first design.
                    </div>
                </div>
            </div>
        </div>
    </main>
    {footer_html}
</body>
</html>
""",
    "contact.html": f"""<!DOCTYPE html>
<html lang="en">
<head>{common_head("Contact - TIM")}</head>
<body>
    {navbar_html}
    <main class="container my-5">
        <h1 class="mb-4">Contact Us</h1>
        <p>Email: <a href="mailto:support@thisismine.io">support@thisismine.io</a></p>
        <p>Headquarters: Dublin, Ireland</p>
    </main>
    {footer_html}
</body>
</html>
""",
    "store.html": f"""<!DOCTYPE html>
<html lang="en">
<head>{common_head("Store - TIM")}</head>
<body>
    {navbar_html}
    <main class="container my-5">
        <h1 class="mb-4">TIM Store</h1>
        <p>Configure and purchase your TIM device</p>
        <table class="table store-table table-striped table-bordered align-middle">
            <thead>
                <tr>
                    <th scope="col">Model</th>
                    <th scope="col">CPU</th>
                    <th scope="col">RAM</th>
                    <th scope="col">Storage</th>
                    <th scope="col">Applets</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tiny TIM</td>
                    <td>N97</td>
                    <td>8 GB</td>
                    <td>256 GB</td>
                    <td>Core only</td>
                    <td>€199</td>
                </tr>
                <tr>
                    <td>Just TIM</td>
                    <td>N100</td>
                    <td>16 GB</td>
                    <td>500 GB</td>
                    <td>+ Optional (50% off)</td>
                    <td>€299</td>
                </tr>
                <tr>
                    <td>TIM Pro</td>
                    <td>N200</td>
                    <td>24 GB</td>
                    <td>1 TB</td>
                    <td>+ Optional (50% off)</td>
                    <td>€449</td>
                </tr>
                <tr>
                    <td>TIM Max</td>
                    <td>Ryzen 5</td>
                    <td>64 GB</td>
                    <td>2 TB</td>
                    <td>All included</td>
                    <td>€849</td>
                </tr>
            </tbody>
        </table>
    </main>
    {footer_html}
</body>
</html>
""",
}

# Write the HTML files
for fname, content in site_files.items():
    path = os.path.join(output_dir, fname)
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

# Write the separate CSS file
css_path = os.path.join(output_dir, "styles.css")
with open(css_path, "w", encoding="utf-8") as css_file:
    css_file.write(css_content)

# Note:
# Please ensure you copy your 'TIM.png' logo into the output directory before zipping,
# so it gets included in the archive and displays correctly on your pages.

# Create a Zip archive including html files, css, and logo if present
zip_path = os.path.join(os.path.expanduser("~"), "Documents", "tim_website_modern_with_css.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for fname in list(site_files.keys()) + ["styles.css", "TIM.png"]:
        file_path = os.path.join(output_dir, fname)
        if os.path.exists(file_path):
            zipf.write(file_path, arcname=fname)

print(f"Site files with separate CSS written to: {output_dir}")
print(f"Zip archive created at: {zip_path}")