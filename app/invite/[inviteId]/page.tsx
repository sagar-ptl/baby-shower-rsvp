import { getInvite } from "@/lib/api";
import RSVPButton from "./RSVPButton";
import FadeIn from "@/components/FadeIn";
import RevealCard from "@/components/RevealCard";
import InvitationShell from "@/components/InvitationShell";
import FloatingGarden from "@/components/FloatingGarden";
import { vh } from "framer-motion";


type Props = {
  params: Promise<{
    inviteId: string;
  }>;
};

export default async function InvitationPage({
  params,
}: Props) {
  const { inviteId } = await params;

  let invite = null;
  try {
    invite = await getInvite(inviteId);
    
  } catch {
    console.log("Test Start");
    console.log(invite);
    console.log("Test End");
    return (

      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Invitation Not Found
          </h1>

          <p className="mt-2">
            Please contact Mohini or Sagar if you
            believe this is an error.
          </p>
        </div>
      </div>
    );
  }
  return (
     <InvitationShell>
      <FloatingGarden />
    <main className="min-h-screen bg-[#F7F5EE] text-[#4F6F52] p-6 flex items-center justify-center text-center overflow-hidden z-0">
<img
  src="/krishna-tree-left.png"
  alt=""
className="
fixed
left-[-65px]
top-1/2
-translate-y-1/2
w-72
md:w-96
"
/>

<img
  src="/radha-tree-right.png"
  alt=""
className="
fixed
right-[-65px]
top-1/2
-translate-y-1/2
w-72
md:w-96
"
/>
        <div className="relative z-10 p-6">
        
          <div className="relative text-center px-6 pt-10">

            <div className="text-sm uppercase tracking-widest">
              Baby Shower <br/>Honoring Parents to be
            </div>

            <h3 className="text-2xl md:text-2xl font-bold">
              🌿 Mohini & Sagar 🌿
            </h3>

          </div>

          <div className="mt-8 flex justify-center">

            <div className="w-full max-w-md rounded-3xl overflow-hidden">

              <img
                src="/baby-krishna-radha.png"
                alt="Divine Blessings"
                className="w-full object-cover"
              />

            </div>

          </div>
          <h3 className="text-4xl md:text-4xl font-bold">
              🌿 ✦ 🦚 ✦ 🌿 
          </h3>
          <FadeIn>
            <div className="bg-transparent text-[#2F342F] rounded-3xl p-6 mt-6 text-center">

              <p className="tracking-widest">
                Dear
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {invite.household}
              </h3>

              <p className="tracking-widest">
                With hearts full of gratitude,
                we invite you to celebrate
                the upcoming arrival of our little blessing.
              </p>

            </div>
          </FadeIn>


          <div className="mt-6 space-y-3">
            <RevealCard>
              <div className="bg-[#FCFBF7]/25 text-[#2F342F] rounded-2xl shadow-sm p-5">
              <p className="text-sm text-center tracking-widest mb-5">
      Grandparents-to-Be
    </p>

    <div className="grid grid-cols-2 gap-6">

      <div className="text-center">

        <p className="font-semibold">
          Bharat Patel
        </p>
        <p className="font-semibold">
          Vanita Patel
        </p>
      </div>

      <div className="text-center">
        <p className="font-semibold">
          Vasant Patel
        </p>

        <p className="font-semibold">
          Kailash Patel
        </p>
      </div>
      </div>
      </div>
            </RevealCard>
            <RevealCard>

              <div className="bg-[#FCFBF7]/25 text-[#2F342F] rounded-2xl shadow-sm p-5">
                <p className="text-sm">Date & Time</p>
                <p className="font-semibold">Sunday, September 13th 2026</p>
                <p className="font-semibold">10:00 AM</p>
              </div>
            </RevealCard>
            <RevealCard>
              <div className="bg-[#FCFBF7]/25 text-[#2F342F] rounded-2xl shadow-sm p-5">
                <p className="text-sm">Venue</p>
                <p className="font-semibold">
                  Red Roof Inn & Conference Center McKinney
                </p>
                <p className="font-semibold">
                  1300 N Central Expy, McKinney, TX 75070
                </p>
              </div>
            </RevealCard>

          </div>
          <p className="mt-6 italic">
            Your presence and blessings are the greatest gifts of all.
          </p>
          <p className="mt-6 italic">
           🌿 No boxed gifts, please. 🌿
          </p>

          <RSVPButton inviteId={inviteId} />
        </div>

    </main>
    </InvitationShell>
  );
}