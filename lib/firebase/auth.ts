import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  User
} from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    toast.success(`Welcome back, ${result.user.displayName}!`);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google", error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/popup-closed-by-user') {
      toast.error("Sign-in cancelled");
    } else if (error.code === 'auth/popup-blocked') {
      toast.error("Popup blocked by browser. Please allow popups for this site.");
    } else if (error.code === 'auth/network-request-failed') {
      toast.error("Network error. Please check your connection.");
    } else if (error.code === 'auth/configuration-not-found' || error.message?.includes('configuration-not-found')) {
      toast.info("Firebase Auth not configured. Proceeding with mock login for development.");
      // Return a mock user object so the app flow can continue
      return {
        uid: "mock-user-123",
        displayName: "Test User",
        email: "test@example.com",
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: "",
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => "mock-token",
        getIdTokenResult: async () => ({} as any),
        reload: async () => {},
        toJSON: () => ({}),
        phoneNumber: null,
        photoURL: null,
        providerId: "google.com",
      } as User;
    } else {
      toast.error("Failed to sign in. Please try again.");
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    toast.success("Successfully logged out");
  } catch (error) {
    console.error("Error signing out", error);
    toast.error("Failed to log out");
  }
};
