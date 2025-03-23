"use client";

import { UserTypes } from "@/types/globals";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<UserTypes | null>(null);
  const router = useRouter();
  useEffect(() => {
    const currentUser = JSON.parse(
      sessionStorage.getItem("currentUser") || "null",
    );
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  function logOut() {
    setUser(null);
    sessionStorage.removeItem("currentUser");
    router.push("/");
  }

  return { user, setUser, logOut };
}
