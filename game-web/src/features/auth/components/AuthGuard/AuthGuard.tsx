"use client";

import { useAuthStore } from "@/features/auth/stores/auth.store";
import { AuthContextProvider } from "./AuthContext";

import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/auth.services";

export const AuthGuard = ({
  children,
  skeleton,
  fallback,
}: {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const isLoading = useAuthStore((s) => s.isLoading);

  const user = useAuthStore((s) => s.user);

  const setUser = useAuthStore((s) => s.setUser);

  const { mutateAsync } = useMutation({
    mutationFn: logout,
    retry: false,
  });

  const handleLogout = () => {
    mutateAsync().then(() => {
      setUser(null);
    });
  };

  if (isLoading) {
    return <>{skeleton ?? null}</>;
  }

  if (!user) {
    return <>{fallback ?? null}</>;
  }

  return (
    <AuthContextProvider user={user} logout={handleLogout}>
      {children}
    </AuthContextProvider>
  );
};
