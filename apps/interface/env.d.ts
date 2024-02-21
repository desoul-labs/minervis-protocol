declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WC_PROJECT_ID: string;
      NEXT_PUBLIC_MIXPANEL_TOKEN: string;
      NEXT_PUBLIC_CONVEX_URL: string;
      NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
