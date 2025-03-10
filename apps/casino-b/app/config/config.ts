// Local configuration object for casino brands
export const CASINO_BRAND_CONFIG = {
  "casino-b": {
    // Name of the casino brand
    name: "Casino B",
    
    // List of routes that are restricted for this casino brand
    restrictedRoutes: ["/my-profile"],
  },
};

/* 
 * This local configuration is best used as an override to the global config.
 * It was added later, and currently, the global config fulfills all needs for this scope.
 * As a result, there hasn't been a need to implement the override yet.
 */
