import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "services/supabase";
import createContext from "./createContext";

type AuthContextProps = {
  user: User;
  signOut: () => void;
  userLoading: boolean;
  isLoggedIn: boolean;
};

export const [useAuth, CtxProvider] = createContext<AuthContextProps>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const signOut = async () => await supabase.auth.signOut();

  const setServerSession = async (event: AuthChangeEvent, session: Session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const user = supabase.auth.user();

    setUserLoading(false);
    if (user) {
      setUser(user);
      setLoggedIn(true);
      // Router.push("/");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        await setServerSession(event, session); // <- placing here will take care of setting, as well as re-setting the API maintained user session
        if (user) {
          setUser(user);
          setLoggedIn(true);
          // Router.push("/channels/public"); // Your users will automatically be redirected to the `/profile` page on logging in
        } else {
          // new
          setUser(null); // new: nullify the user object
          Router.push("/"); // new: redirect to the home page
        }
      }
    );

    return () => {
      authListener.unsubscribe(); // We'll simply unsubscribe from listening to the events when the user navigates away from our App.
    };
  }, []);

  return (
    <CtxProvider value={{ user, signOut, isLoggedIn, userLoading }}>
      {children}
    </CtxProvider>
  );
}
