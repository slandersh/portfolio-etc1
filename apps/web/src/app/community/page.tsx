import { community, baseURL } from "@/resources";
import { Meta, Column } from "@once-ui-system/core";
import CommunityContent from "@/components/community/CommunityContent";

/**
 * Menghasilkan metadata halaman Komunitas untuk SEO.
 */
export async function generateMetadata() {
  return Meta.generate({
    title: community.title,
    description: community.description,
    baseURL: baseURL,
    path: community.path,
    image: community.image,
  });
}

/**
 * Halaman Community & Support.
 * 
 * Halaman ini memisahkan fitur donasi dari Store ke halaman dedikasi sendiri,
 * serta menambahkan informasi seputar komunitas seperti berita dan link Discord.
 */
export default function CommunityPage() {
  return (
    <Column fillWidth horizontal="center">
      <CommunityContent />
    </Column>
  );
}
