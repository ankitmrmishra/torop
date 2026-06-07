import { resend, FROM_EMAIL } from "../resend";
import {
  generateInvitationEmailHTML,
  generateInvitationEmailText,
} from "../emails/invitation-email";

interface SendInvitationEmailParams {
  to: string;
  inviterName: string;
  workspaceName: string;
  invitationToken: string;
  expiresAt: Date;
}

export async function sendInvitationEmail({
  to,
  inviterName,
  workspaceName,
  invitationToken,
  expiresAt,
}: SendInvitationEmailParams) {
  const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  const invitationLink = `${baseUrl}/workspace/accept-invite?token=${invitationToken}`;

  const html = generateInvitationEmailHTML({
    inviterName,
    workspaceName,
    invitationLink,
    expiresAt,
  });

  const text = generateInvitationEmailText({
    inviterName,
    workspaceName,
    invitationLink,
    expiresAt,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: to,
      subject: `You've been invited to join ${workspaceName}`,
      html: html,
      text: text,
    });

    if (error) {
      console.error("Error sending invitation email:", error);
      throw new Error(`Failed to send invitation email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending invitation email:", error);
    throw error;
  }
}
