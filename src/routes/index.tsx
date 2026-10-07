import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteCanvas } from "@/components/SiteCanvas";
import { SiteChrome } from "@/components/SiteChrome";
import { SEO } from "@/components/SEO";
import { trackCurrentVisitor } from "@/lib/visitor-tracker";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    void trackCurrentVisitor(window.location.pathname);
  }, []);

  return (
    <SiteCanvas>
      <SEO
        title="High-Performance Websites & Digital Agency"
        description="High-performance websites, custom web apps, CRM calling systems, and high-ROAS marketing campaigns. Precision quality on every screen."
        ogType="website"
        keywords={["web design", "web development", "digital agency", "custom CRM", "e-commerce", "high-performance websites"]}
      />
      <SiteChrome page="home" />
    </SiteCanvas>
  );
}
