import { Resend } from "resend";
const resend = new Resend("re_RCu6pWAd_8oH31jD679Rih29J6dtcBTzv");

export const sendTaskAssignedEmail = async ({
  to,
  taskTitle,
  dueDate,
}) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: `New Task Assigned: ${taskTitle}`,
      html: `
        <h2>WorkNest</h2>
        <p>You have been assigned a new task.</p>
        <p><strong>${taskTitle}</strong></p>
        <p>Due Date: ${new Date(dueDate).toLocaleDateString()}</p>
      `,
    });
    return response;
  } catch (error) {
    throw error;
  }
};