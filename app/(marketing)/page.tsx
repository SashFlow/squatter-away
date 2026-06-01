import { JsonLd } from "@/components/seo/JsonLd";
import { LandingPageContent } from "@/components/home/LandingPageContent";
import { faqs } from "@/lib/content/faqs";
import {
  faqPageSchema,
  softwareApplicationSchema,
} from "@/lib/seo/schemas";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqPageSchema(faqs)]} />
      <LandingPageContent />
    </>
  );
}
