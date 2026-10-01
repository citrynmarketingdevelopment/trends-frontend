import { ExperienceProvider } from "@/components/marketing-home/experience-state";
import { ProcessStory } from "@/components/marketing-home/process-story";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { ContactCta } from "@/components/marketing-site/sections";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";
import { pageSeo } from "@/content/seo";
import { marketingMetadata } from "@/lib/marketing-metadata";

export const metadata = marketingMetadata(
  pageSeo.process.title,
  pageSeo.process.description,
  "/process",
);

export default function ProcessPage() {
  return (
    <ExperienceProvider>
      <MarketingShell>
        <MarketingStructuredData
          path="/process"
          name={pageSeo.process.heading}
          description={pageSeo.process.description}
        />
        <div className={styles.headerOffset}>
          <ProcessStory headingLevel={1} />
        </div>
        <ContactCta service="collision" />
      </MarketingShell>
    </ExperienceProvider>
  );
}
