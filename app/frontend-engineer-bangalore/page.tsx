import RolePage, { roleMetadata } from "@/components/RolePage";

const SLUG = "frontend-engineer-bangalore";

export const metadata = roleMetadata(SLUG);

export default function Page() {
  return <RolePage slug={SLUG} />;
}
