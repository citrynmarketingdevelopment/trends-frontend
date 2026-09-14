import {
  marketingStructuredData,
  serializeStructuredData,
  type MarketingPageData,
} from "@/lib/marketing-structured-data";

export function MarketingStructuredData(props: MarketingPageData) {
  const data = marketingStructuredData(props);
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}
