import { signOut } from "next-auth/react";

/**
 * NextAuth compatible authentication helpers
 */

/**
 * Clear all application data and sign out user
 */
export const clearStoreAndSignOut = async () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.sessionStorage.clear();
    
    await signOut({ 
      redirect: true,
      callbackUrl: "/" 
    });
  }
};

/**
 * Clear only application data (keep NextAuth session)
 */
export const clearAppData = () => {
  if (typeof window !== "undefined") {
    const keysToKeep = ['next-auth.session-token', 'next-auth.csrf-token'];
    
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
        localStorage.removeItem(key);
      }
    });
    
    window.sessionStorage.clear();
  }
};

/**
 * Initialize app on first visit
 */
export const initializeApp = () => {
  if (typeof window !== "undefined") {
    const isFirstVisit = !localStorage.getItem("appInitialized");

    if (isFirstVisit) {
      clearAppData();
      
      localStorage.setItem("appInitialized", "true");
    }
  }
};
