import React, { useState, useCallback, useMemo } from 'react';
import {
  Package, Rocket, ShoppingBag, Globe, CheckCircle2, ArrowRight, 
  Building, Target, Briefcase, DollarSign, TrendingUp, 
  Shield, Database, Code, Headphones, ChevronDown, ChevronRight,
  Calendar, Monitor, Zap, Award, Users, Settings, Search, BarChart3, 
  Clock, Layers, FileText, CheckSquare, Sparkles, Gauge, Star,
  MousePointer, Eye, Heart, MessageCircle
} from 'lucide-react';
import styles from './PackageShowcase.module.css';
// ============================================================================
// DATA LAYER
// ============================================================================

const PACKAGE_TYPES = {
  BUILD_MARKET: 'build-market',
  MARKET_BOOST: 'market-boost',
  COMPLETE: 'complete'
};

const TIERS = {
  MICRO: 'MICRO',
  BASIC: 'BASIC', 
  GROWTH: 'GROWTH',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE'
};

const packageTypeConfig = [
  {
    id: PACKAGE_TYPES.BUILD_MARKET,
    title: 'Build + Market',
    description: 'For businesses with no online presence',
    icon: Rocket,
    subtitle: 'E-commerce platform + digital marketing'
  },
  {
    id: PACKAGE_TYPES.MARKET_BOOST,
    title: 'Market + Boost', 
    description: 'For businesses with existing websites',
    icon: TrendingUp,
    subtitle: 'Digital marketing + conversion optimization'
  },
  {
    id: PACKAGE_TYPES.COMPLETE,
    title: 'Complete Solution',
    description: 'Full IV Creative experience',
    icon: Globe,
    subtitle: 'E-commerce + marketing + design + fulfillment'
  }
];

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

const tierColors = {
  [TIERS.MICRO]: '#10b981',
  [TIERS.BASIC]: '#3b82f6',
  [TIERS.GROWTH]: '#f59e0b',
  [TIERS.PREMIUM]: '#ef4444',
  [TIERS.ENTERPRISE]: '#1f2937'
};

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

// Sample package data - simplified structure
const samplePackages = {
  [PACKAGE_TYPES.BUILD_MARKET]: [
    {
      id: 'micro-start',
      title: 'Micro Start',
      tier: TIERS.MICRO,
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
        ]
      }
    },
    {
      id: 'basic-build',
      title: 'Basic Build',
      tier: TIERS.BASIC,
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
        ]
      }
    }
  ],
  [PACKAGE_TYPES.MARKET_BOOST]: [
    {
      id: 'basic-boost',
      title: 'Basic Boost',
      tier: TIERS.BASIC,
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
        ]
      }
    }
  ],
  [PACKAGE_TYPES.COMPLETE]: [
    {
      id: 'growth-complete',
      title: 'Growth Complete',
      tier: TIERS.GROWTH,
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
          'Personalization for 5 products'
        ],
        'COMPLETE MARKETING': [
          'Google & Meta ads management',
          'Email marketing automation',
          'Content & SEO program'
        ]
      }
    }
  ]
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useAnimations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return { isLoaded };
};

const useWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = useCallback((questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    const currentQuestion = wizardQuestions[currentStep];
    if (currentQuestion.type === 'single') {
      setTimeout(() => {
        if (currentStep < wizardQuestions.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setShowResults(true);
        }
      }, 300);
    }
  }, [answers, currentStep]);
  
  const nextStep = useCallback(() => {
    if (currentStep < wizardQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep]);
  
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);
  
  const reset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  }, []);
  
  const progress = useMemo(() => 
    ((currentStep + 1) / wizardQuestions.length) * 100, 
    [currentStep]
  );
  
  return {
    currentStep,
    answers,
    showResults,
    progress,
    handleAnswer,
    nextStep,
    prevStep,
    reset
  };
};

const useRecommendations = (answers, activeType) => {
  return useMemo(() => {
    if (!Object.keys(answers).length) return [];
    
    const allPackages = Object.values(samplePackages).flat();
    
    const scored = allPackages.map(pkg => {
      let score = 0;
      const reasons = [];
      
      // Website status scoring
      if (answers.website_status === 'none' && activeType === PACKAGE_TYPES.BUILD_MARKET) {
        score += 30;
        reasons.push('Perfect for building from scratch');
      }
      
      // Revenue-based scoring
      const revenueMap = {
        startup: TIERS.MICRO,
        small: TIERS.BASIC,
        medium: TIERS.GROWTH,
        large: TIERS.PREMIUM,
        enterprise: TIERS.ENTERPRISE
      };
      
      if (revenueMap[answers.business_revenue] === pkg.tier) {
        score += 35;
        reasons.push(`Perfect fit for ${pkg.tier.toLowerCase()} tier`);
      }
      
      // Timeline alignment
      if (answers.timeline === 'urgent' && pkg.isOneTime) {
        score += 30;
        reasons.push('Quick deployment option');
      }
      
      return {
        ...pkg,
        score: Math.min(score, 100),
        reasons: reasons.slice(0, 3)
      };
    });
    
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers, activeType]);
};

