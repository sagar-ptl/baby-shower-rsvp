import { InviteData, RSVPSubmission } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getInvite(
  inviteId: string
): Promise<InviteData> {
  const response = await fetch(
    `${API_URL}?action=getInvite&inviteId=${inviteId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load invitation");
  }

  return response.json();
}

export async function submitRSVP(
  payload: RSVPSubmission
) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "submitRSVP",
      ...payload,
    }),
  });
  return response.json();
}

export async function getRSVP(
  inviteId: string
) {
  const response = await fetch(
    `${API_URL}?action=getRSVP&inviteId=${inviteId}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}