import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Check, 
  Shield, 
  Clock, 
  Users, 
  Code, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
  Heart,
  Share2,
  Award,
  TrendingUp,
  GitBranch,
  Zap,
  Lock,
  Globe
} from 'lucide-react';
import styles from './ApplicationDetail.module.css';

// Mock data for demonstration
const mockApplication = {
  id: '1',
  name: 'AI-Powered Analytics Dashboard',
  tagline: 'Transform your data into actionable insights with cutting-edge AI',
  price: 4999,
  originalPrice: 7999,
  discount: 37,
  rating: 4.8,
  reviewCount: 234,
  category: 'Analytics & BI',
  seller: {
    name: 'DataTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4.9,
    totalSales: 1250,
    memberSince: '2021',
    verified: true,
    responseTime: '< 2 hours'
  },
  images: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop'
  ],
  overview: {
    description: 'Experience the future of data analytics with our AI-powered dashboard. Built for modern businesses, this comprehensive solution transforms raw data into meaningful insights, helping you make data-driven decisions faster than ever before.',
    highlights: [
      'Real-time data processing and visualization',
      'Advanced AI algorithms for predictive analytics',
      'Customizable dashboards and reports',
      'Seamless integration with 50+ data sources',
      'Enterprise-grade security and compliance'
    ]
  },
  features: [
    {
      icon: <Zap />,
      title: 'Lightning Fast Performance',
      description: 'Process millions of data points in seconds with our optimized engine'
    },
    {
      icon: <Shield />,
      title: 'Bank-Level Security',
      description: 'End-to-end encryption and SOC 2 Type II compliance'
    },
    {
      icon: <GitBranch />,
      title: 'Version Control',
      description: 'Track changes and collaborate with built-in version control'
    },
    {
      icon: <Globe />,
      title: 'Global CDN',
      description: 'Access your dashboard from anywhere with ultra-low latency'
    }
  ],
  techStack: {
    frontend: ['React', 'TypeScript', 'D3.js', 'Chart.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis'],
    infrastructure: ['AWS', 'Docker', 'Kubernetes', 'CloudFlare'],
    ai: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API']
  },
  metrics: {
    activeUsers: '10,000+',
    dataProcessed: '5TB+',
    uptime: '99.9%',
    apiCalls: '100M+',
    avgLoadTime: '0.3s',
    customerSatisfaction: '98%'
  },
  documentation: {
    gettingStarted: 'https://docs.example.com/getting-started',
    apiReference: 'https://docs.example.com/api',
    tutorials: 'https://docs.example.com/tutorials',
    support: 'support@example.com'
  },
  reviews: [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      rating: 5,
      date: '2024-01-15',
      title: 'Game-changer for our business',
      content: 'This dashboard has completely transformed how we handle data analytics. The AI insights are incredibly accurate and have helped us identify trends we would have missed otherwise.'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      rating: 4,
      date: '2024-01-10',
      title: 'Powerful but with a learning curve',
      content: 'Extremely powerful tool with tons of features. Takes some time to master all the capabilities, but the documentation is comprehensive and support is responsive.'
    }
  ],
  similarApps: [
    {
      id: '2',
      name: 'DataViz Pro',
      price: 3999,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Analytics Suite X',
      price: 5499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      name: 'InsightFlow',
      price: 4499,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=200&fit=crop'
    }
  ]
};

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);

  const app = mockApplication; // In real app, fetch based on id

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? app.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === app.images.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${i < Math.floor(rating) ? styles.filled : ''}`}
        size={16}
      />
    ));
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <ChevronLeft size={20} />
          Back to Marketplace
        </button>
        <span className={styles.breadcrumbPath}>
          Home / {app.category} / {app.name}
        </span>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src={app.images[selectedImage]} alt={app.name} />
            <button className={styles.navButton} onClick={handlePrevImage}>
              <ChevronLeft size={24} />
            </button>
            <button className={`${styles.navButton} ${styles.next}`} onClick={handleNextImage}>
              <ChevronRight size={24} />
            </button>
          </div>
          <div className={styles.thumbnails}>
            {app.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${app.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.heroInfo}>
          <div className={styles.header}>
            <h1 className={styles.title}>{app.name}</h1>
            <p className={styles.tagline}>{app.tagline}</p>
            
            <div className={styles.badges}>
              <span className={styles.badge}>
                <Award size={16} />
                Best Seller
              </span>
              <span className={styles.badge}>
                <TrendingUp size={16} />
                Trending
              </span>
            </div>

            <div className={styles.rating}>
              <div className={styles.stars}>{renderStars(app.rating)}</div>
              <span className={styles.ratingText}>
                {app.rating} ({app.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className={styles.pricing}>
            <div className={styles.priceGroup}>
              <span className={styles.currentPrice}>${app.price}</span>
              <span className={styles.originalPrice}>${app.originalPrice}</span>
              <span className={styles.discount}>-{app.discount}%</span>
            </div>
            <p className={styles.priceNote}>One-time purchase • Lifetime updates</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.purchaseButton}>
              <Lock size={20} />
              Purchase Securely
            </button>
            <button className={styles.contactButton}>
              <MessageCircle size={20} />
              Contact Seller
            </button>
            <div className={styles.secondaryActions}>
              <button 
                className={`${styles.iconButton} ${isFavorited ? styles.favorited : ''}`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart size={20} />
              </button>
              <button className={styles.iconButton}>
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}>
              <Shield size={16} />
              30-day money-back guarantee
            </div>
            <div className={styles.guarantee}>
              <Check size={16} />
              Secure checkout
            </div>
            <div className={styles.guarantee}>
              <Clock size={16} />
              Instant delivery
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'techstack' ? styles.active : ''}`}
            onClick={() => setActiveTab('techstack')}
          >
            Tech Stack
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'documentation' ? styles.active : ''}`}
            onClick={() => setActiveTab('documentation')}
          >
            Documentation
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overview}>
              <p className={styles.description}>{app.overview.description}</p>
              <div className={styles.highlights}>
                <h3>Key Highlights</h3>
                <ul>
                  {app.overview.highlights.map((highlight, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className={styles.features}>
              {app.features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'techstack' && (
            <div className={styles.techStack}>
              <div className={styles.stackSection}>
                <h4>Frontend</h4>
                <div className={styles.techTags}>
                  {app.techStack.frontend.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.stackSection}>
                <h4>Backend</h4>
                <div className={styles.techTags}>
                  {app.techStack.backend.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.stackSection}>
                <h4>Infrastructure</h4>
                <div className={styles.techTags}>
                  {app.techStack.infrastructure.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.stackSection}>
                <h4>AI/ML</h4>
                <div className={styles.techTags}>
                  {app.techStack.ai.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div className={styles.documentation}>
              <div className={styles.docLinks}>
                <a href={app.documentation.gettingStarted} className={styles.docLink}>
                  <FileText size={20} />
                  <div>
                    <h4>Getting Started Guide</h4>
                    <p>Learn the basics and get up and running quickly</p>
                  </div>
                </a>
                <a href={app.documentation.apiReference} className={styles.docLink}>
                  <Code size={20} />
                  <div>
                    <h4>API Reference</h4>
                    <p>Complete API documentation with examples</p>
                  </div>
                </a>
                <a href={app.documentation.tutorials} className={styles.docLink}>
                  <Users size={20} />
                  <div>
                    <h4>Video Tutorials</h4>
                    <p>Step-by-step video guides and best practices</p>
                  </div>
                </a>
              </div>
              <div className={styles.support}>
                <h4>Need Help?</h4>
                <p>Contact support at: {app.documentation.support}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Section */}
      <div className={styles.metrics}>
        <h3>Performance Metrics</h3>
        <div className={styles.metricGrid}>
          <div className={styles.metric}>
            <Users size={24} />
            <span className={styles.metricValue}>{app.metrics.activeUsers}</span>
            <span className={styles.metricLabel}>Active Users</span>
          </div>
          <div className={styles.metric}>
            <Download size={24} />
            <span className={styles.metricValue}>{app.metrics.dataProcessed}</span>
            <span className={styles.metricLabel}>Data Processed</span>
          </div>
          <div className={styles.metric}>
            <TrendingUp size={24} />
            <span className={styles.metricValue}>{app.metrics.uptime}</span>
            <span className={styles.metricLabel}>Uptime</span>
          </div>
          <div className={styles.metric}>
            <Zap size={24} />
            <span className={styles.metricValue}>{app.metrics.avgLoadTime}</span>
            <span className={styles.metricLabel}>Avg Load Time</span>
          </div>
        </div>
      </div>

      {/* Seller Section */}
      <div className={styles.seller}>
        <h3>About the Seller</h3>
        <div className={styles.sellerCard}>
          <img src={app.seller.avatar} alt={app.seller.name} className={styles.sellerAvatar} />
          <div className={styles.sellerInfo}>
            <div className={styles.sellerHeader}>
              <h4>{app.seller.name}</h4>
              {app.seller.verified && (
                <span className={styles.verified}>
                  <Shield size={16} />
                  Verified
                </span>
              )}
            </div>
            <div className={styles.sellerStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{app.seller.rating}</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{app.seller.totalSales}</span>
                <span className={styles.statLabel}>Sales</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{app.seller.memberSince}</span>
                <span className={styles.statLabel}>Member Since</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{app.seller.responseTime}</span>
                <span className={styles.statLabel}>Response Time</span>
              </div>
            </div>
          </div>
          <button className={styles.viewProfileButton}>View Profile</button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviews}>
        <div className={styles.reviewsHeader}>
          <h3>Customer Reviews</h3>
          <button className={styles.writeReviewButton}>Write a Review</button>
        </div>
        <div className={styles.reviewsList}>
          {app.reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <div className={styles.reviewHeader}>
                <img src={review.avatar} alt={review.author} />
                <div className={styles.reviewMeta}>
                  <h5>{review.author}</h5>
                  <div className={styles.reviewRating}>
                    {renderStars(review.rating)}
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                </div>
              </div>
              <h6>{review.title}</h6>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Applications */}
      <div className={styles.similar}>
        <h3>Similar Applications</h3>
        <div className={styles.similarGrid}>
          {app.similarApps.map((similarApp) => (
            <div 
              key={similarApp.id} 
              className={styles.similarCard}
              onClick={() => navigate(`/app/${similarApp.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={similarApp.image} alt={similarApp.name} />
              <h4>{similarApp.name}</h4>
              <div className={styles.similarMeta}>
                <span className={styles.price}>${similarApp.price}</span>
                <div className={styles.rating}>
                  <Star size={14} className={styles.filled} />
                  {similarApp.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;