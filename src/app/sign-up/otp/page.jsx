"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthLayout from "@/components/auth/AuthLayout";
import { useVerifyOtp, useResendOtp } from "@/hooks/use-auth";
import FullscreenLoader from "@/components/ui/fullscreen-loader";

function OTPContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      verifyOtp({ email, code: otp });
    }
  };

  const handleResend = () => {
    resendOtp(email);
    setCountdown(60);
    setCanResend(false);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  if (isVerifying) {
    return <FullscreenLoader text="Memverifikasi kode..." />;
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="text-center">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <CardTitle className="text-2xl font-bold">Verifikasi Email</CardTitle>
          <CardDescription>
            Masukkan kode 6 digit yang telah dikirim ke
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="border w-12 h-12 text-lg"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border w-12 h-12 text-lg"
                  />
                  <InputOTPSlot
                    index={2}
                    className="border w-12 h-12 text-lg"
                  />
                  <InputOTPSlot
                    index={3}
                    className="border w-12 h-12 text-lg"
                  />
                  <InputOTPSlot
                    index={4}
                    className="border w-12 h-12 text-lg"
                  />
                  <InputOTPSlot
                    index={5}
                    className="border w-12 h-12 text-lg"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying ? "Memverifikasi..." : "Verifikasi"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Tidak menerima kode?
            </p>
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending}
                className="text-green-600 hover:text-green-700"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    isResending ? "animate-spin" : ""
                  }`}
                />
                {isResending ? "Mengirim..." : "Kirim ulang kode"}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Kirim ulang dalam{" "}
                <span className="font-medium text-green-600">
                  {countdown} detik
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default function OTPPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <Card className="w-full max-w-md border shadow-none">
            <CardContent className="py-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
              </div>
            </CardContent>
          </Card>
        </AuthLayout>
      }
    >
      <OTPContent />
    </Suspense>
  );
}
