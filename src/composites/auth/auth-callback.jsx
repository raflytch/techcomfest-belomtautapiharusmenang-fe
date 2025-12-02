"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next/client";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setUser } from "@/features/slices/user.slice";
import { authService } from "@/services/auth.service";
import FullscreenLoader from "@/components/ui/fullscreen-loader";

export default function AuthCallbackComposite() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const needsProfileCompletion = searchParams.get("needsProfileCompletion");

      if (!token) {
        toast.error("Token tidak ditemukan");
        window.location.href = "/auth";
        return;
      }

      try {
        // Set cookie
        setCookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        // Get session data
        const sessionData = await authService.getSession();
        dispatch(setUser(sessionData.data));
        queryClient.invalidateQueries({ queryKey: ["session"] });

        toast.success("Login dengan Google berhasil!");

        // Redirect based on needsProfileCompletion or role
        if (needsProfileCompletion === "true") {
          window.location.href = "/profile";
        } else {
          const role = sessionData.data?.role;
          switch (role) {
            case "UMKM":
              window.location.href = "/dashboard/umkm";
              break;
            case "DLH":
              window.location.href = "/dashboard/dinas";
              break;
            case "ADMIN":
              window.location.href = "/dashboard/admin";
              break;
            default:
              window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("Error processing callback:", error);
        toast.error("Gagal memproses login Google");
        window.location.href = "/auth";
      }
    };

    handleCallback();
  }, [searchParams, dispatch, queryClient]);

  return <FullscreenLoader text="Memproses login Google..." />;
}
