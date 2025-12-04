"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voucherService } from "@/services/voucher.service";

export const useGetVoucherById = (id) => {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: () => voucherService.getVoucherById(id),
    enabled: !!id,
  });
};

export const useGetMyVouchers = (params = {}) => {
  return useQuery({
    queryKey: ["my-vouchers", params],
    queryFn: () => voucherService.getMyVouchers(params),
  });
};

export const useGetVoucherStats = () => {
  return useQuery({
    queryKey: ["voucher-stats"],
    queryFn: voucherService.getVoucherStats,
  });
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherService.createVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["voucher-stats"] });
      toast.success("Voucher berhasil dibuat");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat voucher");
    },
  });
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherService.updateVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["voucher-stats"] });
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
      toast.success("Voucher berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui voucher");
    },
  });
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherService.deleteVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["voucher-stats"] });
      toast.success("Voucher berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus voucher");
    },
  });
};

export const useVerifyVoucherClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherService.verifyVoucherClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["voucher-stats"] });
      toast.success("Klaim voucher berhasil diverifikasi");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memverifikasi klaim voucher"
      );
    },
  });
};
