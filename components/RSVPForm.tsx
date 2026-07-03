"use client";

import { useEffect, useState } from "react";
import { getInvite, submitRSVP, getRSVP } from "@/lib/api";
import { InviteData } from "@/lib/types";

type Props = {
  inviteId: string;
};
type SubmittedData = {
  household: string;
  responses: Record<string, "Yes" | "No">;
  message: string;
};


export default function RSVPForm({
  inviteId,
}: Props) {
  const [invite, setInvite] =
    useState<InviteData | null>(null);

  const [responses, setResponses] =
    useState<Record<string, "Yes" | "No">>({});

  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [submittedData, setSubmittedData] =
    useState<SubmittedData | null>(null);

  useEffect(() => {
    async function loadInvite() {
      const data = await getInvite(inviteId);

      setInvite(data);

      const rsvp = await getRSVP(inviteId);

      if (rsvp.found) {
        setResponses(rsvp.responses);
        setMessage(rsvp.message);
      } else {
        const initialResponses: Record<
          string,
          "Yes" | "No"
        > = {};

        data.guests.forEach((guest) => {
          initialResponses[guest] = "Yes";
        });
        setResponses(initialResponses);
      }
    }

    loadInvite();
  }, [inviteId]);

  const allGuestsAnswered =
    invite?.guests.every(
      (guest) =>
        responses[guest] === "Yes" ||
        responses[guest] === "No"
    ) ?? false;

  async function handleSubmit() {
    if (!invite) return;

    try {
      setIsSubmitting(true);

      await submitRSVP({
        inviteId,
        household: invite.household,
        responses,
        message,
      });

      setSubmittedData({
        household: invite.household,
        responses,
        message,
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Unable to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F5EE] text-[#4F6F52]">

        <div className="rounded-3xl shadow-xl p-8 max-w-md w-full text-center">

          <h1 className="text-3xl font-bold">
            Thank You {submittedData?.household}!
          </h1>

          <div className="mt-4 text-left">
            {Object.entries(submittedData?.responses || {}).map(
              ([name, status]) => (
                <p key={name}>
                  {name} → {status}
                </p>
              )
            )}
          </div>

          {submittedData?.message && (
            <p className="mt-4 italic">
              "{submittedData.message}"
            </p>
          )}

          <p className="mt-6">
            ❤️ Mohini & Sagar
          </p>

        </div>

      </div>
    );
  }

  if (!invite) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B8E5B8] text-[#4F6F52] p-6">
      <div className="rounded-2xl shadow p-4 mb-3">
        <h1 className="text-xl font-semibold mb-6">
          {invite.household}
        </h1>

        {invite.guests.map((guest) => (
          <div key={guest} className="flex gap-4 mt-2">

            <p className="font-medium">
              {guest}
            </p>

            <label className="mr-4">
              <input
                type="radio"
                checked={
                  responses[guest] === "Yes"
                }
                onChange={() =>
                  setResponses({
                    ...responses,
                    [guest]: "Yes",
                  })
                }
              />
              {" "}Attending
            </label>

            <label>
              <input
                type="radio"
                checked={
                  responses[guest] === "No"
                }
                onChange={() =>
                  setResponses({
                    ...responses,
                    [guest]: "No",
                  })
                }
              />
              {" "}Unable to Attend
            </label>

          </div>
        ))}

        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          placeholder="Message to Mohini & Sagar"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting ||
            !allGuestsAnswered
          }
          className="
            mt-8 w-full
            bg-gradient-to-r from-[#4F6F52] to-[#7A9D8C]
            text-white
            py-4
            rounded-full
            text-lg
            font-semibold
            shadow-lg
            active:scale-95 transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit RSVP"}
        </button>

      </div>
    </div>
  );
}