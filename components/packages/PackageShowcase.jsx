import React, { useState, useEffect, useRef } from 'react';
import {
  Package, Rocket, ShoppingBag, Globe, CheckCircle2, ArrowRight, 
  Building, Target, Briefcase, DollarSign, TrendingUp, 
  Shield, Database, Code, Headphones, ChevronDown, ChevronRight,
  Calendar, Monitor, Zap, Award, Users, Settings, Search, BarChart3, 
  Clock, Layers, FileText, CheckSquare, Sparkles, Gauge, Star,
  MousePointer, Eye, Heart, MessageCircle
} from 'lucide-react';
import styles from './PackageShowcase.module.scss';  // THIS WAS MISSING!

const PremiumPackageShowcase = () => {
  const [activeType, setActiveType] = useState('build-market');
  const [expandedCard, setExpandedCard] = useState(null);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState({});
  const [recommendedPackages, setRecommendedPackages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const tabsRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Package types data
  const packageTypes = [
    {
      id: 'build-market',
      title: 'Build + Market',
      description: 'For businesses with no online presence',
      icon: Rocket,
      subtitle: 'E-commerce platform + digital marketing'
    },
    {
      id: 'market-boost',
      title: 'Market + Boost',
      description: 'For businesses with existing websites',
      icon: TrendingUp,
      subtitle: 'Digital marketing + conversion optimization'
    },
    {
      id: 'complete',
      title: 'Complete Solution',
      description: 'Full IV Creative experience',
      icon: Globe,
      subtitle: 'E-commerce + marketing + design + fulfillment'
    }
  ];

  // Package data 
  const packageData = {
    'build-market': [
      {
        id: 'micro-start',
        title: 'Micro Start',
        tier: 'MICRO',
        price: '£1,000',
        period: 'one-time',
        commitment: '3 weeks',
        isOneTime: true,
        description: 'For businesses with ≤£1,000 budget needing minimal proof-of-concept',
        targetRevenue: '≤£1k budget',
        features: [
          'Shopify trial with 5 products',
          'Basic SEO setup',
          'Google & Meta ads setup',
          'Email welcome flow'
        ],
        deliverables: {
          'E-COMMERCE': [
            'Shopify trial with 5 products',
            'Payment gateway integration',
            'Basic shipping setup'
          ],
          'MARKETING': [
            'Google Ads setup (3 campaigns)',
            'Meta Ads setup (2 campaigns)',
            'Basic email automation'
          ],
          'ANALYTICS': [
            'GA4 setup with purchase event',
            'Meta Pixel installation',
            'Basic performance tracking'
          ]
        }
      },
      {
        id: 'basic-build',
        title: 'Basic Build',
        tier: 'BASIC',
        price: '£6,000',
        period: '/month',
        commitment: '3 months min',
        isOneTime: false,
        isPopular: true,
        description: 'For small businesses (£20k-£150k revenue) launching online',
        targetRevenue: '£20k-£150k annually',
        features: [
          'Shopify store with 20 products',
          'Customized theme setup',
          'Full marketing setup',
          'Email automation flows'
        ],
        deliverables: {
          'E-COMMERCE': [
            'Shopify store with custom theme',
            'Up to 20 products with variants',
            'Payment & shipping integration'
          ],
          'MARKETING': [
            'Google Ads (5 campaigns)',
            'Meta Ads with targeting setup',
            'Email automation (3 flows)'
          ],
          'SEO & ANALYTICS': [
            'On-page SEO optimization',
            'Enhanced analytics setup',
            'Monthly performance reports'
          ]
        }
      },
      {
        id: 'growth-build',
        title: 'Growth Build',
        tier: 'GROWTH',
        price: '£10,000',
        period: '/month',
        commitment: '6 months min',
        isOneTime: false,
        isFeatured: true,
        description: 'For growing businesses (£150k-£750k revenue) needing professional platform',
        targetRevenue: '£150k-£750k annually',
        features: [
          'Shopify Plus with 50 products',
          'Advanced marketing across channels',
          'CRM integration',
          'Personalization options'
        ],
        deliverables: {
          'E-COMMERCE PLATFORM': [
            'Shopify Plus with custom theme',
            'Up to 50 products with full variants',
            'Multi-currency & advanced checkout',
            'CRM integration (HubSpot)'
          ],
          'ADVANCED MARKETING': [
            'Google Ads (15 campaigns + Shopping)',
            'Meta Ads (Lookalikes + DPA)',
            'Email automation (4 flows)',
            'Content marketing (2 blogs/month)'
          ],
          'PERFORMANCE': [
            'Advanced SEO optimization',
            'Conversion rate optimization',
            'A/B testing program',
            'Comprehensive reporting'
          ]
        }
      },
      {
        id: 'enterprise-build',
        title: 'Enterprise Build',
        tier: 'ENTERPRISE',
        price: '£16,000',
        period: '/month',
        commitment: '12 months min',
        isOneTime: false,
        description: 'For established businesses (£750k+ revenue) needing advanced solutions',
        targetRevenue: '£750k+ annually',
        features: [
          'Shopify Plus or headless commerce',
          'Enterprise marketing stack',
          'Custom integrations',
          'Global market support'
        ],
        deliverables: {
          'ENTERPRISE PLATFORM': [
            'Shopify Plus or headless commerce',
            'Up to 100 products with full attributes',
            'Global multi-currency & language',
            'Enterprise integrations (ERP, CRM)'
          ],
          'ENTERPRISE MARKETING': [
            'Full-funnel marketing strategy',
            'Multi-channel campaign management',
            'Advanced personalization',
            'International market targeting'
          ],
          'OPERATIONS': [
            '3PL integration & management',
            'Supply chain optimization',
            'Business intelligence reporting',
            'Continuous improvement program'
          ]
        }
      }
    ],
    'market-boost': [
      {
        id: 'micro-boost',
        title: 'Micro Boost',
        tier: 'MICRO',
        price: '£1,000',
        period: 'one-time',
        commitment: '3 weeks',
        isOneTime: true,
        description: 'For businesses with existing websites needing quick marketing wins',
        targetRevenue: '≤£1k budget',
        features: [
          'Basic marketing setup',
          'Performance quick wins',
          'Email automation setup',
          'Analytics configuration'
        ],
        deliverables: {
          'PERFORMANCE': [
            'Site speed optimization',
            'Basic SEO fixes',
            'Analytics setup (GA4)'
          ],
          'MARKETING': [
            'Google Ads setup (3 campaigns)',
            'Meta Ads setup (2 campaigns)',
            'Email automation setup'
          ],
          'OPTIMIZATION': [
            'One A/B test setup',
            'Conversion tracking',
            'Performance baseline report'
          ]
        }
      },
      {
        id: 'basic-boost',
        title: 'Basic Boost',
        tier: 'BASIC',
        price: '£4,000',
        period: '/month',
        commitment: '3 months min',
        isOneTime: false,
        description: 'For small businesses with decent websites needing marketing boost',
        targetRevenue: '£20k-£150k annually',
        features: [
          'Full marketing system setup',
          'Conversion optimization',
          'Content marketing basics',
          'Performance tracking'
        ],
        deliverables: {
          'MARKETING': [
            'Google Ads (5 campaigns + Shopping)',
            'Meta Ads with audience targeting',
            'Email marketing program'
          ],
          'PERFORMANCE': [
            'Technical SEO audit & fixes',
            'Conversion rate optimization',
            'Site speed improvements'
          ],
          'ANALYTICS': [
            'Enhanced tracking setup',
            'Monthly performance reports',
            'Growth recommendations'
          ]
        }
      },
      {
        id: 'growth-boost',
        title: 'Growth Boost',
        tier: 'GROWTH',
        price: '£7,000',
        period: '/month',
        commitment: '6 months min',
        isOneTime: false,
        isPopular: true,
        description: 'For growing businesses ready to scale marketing efforts',
        targetRevenue: '£150k-£750k annually',
        features: [
          'Advanced marketing strategy',
          'Multi-channel campaigns',
          'Content marketing program',
          'Testing & optimization'
        ],
        deliverables: {
          'ADVANCED MARKETING': [
            'Google Ads (15 campaigns + Shopping)',
            'Meta Ads with lookalike audiences',
            'Email marketing with segmentation',
            'Additional channels (Pinterest, TikTok)'
          ],
          'CONTENT & SEO': [
            'Content strategy & creation',
            'Technical & on-page SEO',
            'Link building program',
            'Conversion copywriting'
          ],
          'OPTIMIZATION': [
            'Conversion rate optimization',
            'A/B testing program',
            'Customer journey mapping',
            'User experience improvements'
          ]
        }
      },
      {
        id: 'enterprise-boost',
        title: 'Enterprise Boost',
        tier: 'ENTERPRISE',
        price: '£12,000',
        period: '/month',
        commitment: '6 months min',
        isOneTime: false,
        isFeatured: true,
        description: 'For established businesses needing comprehensive marketing',
        targetRevenue: '£750k+ annually',
        features: [
          'Enterprise marketing strategy',
          'Global market targeting',
          'Advanced analytics & testing',
          'Full-service content program'
        ],
        deliverables: {
          'ENTERPRISE MARKETING': [
            'Global marketing strategy',
            'Multi-channel campaign management',
            'Advanced audience targeting',
            'Premium content production'
          ],
          'ANALYTICS & OPTIMIZATION': [
            'Data studio dashboards',
            'Advanced testing program',
            'Predictive analytics',
            'Attribution modeling'
          ],
          'GROWTH ACCELERATION': [
            'Market expansion planning',
            'Customer retention programs',
            'Revenue optimization',
            'Competitive intelligence'
          ]
        }
      }
    ],
    'complete': [
      {
        id: 'micro-complete',
        title: 'Micro Complete',
        tier: 'MICRO',
        price: '£1,000',
        period: 'one-time',
        commitment: '3 weeks',
        isOneTime: true,
        description: 'Minimal complete workflow with all essential services',
        targetRevenue: '≤£1k budget',
        features: [
          'Basic e-commerce store',
          'Essential marketing setup',
          'Simple product personalization',
          'Fulfillment basics'
        ],
        deliverables: {
          'E-COMMERCE': [
            'Shopify trial store with 5 products',
            'One personalized product setup',
            'Payment gateway integration'
          ],
          'MARKETING': [
            'Google & Meta ads setup',
            'Email welcome flow',
            'Basic analytics setup'
          ],
          'FULFILLMENT': [
            'ShipStation trial setup',
            'Packing slip template',
            'Returns process setup'
          ]
        }
      },
      {
        id: 'growth-complete',
        title: 'Growth Complete',
        tier: 'GROWTH',
        price: '£12,000',
        period: '/month',
        commitment: '6 months min',
        isOneTime: false,
        isPopular: true,
        description: 'Complete e-commerce solution with personalization and fulfillment',
        targetRevenue: '£200k-£1M annually',
        features: [
          'Professional e-commerce platform',
          'Full marketing system',
          'Product personalization',
          'Managed fulfillment'
        ],
        deliverables: {
          'E-COMMERCE PLATFORM': [
            'Shopify Plus with custom theme',
            'Up to 50 products with variants',
            'Personalization for 5 products',
            'Multi-currency support'
          ],
          'COMPLETE MARKETING': [
            'Google & Meta ads management',
            'Email marketing automation',
            'Content & SEO program',
            'Performance optimization'
          ],
          'OPERATIONS': [
            'UK & EU fulfillment setup',
            'Inventory synchronization',
            'Custom packaging design',
            'Returns management'
          ]
        }
      },
      {
        id: 'premium-complete',
        title: 'Premium Complete',
        tier: 'PREMIUM',
        price: '£18,000',
        period: '/month',
        commitment: '9 months min',
        isOneTime: false,
        isFeatured: true,
        description: 'Premium end-to-end solution for established brands',
        targetRevenue: '£1M-£5M annually',
        features: [
          'Advanced e-commerce platform',
          'Premium marketing stack',
          'Advanced personalization',
          'Global fulfillment network'
        ],
        deliverables: {
          'ADVANCED PLATFORM': [
            'Custom headless commerce',
            'Up to 100 products with attributes',
            'Advanced personalization for 10 products',
            'Global multi-site deployment'
          ],
          'PREMIUM MARKETING': [
            'Enterprise marketing strategy',
            'Multi-channel campaign management',
            'Premium content production',
            'Advanced testing & optimization'
          ],
          'GLOBAL OPERATIONS': [
            'Multi-warehouse fulfillment',
            'Custom packaging program',
            'Global logistics optimization',
            'Returns management system'
          ]
        }
      },
      {
        id: 'enterprise-complete',
        title: 'Enterprise Complete',
        tier: 'ENTERPRISE',
        price: '£25,000',
        period: '/month',
        commitment: '12 months min',
        isOneTime: false,
        description: 'Complete operational partnership for global market leaders',
        targetRevenue: '£5M+ annually',
        features: [
          'Enterprise commerce platform',
          'Global marketing operation',
          'AI-powered personalization',
          'Complete fulfillment solution'
        ],
        deliverables: {
          'ENTERPRISE PLATFORM': [
            'Custom enterprise platform',
            'Up to 500 products with full attributes',
            'AI-powered personalization',
            'Global multi-market deployment'
          ],
          'GLOBAL MARKETING': [
            'Global marketing strategy',
            'Multi-market campaign management',
            'Enterprise content program',
            'Advanced analytics & BI'
          ],
          'ENTERPRISE OPERATIONS': [
            'Global fulfillment network',
            'Supply chain optimization',
            'Business intelligence system',
            'Continuous improvement program'
          ]
        }
      }
    ]
  };

  // Feature category icons
  const categoryIcons = {
    'E-COMMERCE': Globe,
    'E-COMMERCE PLATFORM': Globe,
    'ADVANCED PLATFORM': Monitor,
    'ENTERPRISE PLATFORM': Building,
    'MARKETING': Zap,
    'ADVANCED MARKETING': Zap,
    'PREMIUM MARKETING': Zap,
    'ENTERPRISE MARKETING': Award,
    'GLOBAL MARKETING': Globe,
    'COMPLETE MARKETING': Zap,
    'ANALYTICS': Search,
    'ANALYTICS & OPTIMIZATION': BarChart3,
    'SEO & ANALYTICS': Search,
    'CONTENT & SEO': FileText,
    'PERFORMANCE': Gauge,
    'OPTIMIZATION': Target,
    'OPERATIONS': Database,
    'GLOBAL OPERATIONS': Database,
    'ENTERPRISE OPERATIONS': Database,
    'FULFILLMENT': Layers,
    'GROWTH ACCELERATION': TrendingUp
  };

  // Wizard questions data
  const wizardQuestions = [
    {
      id: 'website_status',
      question: 'What\'s your current website situation?',
      type: 'single',
      options: [
        { value: 'none', label: 'No website yet', icon: Globe },
        { value: 'basic', label: 'Basic website, needs improvement', icon: Settings },
        { value: 'good', label: 'Good website that converts well', icon: CheckCircle2 },
        { value: 'excellent', label: 'High-performing, professional site', icon: Award }
      ]
    },
    {
      id: 'business_revenue',
      question: 'What\'s your approximate annual revenue?',
      type: 'single',
      options: [
        { value: 'startup', label: 'Startup / Pre-revenue', icon: Rocket },
        { value: 'small', label: '£20k - £150k', icon: DollarSign },
        { value: 'medium', label: '£150k - £750k', icon: TrendingUp },
        { value: 'large', label: '£750k - £5M', icon: Building },
        { value: 'enterprise', label: '£5M+', icon: Briefcase }
      ]
    },
    {
      id: 'services_needed',
      question: 'Which services do you need?',
      type: 'multiple',
      options: [
        { value: 'ecommerce', label: 'E-commerce Platform', icon: ShoppingBag },
        { value: 'marketing', label: 'Digital Marketing', icon: Zap },
        { value: 'design', label: 'Design & Branding', icon: Monitor },
        { value: 'fulfillment', label: 'Order Fulfillment', icon: Database },
        { value: 'personalization', label: 'Product Personalization', icon: Sparkles }
      ]
    },
    {
      id: 'timeline',
      question: 'What\'s your ideal timeline?',
      type: 'single',
      options: [
        { value: 'urgent', label: 'ASAP (3-4 weeks)', icon: Clock },
        { value: 'normal', label: 'Standard (2-3 months)', icon: Calendar },
        { value: 'planned', label: 'Planned (6+ months)', icon: Target }
      ]
    }
  ];

  useEffect(() => {
    if (tabsRef.current && sliderRef.current) {
      const activeTab = tabsRef.current.querySelector(`[data-type="${activeType}"]`);
      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab;
        sliderRef.current.style.width = `${offsetWidth}px`;
        sliderRef.current.style.left = `${offsetLeft}px`;
      }
    }
  }, [activeType]);

  const handleTypeChange = (typeId) => {
    setActiveType(typeId);
    setExpandedCard(null);
  };

  const toggleExpanded = (packageId) => {
    setExpandedCard(expandedCard === packageId ? null : packageId);
  };

  const getFeatureIcon = (category) => {
    const IconComponent = categoryIcons[category] || Package;
    return <IconComponent size={18} />;
  };

  const getTierColor = (tier) => {
    const colors = {
      MICRO: '#10b981',
      BASIC: '#3b82f6',
      STARTER: '#8b5cf6',
      GROWTH: '#f59e0b',
      PREMIUM: '#ef4444',
      ENTERPRISE: '#1f2937'
    };
    return colors[tier] || '#6b7280';
  };

  // Calculate recommendations based on wizard answers
  const calculateRecommendations = (answers) => {
    const allPackages = [
      ...packageData['build-market'],
      ...packageData['market-boost'],
      ...packageData['complete']
    ];

    return allPackages.map(pkg => {
      let score = 0;
      const reasons = [];

      // Website status scoring
      if (answers.website_status) {
        if (answers.website_status === 'none' && activeType === 'build-market') {
          score += 30;
          reasons.push('Perfect for building from scratch');
        }
        if (answers.website_status === 'good' && activeType === 'market-boost') {
          score += 30;
          reasons.push('Optimizes your existing site');
        }
        if ((answers.website_status === 'good' || answers.website_status === 'excellent') && activeType === 'complete') {
          score += 25;
          reasons.push('Provides full-service support');
        }
      }

      // Revenue-based scoring
      if (answers.business_revenue) {
        if (answers.business_revenue === 'startup' && pkg.tier === 'MICRO') {
          score += 35;
          reasons.push('Fits your startup budget');
        } else if (answers.business_revenue === 'small' && pkg.tier === 'BASIC') {
          score += 30;
          reasons.push('Scales with your small business');
        } else if (answers.business_revenue === 'medium' && pkg.tier === 'GROWTH') {
          score += 30;
          reasons.push('Perfect for growing businesses');
        } else if (answers.business_revenue === 'large' && pkg.tier === 'PREMIUM') {
          score += 35;
          reasons.push('Supports established businesses');
        } else if (answers.business_revenue === 'enterprise' && pkg.tier === 'ENTERPRISE') {
          score += 35;
          reasons.push('Enterprise-level solution');
        }
      }

      // Services needed scoring
      if (answers.services_needed) {
        const services = answers.services_needed;
        if (services.includes('ecommerce') && services.includes('marketing') && activeType === 'build-market') {
          score += 25;
          reasons.push('Combined platform & marketing');
        }
        if (services.includes('marketing') && !services.includes('ecommerce') && activeType === 'market-boost') {
          score += 25;
          reasons.push('Focused on marketing optimization');
        }
        if (services.includes('fulfillment') && services.length > 2 && activeType === 'complete') {
          score += 30;
          reasons.push('End-to-end solution with fulfillment');
        }
      }

      // Timeline alignment
      if (answers.timeline) {
        if (answers.timeline === 'urgent' && pkg.isOneTime) {
          score += 30;
          reasons.push('Quick deployment option');
        } else if (answers.timeline === 'normal' && pkg.commitment.includes('3 months')) {
          score += 25;
          reasons.push('Standard timeline engagement');
        } else if (answers.timeline === 'planned' && (pkg.commitment.includes('6 months') || pkg.commitment.includes('12 months'))) {
          score += 25;
          reasons.push('Strategic long-term partnership');
        }
      }

      return {
        ...pkg,
        score: Math.min(score, 100),
        reasons: reasons.slice(0, 3)
      };
    }).sort((a, b) => b.score - a.score);
  };

  const handleWizardAnswer = (questionId, answer) => {
    const newAnswers = { ...wizardAnswers, [questionId]: answer };
    setWizardAnswers(newAnswers);
    
    // Auto-advance for single-choice questions
    if (wizardQuestions[wizardStep].type === 'single') {
      setTimeout(() => {
        if (wizardStep < wizardQuestions.length - 1) {
          setWizardStep(wizardStep + 1);
        } else {
          generateRecommendations(newAnswers);
        }
      }, 300);
    }
  };

  const generateRecommendations = (answers) => {
    const recommendations = calculateRecommendations(answers);
    setRecommendedPackages(recommendations.slice(0, 3));
    setShowResults(true);
  };

  const resetWizard = () => {
    setWizardStep(0);
    setWizardAnswers({});
    setRecommendedPackages([]);
    setShowResults(false);
  };

  return (
    <div className={`${styles.premiumPackageShowcase} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.showcaseContainer}>
        {/* Header */}
        <header className={styles.showcaseHeader}>
          <div className={styles.headerBadge}>
            <Package size={16} />
            <span>IV Creative Packages</span>
          </div>
          
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>
              <span className={styles.titleLine}>Find Your Perfect Package</span>
              <span className={styles.titleSubtitle}>Transparent pricing, clear deliverables</span>
            </h1>
            <div className={styles.titleAccent}></div>
            <p className={styles.headerDescription}>
              From £1,000 proof-of-concept to enterprise solutions. 
              Tailored packages for businesses at every stage of growth.
            </p>
          </div>
        </header>

        {/* Package Type Selector */}
        <div className={styles.packageTypeSelector}>
          <div className={styles.selectorContainer}>
            <div className={styles.selectorTabs} ref={tabsRef}>
              {packageTypes.map((type) => (
                <button
                  key={type.id}
                  data-type={type.id}
                  className={`${styles.tab} ${activeType === type.id ? styles.active : ''}`}
                  onClick={() => handleTypeChange(type.id)}
                >
                  <type.icon size={20} />
                  <div className={styles.tabContent}>
                    <span className={styles.tabTitle}>{type.title}</span>
                    <span className={styles.tabSubtitle}>{type.subtitle}</span>
                  </div>
                </button>
              ))}
              <div className={styles.tabSlider} ref={sliderRef}></div>
            </div>
          </div>
          
          <div className={styles.typeDescription}>
            <div className={styles.descriptionContent}>
              <h3>
                {packageTypes.find(type => type.id === activeType).title}
              </h3>
              <p>{packageTypes.find(type => type.id === activeType).description}</p>
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <div className={styles.packagesGrid}>
          {packageData[activeType].map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`${styles.packageCard} ${pkg.isFeatured ? styles.featured : ''} ${pkg.isPopular ? styles.popular : ''} ${expandedCard === pkg.id ? styles.expanded : ''}`}
              style={{ '--animation-delay': `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Floating elements for interaction */}
              {hoveredCard === pkg.id && (
                <div className={styles.floatingElements}>
                  <Heart className={`${styles.floatingIcon} ${styles.heart}`} size={16} />
                  <Star className={`${styles.floatingIcon} ${styles.star1}`} size={12} />
                  <Star className={`${styles.floatingIcon} ${styles.star2}`} size={10} />
                  <MousePointer className={`${styles.floatingIcon} ${styles.pointer}`} size={14} />
                </div>
              )}

              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div 
                  className={styles.tierBadge} 
                  style={{ backgroundColor: getTierColor(pkg.tier) }}
                >
                  {pkg.tier}
                </div>
                {pkg.isPopular && (
                  <div className={styles.popularBadge}>
                    <Award size={14} />
                    Most Popular
                  </div>
                )}
                {pkg.isFeatured && (
                  <div className={styles.featuredBadge}>
                    <CheckSquare size={14} />
                    Recommended
                  </div>
                )}
              </div>

              {/* Card Title */}
              <div className={styles.cardTitleSection}>
                <h3 className={styles.packageTitle}>{pkg.title}</h3>
                <p className={styles.packageDescription}>{pkg.description}</p>
                <div className={styles.targetRevenue}>{pkg.targetRevenue}</div>
              </div>

              {/* Card Pricing */}
              <div className={styles.cardPricing}>
                <div className={styles.priceMain}>
                  <span className={styles.priceAmount}>{pkg.price}</span>
                  <span className={styles.pricePeriod}>{pkg.period}</span>
                </div>
                <div className={styles.priceDetails}>
                  <div className={styles.commitment}>
                    <Clock size={14} />
                    {pkg.commitment}
                  </div>
                  <div className={styles.priceType}>
                    {pkg.isOneTime ? 'One-time project' : 'Monthly retainer'}
                  </div>
                </div>
              </div>

              {/* Quick Features Preview */}
              <div className={styles.quickFeatures}>
                {pkg.features && pkg.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Expand Button */}
              <button 
                className={styles.expandButton}
                onClick={() => toggleExpanded(pkg.id)}
              >
                <span>
                  {expandedCard === pkg.id ? 'Show Less' : 'View Details'}
                </span>
                <ChevronDown 
                  size={18} 
                  className={expandedCard === pkg.id ? styles.rotated : ''}
                />
              </button>

              {/* Expanded Content */}
              {expandedCard === pkg.id && (
                <div className={styles.expandedContent}>
                  {/* Detailed Deliverables */}
                  {pkg.deliverables && (
                    <div className={styles.detailSection}>
                      <h4 className={styles.sectionTitle}>
                        <CheckSquare size={18} />
                        Detailed Deliverables
                      </h4>
                      <div className={styles.deliverablesGrid}>
                        {Object.entries(pkg.deliverables).map(([category, items]) => (
                         <div key={category} className={styles.deliverableGroup}>
                           <div className={styles.groupHeader}>
                             {getFeatureIcon(category)}
                             <h5>{category}</h5>
                           </div>
                           <ul className={styles.deliverableList}>
                             {items.map((item, idx) => (
                               <li key={idx}>
                                 <CheckCircle2 size={14} />
                                 {item}
                               </li>
                             ))}
                           </ul>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             )}

             {/* Action Buttons */}
             <div className={styles.cardActions}>
               <button className={styles.selectPackageBtn}>
                 <span>Select Package</span>
                 <ArrowRight size={18} />
               </button>
             </div>
           </div>
         ))}
       </div>

       {/* Package Finder Wizard */}
       <div className={styles.wizardSection}>
         <div className={styles.wizardHeader}>
           <h2>Find Your Perfect Package</h2>
           <p>Answer a few questions to get personalized recommendations</p>
           
           {!showResults && (
             <div className={styles.progressContainer}>
               <div className={styles.progressBar}>
                 <div 
                   className={styles.progressFill} 
                   style={{ width: `${((wizardStep + 1) / wizardQuestions.length) * 100}%` }}
                 ></div>
               </div>
               <span className={styles.progressText}>
                 Step {wizardStep + 1} of {wizardQuestions.length}
               </span>
             </div>
           )}
         </div>

         {!showResults ? (
           <div className={styles.wizardContent}>
             <div className={styles.questionCard}>
               <div className={styles.questionHeader}>
                 <div className={styles.questionNumber}>{wizardStep + 1}</div>
                 <h3>{wizardQuestions[wizardStep].question}</h3>
               </div>

               <div className={styles.questionBody}>
                 {wizardQuestions[wizardStep].type === 'single' && (
                   <div className={styles.singleChoice}>
                     {wizardQuestions[wizardStep].options.map((option) => (
                       <button
                         key={option.value}
                         className={`${styles.choiceButton} ${
                           wizardAnswers[wizardQuestions[wizardStep].id] === option.value ? styles.selected : ''
                         }`}
                         onClick={() => handleWizardAnswer(wizardQuestions[wizardStep].id, option.value)}
                       >
                         <option.icon size={24} />
                         <span>{option.label}</span>
                         <ChevronRight size={18} />
                       </button>
                     ))}
                   </div>
                 )}

                 {wizardQuestions[wizardStep].type === 'multiple' && (
                   <div className={styles.multipleChoice}>
                     {wizardQuestions[wizardStep].options.map((option) => {
                       const currentAnswers = wizardAnswers[wizardQuestions[wizardStep].id] || [];
                       const isSelected = currentAnswers.includes(option.value);
                       
                       return (
                         <button
                           key={option.value}
                           className={`${styles.multiChoiceButton} ${isSelected ? styles.selected : ''}`}
                           onClick={() => {
                             const newSelection = isSelected 
                               ? currentAnswers.filter(v => v !== option.value)
                               : [...currentAnswers, option.value];
                             handleWizardAnswer(wizardQuestions[wizardStep].id, newSelection);
                           }}
                         >
                           <option.icon size={20} />
                           <span>{option.label}</span>
                           <div className={styles.checkbox}>
                             {isSelected && <CheckCircle2 size={16} />}
                           </div>
                         </button>
                       );
                     })}
                     
                     <div className={styles.navigationButtons}>
                       {wizardStep > 0 && (
                         <button 
                           className={styles.backButton}
                           onClick={() => setWizardStep(wizardStep - 1)}
                         >
                           ← Back
                         </button>
                       )}
                       <button 
                         className={styles.nextButton}
                         onClick={() => {
                           if (wizardStep < wizardQuestions.length - 1) {
                             setWizardStep(wizardStep + 1);
                           } else {
                             generateRecommendations(wizardAnswers);
                           }
                         }}
                         disabled={!wizardAnswers[wizardQuestions[wizardStep].id]?.length}
                       >
                         {wizardStep === wizardQuestions.length - 1 ? 'Get Recommendations' : 'Next →'}
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </div>
         ) : (
           <div className={styles.resultsSection}>
             <div className={styles.resultsHeader}>
               <div className={styles.resultsTitle}>
                 <CheckCircle2 size={32} />
                 <h3>Your Personalized Recommendations</h3>
               </div>
               <p>Based on your answers, here are the packages that best fit your needs:</p>
             </div>

             <div className={styles.recommendationGrid}>
               {recommendedPackages.map((pkg, index) => (
                 <div key={pkg.id} className={`${styles.recommendationCard} ${index === 0 ? styles.topChoice : ''}`}>
                   {index === 0 && (
                     <div className={styles.topChoiceBadge}>
                       <Award size={16} />
                       Best Match
                     </div>
                   )}
                   
                   <div className={styles.matchScore}>
                     <div className={styles.scoreCircle}>
                       <span>{pkg.score}%</span>
                     </div>
                     <div className={styles.matchLabel}>Match</div>
                   </div>

                   <div className={styles.recCardContent}>
                     <div className={styles.recCardHeader}>
                       <div className={styles.tierBadge} style={{ backgroundColor: getTierColor(pkg.tier) }}>
                         {pkg.tier}
                       </div>
                       <h4>{pkg.title}</h4>
                       <div className={styles.recPrice}>
                         {pkg.price}<span>{pkg.period}</span>
                       </div>
                     </div>

                     <div className={styles.whyRecommended}>
                       <h5>Why this package:</h5>
                       <ul>
                         {pkg.reasons.map((reason, idx) => (
                           <li key={idx}>
                             <CheckCircle2 size={14} />
                             {reason}
                           </li>
                         ))}
                       </ul>
                     </div>

                     <div className={styles.recActions}>
                       <button className={styles.selectRecButton}>
                         Select Package
                         <ArrowRight size={16} />
                       </button>
                       <button className={styles.viewDetailsButton}>
                         View Details
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             <div className={styles.resultsActions}>
               <button className={styles.retakeButton} onClick={resetWizard}>
                 <BarChart3 size={18} />
                 Retake Quiz
               </button>
               <button className={styles.consultationButton}>
                 <Headphones size={18} />
                 Book Consultation
               </button>
             </div>
           </div>
         )}
       </div>

       {/* CTA Section */}
       <div className={styles.ctaSection}>
         <div className={styles.ctaContent}>
           <div className={styles.ctaHeader}>
             <h2>Ready to Transform Your Business?</h2>
             <p>
               Let's discuss how our packages can accelerate your growth with clear deliverables and measurable results.
             </p>
           </div>

           <div className={styles.ctaFeatures}>
             <div className={styles.ctaFeature}>
               <Shield size={20} />
               <span>Transparent Pricing</span>
             </div>
             <div className={styles.ctaFeature}>
               <CheckCircle2 size={20} />
               <span>Clear Deliverables</span>
             </div>
             <div className={styles.ctaFeature}>
               <BarChart3 size={20} />
               <span>Measurable Results</span>
             </div>
             <div className={styles.ctaFeature}>
               <Headphones size={20} />
               <span>Expert Support</span>
             </div>
           </div>

           <div className={styles.ctaButtons}>
             <button className={styles.primaryCta}>
               <span>Schedule Strategy Call</span>
               <ArrowRight size={20} />
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default PremiumPackageShowcase;