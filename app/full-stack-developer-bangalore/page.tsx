import RolePage, { roleMetadata } from "@/components/RolePage";

const SLUG = "full-stack-developer-bangalore";

export const metadata = roleMetadata(SLUG);

export default function Page() {
  return <RolePage slug={SLUG} />;
}
