interface InvitationEmailProps {
  inviterName: string;
  workspaceName: string;
  invitationLink: string;
  expiresAt: Date;
}

export function generateInvitationEmailHTML({
  inviterName,
  workspaceName,
  invitationLink,
  expiresAt,
}: InvitationEmailProps): string {
  const expiryDate = expiresAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workspace Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">You're Invited!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                Hi there,
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                <strong>${inviterName}</strong> has invited you to join the <strong>${workspaceName}</strong> workspace.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                Click the button below to accept the invitation and get started:
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="${invitationLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 20px; margin: 0 0 10px 0;">
                Or copy and paste this link into your browser:
              </p>
              
              <p style="background-color: #f3f4f6; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 14px; color: #4b5563; margin: 0 0 30px 0;">
                ${invitationLink}
              </p>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
                <p style="color: #9ca3af; font-size: 13px; line-height: 18px; margin: 0;">
                  <strong>Note:</strong> This invitation will expire on <strong>${expiryDate}</strong>.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 13px; line-height: 18px; margin: 0 0 10px 0;">
                If you weren't expecting this invitation, you can safely ignore this email.
              </p>
              <p style="color: #9ca3af; font-size: 13px; line-height: 18px; margin: 0;">
                © ${new Date().getFullYear()} Torop. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateInvitationEmailText({
  inviterName,
  workspaceName,
  invitationLink,
  expiresAt,
}: InvitationEmailProps): string {
  const expiryDate = expiresAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `
You're Invited to Join ${workspaceName}!

Hi there,

${inviterName} has invited you to join the ${workspaceName} workspace.

Click the link below to accept the invitation and get started:
${invitationLink}

Note: This invitation will expire on ${expiryDate}.

If you weren't expecting this invitation, you can safely ignore this email.

© ${new Date().getFullYear()} Torop. All rights reserved.
  `.trim();
}
