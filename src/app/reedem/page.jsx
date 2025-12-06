import RedeemComposite from "@/composites/redeem";

export const metadata = {
  title: "Tukar Poin | Sirkula",
  description: "Tukarkan poin dengan voucher menarik dari UMKM lokal",
};

export const dynamic = "force-dynamic";

export default function RedeemPage() {
  return <RedeemComposite />;
}
