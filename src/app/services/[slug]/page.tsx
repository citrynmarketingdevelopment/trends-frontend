import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import {
  ContactCta,
  PageHero,
  ServiceCapabilities,
  ServiceExperience,
  ServiceFaq,
  ServiceFeature,
  ServiceProcess,
} from "@/components/marketing-site/sections";
import { getService, services } from "@/content/services";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { serviceSeo } from "@/content/seo";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return marketingMetadata(
    serviceSeo[service.slug].title,
    serviceSeo[service.slug].description,
    `/services/${service.slug}`,
    service.image,
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <MarketingShell>
      <MarketingStructuredData
        path={`/services/${service.slug}`}
        name={serviceSeo[service.slug].heading}
        description={serviceSeo[service.slug].description}
        service={service}
      />
      <PageHero
        eyebrow={service.name}
        title={serviceSeo[service.slug].heading}
        introduction={service.introduction}
        image={service.image}
        imageAlt={service.imageAlt}
        service={service.slug}
      />
      <ServiceProcess service={service} />
      <ServiceFeature service={service} />
      <ServiceExperience service={service} />
      <ServiceCapabilities service={service} />
      <ServiceFaq service={service} />
      <ContactCta service={service.slug} />
    </MarketingShell>
  );
}