// ============================================================================
// UI COMPONENTS
// ============================================================================

const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide';
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    popular: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white',
    featured: 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white',
    tier: 'text-white'
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 focus:ring-pink-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-white text-pink-600 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 focus:ring-pink-500',
    ghost: 'text-gray-600 hover:text-pink-600 hover:bg-pink-50 focus:ring-pink-500'
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hoverable = false, ...props }) => {
  const baseClasses = 'bg-white/90 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-md';
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

const ProgressBar = ({ progress, className = '' }) => (
  <div className={`w-full bg-pink-100 rounded-full h-2 ${className}`}>
    <div 
      className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// ============================================================================
// FEATURE COMPONENTS
// ============================================================================

const PackageTypeSelector = ({ activeType, onTypeChange }) => {
  return (
    <section className="mb-16">
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 p-2 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-3xl shadow-lg">
          {packageTypeConfig.map((type) => {
            const Icon = type.icon;
            const isActive = activeType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`
                  flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }
                `}
              >
                <Icon size={20} />
                <div className="text-left">
                  <div className="font-semibold">{type.title}</div>
                  <div className={`text-xs ${isActive ? 'text-pink-100' : 'text-gray-500'}`}>
                    {type.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-pink-600 mb-3">
          {packageTypeConfig.find(type => type.id === activeType)?.title}
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {packageTypeConfig.find(type => type.id === activeType)?.description}
        </p>
      </div>
    </section>
  );
};

const PackageCard = ({ 
  package: pkg, 
  isExpanded, 
  onToggleExpanded, 
  animationDelay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCategoryIcon = (category) => {
    const IconComponent = categoryIcons[category] || Package;
    return <IconComponent size={18} />;
  };
  
  return (
    <Card 
      hoverable 
      className={`relative overflow-hidden ${isExpanded ? 'ring-2 ring-pink-500' : ''}`}
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating elements */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <Heart className="absolute top-1/4 right-1/4 text-pink-500 opacity-60 animate-bounce" size={16} />
          <Star className="absolute top-2/5 left-1/10 text-pink-500 opacity-60 animate-pulse" size={12} />
        </div>
      )}
      
      {/* Card Header */}
      <div className="flex justify-between items-start p-6 pb-0">
        <Badge 
          variant="tier" 
          style={{ backgroundColor: tierColors[pkg.tier] }}
        >
          {pkg.tier}
        </Badge>
        
        <div className="flex gap-2">
          {pkg.isPopular && (
            <Badge variant="popular">
              <Award size={12} />
              Popular
            </Badge>
          )}
          {pkg.isFeatured && (
            <Badge variant="featured">
              <CheckSquare size={12} />
              Recommended
            </Badge>
          )}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Title & Description */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
          <p className="text-gray-600 mb-3">{pkg.description}</p>
          <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            {pkg.targetRevenue}
          </div>
        </div>
        
        {/* Pricing */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-baseline mb-3">
            <span className="text-4xl font-black text-pink-600">{pkg.price}</span>
            <span className="text-gray-500 ml-2">{pkg.period}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-pink-500" />
              {pkg.commitment}
            </div>
            <span className="font-medium">
              {pkg.isOneTime ? 'One-time project' : 'Monthly retainer'}
            </span>
          </div>
        </div>
        
        {/* Quick Features */}
        <div className="border-t border-gray-100 pt-6">
          <div className="space-y-3">
            {pkg.features?.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Expand Button */}
        <button
          onClick={() => onToggleExpanded(pkg.id)}
          className="w-full flex items-center justify-center gap-2 py-3 text-pink-600 font-semibold border-t border-gray-100 hover:bg-pink-50 transition-colors"
        >
          <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
          <ChevronDown 
            size={18} 
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-100 pt-6 space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-pink-600 mb-4">
                <CheckSquare size={18} />
                Detailed Deliverables
              </h4>
              <div className="grid gap-4">
                {Object.entries(pkg.deliverables || {}).map(([category, items]) => (
                  <div key={category} className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(category)}
                      <h5 className="font-bold text-gray-800">{category}</h5>
                    </div>
                    <ul className="space-y-2">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-pink-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <Button className="w-full" size="lg">
          <span>Select Package</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </Card>
  );
};

const WizardFlow = ({ wizard, recommendations }) => {
  const currentQuestion = wizardQuestions[wizard.currentStep];
  
  if (wizard.showResults) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 size={32} className="text-emerald-500" />
            <h3 className="text-2xl font-bold text-gray-800">Your Personalized Recommendations</h3>
          </div>
          <p className="text-gray-600">Based on your answers, here are the packages that best fit your needs:</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((pkg, index) => (
            <Card key={pkg.id} className="p-6">
              {index === 0 && (
                <Badge variant="featured" className="mb-4">
                  <Award size={14} />
                  Best Match
                </Badge>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-right">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {pkg.score}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Match</div>
                </div>
              </div>
              
              <div>
                <Badge 
                  variant="tier" 
                  style={{ backgroundColor: tierColors[pkg.tier] }}
                  className="mb-3"
                >
                  {pkg.tier}
                </Badge>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h4>
                <div className="text-2xl font-black text-pink-600 mb-4">
                  {pkg.price}<span className="text-sm font-normal text-gray-500">{pkg.period}</span>
                </div>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-2">Why this package:</h5>
                  <ul className="space-y-1">
                    {pkg.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Select
                    <ArrowRight size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" onClick={wizard.reset}>
            <BarChart3 size={18} />
            Retake Quiz
          </Button>
          <Button>
            <Headphones size={18} />
            Book Consultation
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {wizard.currentStep + 1}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Find Your Perfect Package</h3>
        </div>
        <p className="text-gray-600 mb-6">Answer a few questions to get personalized recommendations</p>
        
        <div className="max-w-md mx-auto mb-6">
          <ProgressBar progress={wizard.progress} />
          <div className="text-sm text-pink-600 font-semibold mt-2">
            Step {wizard.currentStep + 1} of {wizardQuestions.length}
          </div>
        </div>
      </div>
      
      <Card className="p-8">
        <h4 className="text-xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h4>
        
        {currentQuestion.type === 'single' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const Icon = option.icon;
              const isSelected = wizard.answers[currentQuestion.id] === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => wizard.handleAnswer(currentQuestion.id, option.value)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                    ${isSelected 
                      ? 'border-pink-500 bg-pink-50 text-pink-700' 
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                    }
                  `}
                >
                  <Icon size={24} />
                  <span className="font-medium">{option.label}</span>
                  <ChevronRight size={18} className="ml-auto" />
                </button>
              );
            })}
          </div>
        )}
        
        {currentQuestion.type === 'multiple' && (
          <div className="space-y-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                const currentAnswers = wizard.answers[currentQuestion.id] || [];
                const isSelected = currentAnswers.includes(option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      const newSelection = isSelected 
                        ? currentAnswers.filter(v => v !== option.value)
                        : [...currentAnswers, option.value];
                      wizard.handleAnswer(currentQuestion.id, newSelection);
                    }}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                      ${isSelected 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="flex-1 text-left font-medium">{option.label}</span>
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center
                      ${isSelected 
                        ? 'border-pink-500 bg-pink-500 text-white' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && <CheckCircle2 size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-3 justify-end">
              {wizard.currentStep > 0 && (
                <Button variant="secondary" onClick={wizard.prevStep}>
                  ← Back
                </Button>
              )}
              <Button 
                onClick={wizard.nextStep}
                disabled={!wizard.answers[currentQuestion.id]?.length}
              >
                {wizard.currentStep === wizardQuestions.length - 1 ? 'Get Recommendations' : 'Next →'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const CTASection = () => (
  <section className="relative mt-20 mb-12">
    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='white' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="relative p-12 text-center text-white">
        <h2 className="text-4xl font-black mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
          Let's discuss how our packages can accelerate your growth with clear deliverables and measurable results.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Shield, label: 'Transparent Pricing' },
            { icon: CheckCircle2, label: 'Clear Deliverables' },
            { icon: BarChart3, label: 'Measurable Results' },
            { icon: Headphones, label: 'Expert Support' }
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
        
        <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-50">
          <span>Schedule Strategy Call</span>
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  </section>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PremiumPackageShowcase = () => {
  const [activeType, setActiveType] = useState(PACKAGE_TYPES.BUILD_MARKET);
  const [expandedCard, setExpandedCard] = useState(null);
  
  const { isLoaded } = useAnimations();
  const wizard = useWizard();
  const recommendations = useRecommendations(wizard.answers, activeType);
  
  const currentPackages = samplePackages[activeType] || [];
  
  const handleToggleExpanded = useCallback((packageId) => {
    setExpandedCard(prev => prev === packageId ? null : packageId);
  }, []);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <Badge className="mb-6 bg-white/80 backdrop-blur-sm border border-pink-200">
            <Package size={16} />
            IV Creative Packages
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="text-gray-800">Package</span>
          </h1>
          
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-6" />
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From £1,000 proof-of-concept to enterprise solutions. 
            Tailored packages for businesses at every stage of growth.
          </p>
        </header>
        
        {/* Package Type Selector */}
        <PackageTypeSelector 
          activeType={activeType}
          onTypeChange={setActiveType}
        />
        
        {/* Package Grid */}
        <section className="mb-20">
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {currentPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isExpanded={expandedCard === pkg.id}
                onToggleExpanded={handleToggleExpanded}
                animationDelay={index * 100}
              />
            ))}
          </div>
        </section>
        
        {/* Wizard Section */}
        <section className="mb-20">
          <Card className="p-8">
            <WizardFlow 
              wizard={wizard}
              recommendations={recommendations}
            />
          </Card>
        </section>
        
        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
};

export default PremiumPackageShowcase;