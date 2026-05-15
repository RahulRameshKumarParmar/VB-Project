"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiHandRaised } from "react-icons/hi2";

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const getAuthUser = useAuthStore((state) => state.getAuthUser);
  const updateIsAuthenticated = useAuthStore(
    (state) => state.updateIsAuthenticate,
  );
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  console.log(isAuthenticated);

  useEffect(() => {
    getAuthUser();
    updateIsAuthenticated();
  }, []);

  return (
    <div>
      <Typography sx={{fontSize: 32, fontWeight: 'bold'}} variant="h1">Welcome back, {currentUser?.firstName} <HiHandRaised /></Typography>
    </div>
  );
}
