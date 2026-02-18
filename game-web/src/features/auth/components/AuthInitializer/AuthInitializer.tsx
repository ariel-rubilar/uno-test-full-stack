"use client";

import { getMe } from "@/features/auth/services/auth.services";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (isSuccess) {
      setUser(data ? data : null);
    }
  }, [isSuccess, data, setUser]);

  useEffect(() => {
    if (isError) {
      setUser(null);
    }
  }, [isError, setUser]);

  return <>{children}</>;
};
