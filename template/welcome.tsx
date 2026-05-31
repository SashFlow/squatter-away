import { Html, Link } from "@react-email/components";
import { Body } from "@react-email/components";
import { Text } from "@react-email/components";

export default function WelcomeTemplate({
  userFirstName,
}: {
  userFirstName: string;
}) {
  return (
    <Html>
      <Body>
        <Text className="text-2xl font-bold">Hello {userFirstName},</Text>
        <Text>Welcome to the platform.</Text>
        <Text>
          Our team will contact you with the details of onboarding.
        </Text>
        <Text className="text-sm text-gray-500">
          Best regards,
          <Text className="text-sm text-gray-500">The Waitlist Team</Text>
        </Text>
      </Body>
    </Html>
  );
}
