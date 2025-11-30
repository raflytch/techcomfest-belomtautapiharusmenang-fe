import { BarChart3, Trash2, Lightbulb, TrendingDown } from "lucide-react";
import logo from "../../public/images/logo-impact4action.png";

export const images = {
  logo,
};

export const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
];

export const problems = [
  {
    icon: <BarChart3 className="w-12 h-12 text-green-600" />,
    title: "60% Sampah dari Rumah Tangga",
    description:
      "Mayoritas sampah Indonesia berasal dari aktivitas rumah tangga, namun hanya 16% yang memilah sampah dengan benar.",
    bgColor: "bg-green-50",
  },
  {
    icon: <Trash2 className="w-12 h-12 text-gray-600" />,
    title: "30-40% Sampah Terkelola",
    description:
      "Sebagian besar sampah masih tidak terkelola dengan baik, menyebabkan pencemaran lingkungan dan beban TPA.",
    bgColor: "bg-gray-50",
  },
  {
    icon: <Lightbulb className="w-12 h-12 text-orange-600" />,
    title: "Aksi Hijau Belum Jadi Kebiasaan",
    description:
      "Banyak yang tahu harus memilah sampah, tapi merasa ribet dan tidak ada manfaat langsung.",
    bgColor: "bg-orange-50",
  },
  {
    icon: <TrendingDown className="w-12 h-12 text-pink-600" />,
    title: "Kontribusi Tidak Tercatat",
    description:
      "Aksi hijau warga dan UMKM hijau belum tercatat sebagai data dampak yang terukur.",
    bgColor: "bg-pink-50",
  },
];
