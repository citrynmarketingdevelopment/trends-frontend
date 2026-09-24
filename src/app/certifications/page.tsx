import { CertificationShowcase } from "@/components/marketing-home/certification-showcase";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";
import { pageSeo } from "@/content/seo";
import { marketingMetadata } from "@/lib/marketing-metadata";

export const metadata = marketingMetadata(
  pageSeo.certifications.title,
  pageSeo.certifications.description,
  "/certifications",
);

export default function CertificationsPage() {
  return (
    <MarketingShell>
      <MarketingStructuredData
        path="/certifications"
        name={pageSeo.certifications.heading}
        description={pageSeo.certifications.description}
      />
      <div className={styles.headerOffset}>
        <CertificationShowcase />
      </div>
    </MarketingShell>
  );
}
