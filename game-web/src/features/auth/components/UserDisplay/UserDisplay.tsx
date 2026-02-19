"use client";

import { ReactNode } from "react";
import { useAuthContext } from "../AuthGuard/AuthContext";
import { User } from "../../models/user";

const UserDisplay = ({ children }: { children: (user: User) => ReactNode }) => {
  const { user } = useAuthContext("UserDisplay");

  return children(user);
};

export default UserDisplay;
