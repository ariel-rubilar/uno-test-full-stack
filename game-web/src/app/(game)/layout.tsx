import { AuthGuard } from "@/features/auth/components/AuthGuard";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard fallback={"Unauthorized"} skeleton={"loading..."}>
      {children}
    </AuthGuard>
  );
}
