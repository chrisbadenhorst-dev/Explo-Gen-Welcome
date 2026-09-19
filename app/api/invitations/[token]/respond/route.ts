import { NextResponse } from "next/server";
import { z } from "zod";
import { submitResponse } from "@/lib/invitations";
import { NotificationService } from "@/lib/notifications";

const bodySchema = z.object({
  response: z.enum(["accepted", "unavailable"]),
});

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  let parsedBody: z.infer<typeof bodySchema>;
  try {
    parsedBody = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await submitResponse(token, parsedBody.response);

  if (!result) {
    return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
  }

  if (result.status === "accepted" || result.status === "unavailable") {
    try {
      await NotificationService.sendEmail({
        applicantName: result.applicantName,
        role: "Co-Founder",
        meetingDate: result.meetingDate,
        meetingTime: result.meetingTime,
        respondedAt: result.respondedAt,
        response: result.status,
      });
    } catch (error) {
      console.error("[respond] notification email failed:", error);
    }
  }

  return NextResponse.json({ status: result.status, respondedAt: result.respondedAt });
}
