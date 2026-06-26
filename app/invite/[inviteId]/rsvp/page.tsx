import RSVPForm from "@/components/RSVPForm";

type Props = {
  params: Promise<{
    inviteId: string;
  }>;
};

export default async function RSVPPage({
  params,
}: Props) {
  const { inviteId } = await params;

  return <RSVPForm inviteId={inviteId} />;
}