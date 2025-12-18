/**
 * Application Constants
 */

/**
 * Service data model
 * Defines available courier services
 */
export const SERVICES = [
  {
    id: 'domestic',
    name: 'Domestic Shipping',
    description: 'Fast and reliable shipping within the country',
    longDescription:
      'Our domestic shipping service provides reliable delivery across the nation. With multiple delivery speed options and comprehensive tracking, your packages arrive safely and on time.',
    features: [
      'Next-day delivery available',
      'Real-time tracking',
      'Insurance included',
      'Signature on delivery',
      'Weekend delivery options',
    ],
    icon: 'FaTruck',
    deliveryTime: '1-3 business days',
    category: 'domestic',
  },
  {
    id: 'international',
    name: 'International Shipping',
    description: 'Worldwide delivery to over 200 countries',
    longDescription:
      'Ship your packages anywhere in the world with our international shipping service. We handle customs documentation and provide door-to-door delivery with full tracking.',
    features: [
      'Customs clearance assistance',
      'Global tracking',
      'Insurance coverage',
      'Express options available',
      'Duty and tax calculation',
    ],
    icon: 'FaGlobe',
    deliveryTime: '5-10 business days',
    category: 'international',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Same-day and overnight delivery options',
    longDescription:
      'When time is critical, our express delivery service ensures your packages arrive as quickly as possible. Available for both domestic and international shipments.',
    features: [
      'Same-day delivery',
      'Overnight shipping',
      'Priority handling',
      'Dedicated support',
      'Money-back guarantee',
    ],
    icon: 'FaBolt',
    deliveryTime: 'Same day or overnight',
    category: 'express',
  },
  {
    id: 'freight',
    name: 'Freight Services',
    description: 'Heavy and oversized cargo shipping',
    longDescription:
      'Our freight service handles large, heavy, or oversized shipments with specialized equipment and handling. Perfect for business and industrial shipping needs.',
    features: [
      'Pallet shipping',
      'LTL and FTL options',
      'Specialized handling',
      'Warehouse storage',
      'White glove service',
    ],
    icon: 'FaWarehouse',
    deliveryTime: '3-7 business days',
    category: 'freight',
  },
];

/**
 * Get service by ID
 * @param {string} id - Service ID
 * @returns {Object|null} - Service object or null if not found
 */
export const getServiceById = (id) => {
  return SERVICES.find((service) => service.id === id) || null;
};

/**
 * Get services by category
 * @param {string} category - Service category
 * @returns {Array} - Array of services in the category
 */
export const getServicesByCategory = (category) => {
  return SERVICES.filter((service) => service.category === category);
};

/**
 * Pricing tier data model
 * Defines available pricing plans
 */
export const PRICING_TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'per-shipment',
    features: [
      'Standard delivery (3-5 days)',
      'Basic tracking',
      'Up to 5kg weight limit',
      'Email support',
      'Insurance up to $100',
    ],
    limitations: ['No express delivery', 'Limited customer support hours'],
    recommended: false,
    ctaText: 'Get Started',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49.99,
    period: 'monthly',
    features: [
      'Unlimited standard shipments',
      'Express delivery available',
      'Advanced tracking & notifications',
      'Up to 25kg weight limit',
      'Priority email & phone support',
      'Insurance up to $500',
      '10% discount on all shipments',
    ],
    limitations: [],
    recommended: true,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.99,
    period: 'monthly',
    features: [
      'Unlimited shipments (all speeds)',
      'Same-day delivery available',
      'Real-time tracking & API access',
      'No weight limits',
      'Dedicated account manager',
      '24/7 priority support',
      'Insurance up to $5000',
      '20% discount on all shipments',
      'Custom integration support',
      'Bulk shipping discounts',
    ],
    limitations: [],
    recommended: false,
    ctaText: 'Contact Sales',
  },
];

/**
 * Get pricing tier by ID
 * @param {string} id - Pricing tier ID
 * @returns {Object|null} - Pricing tier object or null if not found
 */
export const getPricingTierById = (id) => {
  return PRICING_TIERS.find((tier) => tier.id === id) || null;
};

/**
 * Get recommended pricing tier
 * @returns {Object|null} - Recommended pricing tier or null if none
 */
export const getRecommendedTier = () => {
  return PRICING_TIERS.find((tier) => tier.recommended) || null;
};

/**
 * Testimonial data model
 * Defines customer testimonials
 */
export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    text: 'This tracking helper is amazing! I can quickly find my Australia Post tracking details without searching through their website. Saves me so much time.',
    customerName: 'Sarah Johnson',
    customerPhoto: 'https://i.pravatar.cc/150?img=1',
    location: 'Sydney, Australia',
    company: 'Online Store Owner',
  },
  {
    id: 'testimonial-2',
    text: 'Perfect for checking my package status. One click and I am straight to the official Australia Post tracking page. Simple and reliable!',
    customerName: 'Michael Chen',
    customerPhoto: 'https://i.pravatar.cc/150?img=13',
    location: 'Melbourne, Australia',
    company: 'Frequent Online Shopper',
  },
  {
    id: 'testimonial-3',
    text: 'I love how clear this site is about being an independent helper. No confusion, just direct access to AusPost tracking. Exactly what I needed!',
    customerName: 'Emma Williams',
    customerPhoto: 'https://i.pravatar.cc/150?img=5',
    location: 'Brisbane, Australia',
    company: null,
  },
  {
    id: 'testimonial-4',
    text: 'The best tracking assistant I have found. Always takes me to the right Australia Post page instantly. Makes tracking shipments so much easier!',
    customerName: 'David Martinez',
    customerPhoto: 'https://i.pravatar.cc/150?img=12',
    location: 'Perth, Australia',
    company: 'Small Business Owner',
  },
];

/**
 * Get testimonial by ID
 * @param {string} id - Testimonial ID
 * @returns {Object|null} - Testimonial object or null if not found
 */
export const getTestimonialById = (id) => {
  return TESTIMONIALS.find((testimonial) => testimonial.id === id) || null;
};
