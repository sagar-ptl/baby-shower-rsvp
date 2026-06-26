export type InviteData = {
  inviteId: string;
  household: string;
  guests: string[];
};

export type RSVPSubmission = {
  inviteId: string;
  household: string;
  responses: Record<string, "Yes" | "No">;
  message: string;
};