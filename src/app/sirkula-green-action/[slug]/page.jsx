import GreenActionDetailComposite from "@/composites/sirkula-green-action/detail";

export const dynamic = "force-dynamic";

export default async function GreenActionDetailPage({ params }) {
  const { slug } = await params;
  return <GreenActionDetailComposite id={slug} />;
}
