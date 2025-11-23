/**
 * @fileOverview Centralized configuration using environment variables
 * All environment-dependent settings go here
 */

// ===================================
// Site Configuration
// ===================================
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'NJR Tech',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://njrtech.com',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contato@njrtech.com',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+55 (11) XXXXX-XXXX',
  website: process.env.NEXT_PUBLIC_BUSINESS_WEBSITE || 'https://njrtech.com',
} as const;

// ===================================
// Feature Flags
// ===================================
export const FEATURES = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  chatbot: process.env.NEXT_PUBLIC_ENABLE_CHATBOT === 'true',
  faqExpansion: process.env.NEXT_PUBLIC_ENABLE_FAQ_EXPANSION === 'true',
  personalization: process.env.NEXT_PUBLIC_ENABLE_PERSONALIZATION === 'true',
  seoOptimization: process.env.NEXT_PUBLIC_SEO_ENABLED === 'true',
  schemaMarkup: process.env.NEXT_PUBLIC_SCHEMA_ORG_ENABLED === 'true',
} as const;

// ===================================
// API Configuration
// ===================================
export const API_CONFIG = {
  timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
  maxRequestSize: process.env.MAX_REQUEST_SIZE || '10mb',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;

// ===================================
// AI/Genkit Configuration
// ===================================
export const AI_CONFIG = {
  apiKey: process.env.GENKIT_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
  model: process.env.GENKIT_MODEL || 'googleai/gemini-2.5-flash',
  enabled: !!process.env.GENKIT_API_KEY,
} as const;

// ===================================
// Analytics Configuration
// ===================================
export const ANALYTICS_CONFIG = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
} as const;

// ===================================
// Firebase Configuration
// ===================================
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // This should only be used in server-side code
  adminKey: process.env.FIREBASE_ADMIN_KEY,
  enabled: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
} as const;

// ===================================
// Environment Detection
// ===================================
export const ENVIRONMENT = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isStaging: (process.env.NODE_ENV as string) === 'staging',
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;

// ===================================
// Validation & Helper Functions
// ===================================

/**
 * Validate critical environment variables are set
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Firebase validation (if analytics is enabled)
  if (FEATURES.analytics && !FIREBASE_CONFIG.projectId) {
    errors.push('Firebase project ID is required for analytics');
  }

  // AI validation (if FAQ expansion is enabled)
  if (FEATURES.faqExpansion && !AI_CONFIG.apiKey) {
    errors.push('Genkit API key is required for FAQ expansion');
  }

  // Analytics validation
  if (FEATURES.analytics && !ANALYTICS_CONFIG.gaId) {
    errors.push('Google Analytics ID is required for analytics');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Log configuration status (safe for client-side)
 */
export function logConfigStatus(): void {
  if (ENVIRONMENT.isDevelopment) {
    console.log('📋 Configuration Status:', {
      site: SITE_CONFIG.name,
      features: FEATURES,
      analytics: ANALYTICS_CONFIG.enabled,
      ai: AI_CONFIG.enabled,
      firebase: FIREBASE_CONFIG.enabled,
    });

    const validation = validateConfig();
    if (!validation.valid) {
      console.warn('⚠️ Configuration warnings:', validation.errors);
    }
  }
}

/**
 * Check if a specific feature is available
 */
export function isFeatureEnabled(featureName: keyof typeof FEATURES): boolean {
  return FEATURES[featureName];
}

export default {
  site: SITE_CONFIG,
  features: FEATURES,
  api: API_CONFIG,
  ai: AI_CONFIG,
  analytics: ANALYTICS_CONFIG,
  firebase: FIREBASE_CONFIG,
  environment: ENVIRONMENT,
  validateConfig,
  logConfigStatus,
  isFeatureEnabled,
};
