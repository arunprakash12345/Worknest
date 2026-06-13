import { Resend } from "resend";

const resend = new Resend("re_RCu6pWAd_8oH31jD679Rih29J6dtcBTzv");

export const sendTaskAssignedEmail = async ({
  to,
  taskTitle,
  dueDate,
}) => {
  try {
    const response = await resend.emails.send({
      from: "WorkNest <onboarding@resend.dev>",
      to,
      subject: `New Task Assigned: ${taskTitle}`,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#111827;padding:24px 32px;">
              <h1 style="margin:0;color:white;font-size:22px;">WorkNest</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <span style="background:#dcfce7;color:#166534;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;">
                NEW TASK ASSIGNED
              </span>

              <h2 style="margin:20px 0 10px;color:#111827;">
                You have a new task
              </h2>

              <p style="color:#6b7280;line-height:1.7;">
                A new task has been assigned to you.
              </p>

              <div style="margin-top:24px;border:1px solid #e5e7eb;background:#f9fafb;border-radius:12px;padding:16px;">
                <p style="margin:0;color:#6b7280;font-size:12px;">
                  TASK
                </p>

                <p style="margin:8px 0;color:#111827;font-size:18px;font-weight:600;">
                  ${taskTitle}
                </p>

                <p style="margin:0;color:#2563eb;font-weight:500;">
                  Due: ${new Date(dueDate).toLocaleDateString()}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #e5e7eb;padding:24px 32px;color:#9ca3af;font-size:12px;">
              © 2026 WorkNest
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return response;
  } catch (error) {
    console.log("TASK ASSIGN EMAIL ERROR:", error);
    throw error;
  }
};

export const sendDiscussionEmail = async ({
  to,
  subject,
  taskTitle,
  senderName,
  message,
}) => {
  try {
    const response = await resend.emails.send({
      from: "WorkNest <onboarding@resend.dev>",
      to,
      subject,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#111827;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
                WorkNest
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <span style="background:#dbeafe;color:#1d4ed8;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;">
                DISCUSSION UPDATE
              </span>

              <h2 style="margin:20px 0 12px;color:#111827;font-size:24px;">
                New discussion activity
              </h2>

              <p style="color:#4b5563;line-height:1.7;margin-bottom:24px;">
                <strong>${senderName}</strong> posted a message on a task you're involved in.
              </p>

              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:20px;">
                <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
                  Task
                </p>

                <p style="margin:8px 0 0;color:#111827;font-size:18px;font-weight:600;">
                  ${taskTitle}
                </p>
              </div>

              <div style="border-left:4px solid #2563eb;background:#eff6ff;padding:18px;border-radius:10px;">
                <p style="margin:0;color:#1f2937;line-height:1.8;">
                  "${message}"
                </p>
              </div>

              <p style="margin-top:24px;color:#6b7280;font-size:14px;">
                Open WorkNest to continue the conversation.
              </p>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #e5e7eb;padding:24px 32px;background:#fafafa;">
              <p style="margin:0;color:#6b7280;font-size:12px;">
                You're receiving this email because you're participating in this task discussion.
              </p>

              <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;">
                © 2026 WorkNest
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return response;
  } catch (error) {
    console.log("DISCUSSION EMAIL ERROR:", error);
    throw error;
  }
};