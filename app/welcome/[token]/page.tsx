import { getInvitationByToken, markOpened } from "@/lib/invitations";
import { WelcomeExperience } from "@/components/WelcomeExperience";
import { NotFoundState } from "@/components/shared/NotFoundState";

export const dynamic = "force-dynamic";

interface WelcomePageProps {
  params: Promise<{ token: string }>;
}

export default async function WelcomePage({ params }: WelcomePageProps) {
  const { token } = await params;
  const invitation = await getInvitationByToken(token);

  if (!invitation) {
    return <NotFoundState />;
  }

  if (invitation.status === "pending") {
    await markOpened(token);
  }

  return <WelcomeExperience invitation={invitation} />;
}
