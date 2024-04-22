import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

// Handles state management throughout the App
const AuthContext = createContext({});

// Creates custom useAuth hook 
export const useAuth = () => useContext(AuthContext);

// Login 
const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

// Signout
const signOut = () => supabase.auth.signOut();

// Password reset
const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password"
  });

// Update password
const updatePassword = (updatedPassword) =>
  supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  // Indicates state of app when we reload the page
  const [loading, setLoading] = useState(true);

  // useEffect hook is to to set up initial loading state, fetch data,
  // listens for auth state changes, and clean up event listener
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      // Fetch user data from supabase
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);
      setLoading(false);
    };
    // Immediately invoked after mount to retrieve user data
    getUser();
    // onAuthStateChange is a listener that receives a notif every time auth event occurs
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Password reset
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      // Successful sign in
      } else if (event === "SIGNED_IN") {
        setUser(session.user); // Update user state
        setAuth(true); // Set auth to true
      // Successful sign out
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      // Unsubscribe from auth listener when compnent unmounts 
      data.subscription.unsubscribe();
    };
  }, []); // Only runs once when component mounts

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        login,
        signOut,
        passwordReset,
        updatePassword
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
