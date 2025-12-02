"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import {
  setUser,
  clearUser,
  setLoading,
  setError,
} from "@/features/slices/user.slice";
import { toast } from "sonner";

export const useRegisterUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.registerUser,
    onSuccess: (data, variables) => {
      toast.success("Registrasi berhasil! Silakan verifikasi email Anda.");
      router.push(`/sign-up/otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registrasi gagal");
    },
  });
};

export const useRegisterUmkm = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.registerUmkm,
    onSuccess: (data, variables) => {
      toast.success("Registrasi UMKM berhasil! Silakan verifikasi email Anda.");
      router.push(`/sign-up/otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registrasi gagal");
    },
  });
};

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: () => {
      toast.success("Verifikasi berhasil! Silakan login.");
      router.push("/auth");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Verifikasi OTP gagal");
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: authService.resendOtp,
    onSuccess: () => {
      toast.success("Kode OTP baru telah dikirim ke email Anda.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengirim ulang OTP");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { accessToken, user } = data.data;

      setCookie("token", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      dispatch(setUser(user));
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Login berhasil!");

      switch (user.role) {
        case "WARGA":
          router.push("/");
          break;
        case "UMKM":
          router.push("/dashboard/umkm");
          break;
        case "DLH":
          router.push("/dashboard/dinas");
          break;
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login gagal");
    },
  });
};

export const useSession = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      dispatch(setLoading(true));
      try {
        const data = await authService.getSession();
        dispatch(setUser(data.data));
        return data.data;
      } catch (error) {
        dispatch(setError(error.message));
        throw error;
      }
    },
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const logout = () => {
    deleteCookie("token");
    dispatch(clearUser());
    queryClient.clear();
    toast.success("Logout berhasil!");
    router.push("/");
  };

  return { logout };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Profil berhasil diperbarui!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil");
    },
  });
};

export const useUpdateUmkmProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateUmkmProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Profil UMKM berhasil diperbarui!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui profil UMKM"
      );
    },
  });
};

export const useRequestDeleteAccount = () => {
  return useMutation({
    mutationFn: authService.requestDeleteAccount,
    onSuccess: () => {
      toast.success("Kode verifikasi telah dikirim ke email Anda.");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memproses permintaan"
      );
    },
  });
};

export const useConfirmDeleteAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.confirmDeleteAccount,
    onSuccess: () => {
      deleteCookie("token");
      dispatch(clearUser());
      queryClient.clear();
      toast.success("Akun berhasil dihapus.");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus akun");
    },
  });
};

export const useGetAllUsers = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => authService.getAllUsers(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => authService.getUserById(id),
    enabled: !!id,
  });
};
