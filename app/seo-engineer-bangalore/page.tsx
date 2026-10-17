import RolePage, { roleMetadata } from "@/components/RolePage";

const SLUG = "seo-engineer-bangalore";

export const metadata = roleMetadata(SLUG);

export default function Page() {
  return <RolePage slug={SLUG} />;
}
