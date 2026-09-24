import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { RepairTrackingSection } from "@/components/marketing-home/post-process-sections";
import { pageSeo } from "@/content/seo";
import { marketingMetadata } from "@/lib/marketing-metadata";

export const metadata: Metadata = {
  ...marketingMetadata(pageSeo.software.title, pageSeo.software.description, "/software"),
  robots: { index: false, follow: false },
};

export default function SoftwarePage() {
  return (
    <MarketingShell>
      <div className={styles.headerOffset}>
        <RepairTrackingSection />
      </div>
    </MarketingShell>
  );
}
