import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { emailBrand, emailFontFamily } from "@/lib/email/brand";
import { absoluteUrl, siteConfig } from "@/lib/site";

const logoUrl = absoluteUrl("/email-logo");

export default function WelcomeTemplate({
  userFirstName,
}: {
  userFirstName: string;
}) {
  const previewText = `You're on the ${siteConfig.name} waitlist — we'll be in touch soon.`;

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Column style={logoColumn}>
                <Img
                  src={logoUrl}
                  width={48}
                  height={48}
                  alt={`${siteConfig.name} logo`}
                  style={logoImg}
                />
              </Column>
              <Column>
                <Text style={headerWordmark}>
                  Tenant
                  <span style={{ color: emailBrand.lavender }}>Radar</span>
                </Text>
                <Text style={headerTagline}>{siteConfig.tagline}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={card}>
            <Heading style={heading}>
              Thanks for joining, {userFirstName}!
            </Heading>
            <Text style={paragraph}>
              You&apos;re on the early access waitlist for {siteConfig.name} —
              consulate-grade AI tenant screening built for U.S. landlords and
              property managers.
            </Text>
            <Text style={paragraph}>Here&apos;s what happens next:</Text>

            <Section style={stepsBox}>
              <Text style={stepItem}>
                <span style={stepBullet}>1</span>
                We review your application and prioritize landlords who match
                our launch cohort.
              </Text>
              <Text style={stepItem}>
                <span style={stepBullet}>2</span>
                You&apos;ll get an email when a spot opens with onboarding
                details and pricing.
              </Text>
              <Text style={stepItem}>
                <span style={stepBullet}>3</span>
                Early members receive priority access and founding-member
                pricing.
              </Text>
            </Section>

            <Section style={ctaSection}>
              <Button href={absoluteUrl("/")} style={button}>
                Visit Tenant Radar
              </Button>
            </Section>

            <Text style={muted}>
              Questions? Reply to this email or reach us at{" "}
              <Link href="mailto:growth@sashflow.com" style={link}>
                growth@sashflow.com
              </Link>
              .
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} {siteConfig.name}. Built for U.S.
              landlords.
            </Text>
            <Text style={footerMuted}>
              Sent by{" "}
              <Link href="https://tenantradar.sashflow.com" style={footerLink}>
                Tenant Radar
              </Link>
              {" · "}
              <Link href={absoluteUrl("/privacy")} style={footerLink}>
                Privacy
              </Link>
              {" · "}
              <Link href={absoluteUrl("/terms")} style={footerLink}>
                Terms
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: emailBrand.cream,
  fontFamily: emailFontFamily,
  margin: 0,
  padding: "32px 16px",
};

const container = {
  margin: "0 auto",
  maxWidth: "560px",
};

const header = {
  background: `linear-gradient(135deg, ${emailBrand.hero} 0%, ${emailBrand.primary} 100%)`,
  borderRadius: "12px 12px 0 0",
  padding: "28px 32px",
};

const logoColumn = {
  width: 56,
  verticalAlign: "top" as const,
};

const logoImg = {
  borderRadius: 10,
  display: "block",
};

const headerWordmark = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: "1.2",
  margin: "0 0 4px",
};

const headerTagline = {
  color: emailBrand.lavenderMuted,
  fontSize: "13px",
  lineHeight: "1.4",
  margin: 0,
  opacity: 0.9,
};

const card = {
  backgroundColor: emailBrand.card,
  border: `1px solid ${emailBrand.border}`,
  borderTop: "none",
  borderRadius: "0 0 12px 12px",
  padding: "32px",
};

const heading = {
  color: emailBrand.foreground,
  fontSize: "24px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: "1.3",
  margin: "0 0 16px",
};

const paragraph = {
  color: emailBrand.foreground,
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const stepsBox = {
  backgroundColor: emailBrand.cream,
  border: `1px solid ${emailBrand.border}`,
  borderRadius: "10px",
  margin: "0 0 24px",
  padding: "4px 20px",
};

const stepItem = {
  color: emailBrand.foreground,
  fontSize: "14px",
  lineHeight: "1.55",
  margin: "14px 0",
};

const stepBullet = {
  backgroundColor: emailBrand.primary,
  borderRadius: "6px",
  color: emailBrand.lavenderMuted,
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 700,
  height: "22px",
  lineHeight: "22px",
  marginRight: "10px",
  textAlign: "center" as const,
  verticalAlign: "middle",
  width: "22px",
};

const ctaSection = {
  margin: "8px 0 24px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: emailBrand.primary,
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 600,
  padding: "12px 28px",
  textDecoration: "none",
};

const muted = {
  color: emailBrand.muted,
  fontSize: "13px",
  lineHeight: "1.5",
  margin: 0,
};

const link = {
  color: emailBrand.primary,
  textDecoration: "underline",
};

const hr = {
  borderColor: emailBrand.border,
  margin: "24px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: emailBrand.muted,
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const footerMuted = {
  color: emailBrand.muted,
  fontSize: "11px",
  lineHeight: "1.5",
  margin: 0,
};

const footerLink = {
  color: emailBrand.muted,
  textDecoration: "underline",
};
