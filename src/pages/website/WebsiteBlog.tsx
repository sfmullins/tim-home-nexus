import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const WebsiteBlog = () => {
  const { t } = useTranslation();

  const featuredPost = {
    id: 'why-tim-matters',
    title: 'Why TIM Matters: Reclaiming Digital Independence',
    excerpt: 'In an era of increasing surveillance and subscription fatigue, TIM represents a return to digital sovereignty. Learn why owning your infrastructure matters more than ever.',
    author: 'TIM Team',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['Privacy', 'Philosophy', 'Self-hosting'],
    featured: true
  };

  const blogPosts = [
    {
      id: 'choosing-right-tim',
      title: 'Choosing the Right TIM: A Complete Buyer\'s Guide',
      excerpt: 'From Tiny TIM to TIM Max, we break down which configuration is perfect for your needs and budget.',
      author: 'Sarah O\'Brien',
      date: '2024-12-10',
      readTime: '12 min read',
      tags: ['Buying Guide', 'Hardware']
    },
    {
      id: 'power-efficiency',
      title: 'The Power of Efficiency: TIM\'s Green Computing Approach',
      excerpt: 'How TIM achieves maximum performance while minimizing environmental impact.',
      author: 'Michael Chen',
      date: '2024-12-05',
      readTime: '6 min read',
      tags: ['Sustainability', 'Technology']
    },
    {
      id: 'home-automation',
      title: 'Smart Home, Your Way: Setting Up Home Automation with TIM',
      excerpt: 'Step-by-step guide to creating a private smart home ecosystem without cloud dependencies.',
      author: 'Emma Walsh',
      date: '2024-11-28',
      readTime: '15 min read',
      tags: ['Tutorial', 'Smart Home']
    },
    {
      id: 'game-streaming-setup',
      title: 'Mobile Gaming Revolution: Stream PC Games with TIM',
      excerpt: 'Transform your mobile device into a portable gaming powerhouse with TIM\'s game streaming.',
      author: 'David Murphy',
      date: '2024-11-22',
      readTime: '10 min read',
      tags: ['Gaming', 'Mobile']
    },
    {
      id: 'data-sovereignty',
      title: 'Data Sovereignty in Practice: Real Stories from TIM Users',
      excerpt: 'How early TIM adopters are using personal servers to take control of their digital lives.',
      author: 'Lisa Taylor',
      date: '2024-11-15',
      readTime: '9 min read',
      tags: ['Privacy', 'Case Studies']
    },
    {
      id: 'vpn-security',
      title: 'Beyond Corporate VPNs: Building Your Private Network',
      excerpt: 'Learn how TIM\'s built-in VPN provides superior security and privacy compared to commercial services.',
      author: 'Alex Rodriguez',
      date: '2024-11-08',
      readTime: '7 min read',
      tags: ['Security', 'VPN', 'Tutorial']
    }
  ];

  const categories = [
    { name: 'All Posts', count: 7 },
    { name: 'Tutorials', count: 3 },
    { name: 'Hardware', count: 2 },
    { name: 'Privacy', count: 2 },
    { name: 'Gaming', count: 1 },
    { name: 'Smart Home', count: 1 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground">TIM Blog</h1>
        <p className="text-xl text-muted-foreground">
          Insights, tutorials, and stories about digital independence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Featured Post */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="default">Featured</Badge>
                <Badge variant="outline">Latest</Badge>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button>
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link to={`/website/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/website/blog?category=${category.name.toLowerCase()}`}
                    className="flex justify-between items-center py-2 px-3 rounded hover:bg-muted transition-colors"
                  >
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest TIM news, tutorials, and product updates delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
                <Button className="w-full">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                No spam, unsubscribe anytime.
              </p>
            </CardContent>
          </Card>

          {/* Popular Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/website/blog/${post.id}`}
                    className="block group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBlog;