import { CV_EMAIL_SUBJECT } from "./cv.types";

function escapeHtmlAttr(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#39;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function buildCvEmail(_to: string, driveUrl: string): { subject: string; text: string; html: string } {
  const subject = CV_EMAIL_SUBJECT;
  const safeUrl = escapeHtmlAttr(driveUrl);
  const text = `Hi there,

Thanks for your interest in my work! As requested, here's my CV:

${driveUrl}

You can open the link to view or download the PDF.

Warm regards,
Nanda Abi Fahmi
https://nandaabi.my.id

— You requested this CV via nandaabi.my.id. If this wasn't you, please ignore this email.`;

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f6f5f4;">
  <div style="max-width:560px;margin:0 auto;padding:24px;font-family:Inter,Helvetica,Arial,sans-serif;color:#111;">
    <div style="background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,.08);padding:28px;box-shadow:0 4px 24px rgba(0,0,0,.06);">
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;">Nanda Abi Fahmi</h1>
      <p style="margin:0 0 16px;color:#666;font-size:13px;letter-spacing:.3px;text-transform:uppercase;">Software Engineer</p>
      <p style="margin:0 0 16px;line-height:1.6;color:#333;">Hi there,<br/>Thanks for your interest! As requested, here's my CV. Click the button below to view or download it.</p>
      <p style="margin:20px 0;">
        <a href="${safeUrl}" style="display:inline-block;background:#150c6c;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;" target="_blank" rel="noopener">View / Download CV</a>
      </p>
      <p style="margin:16px 0 0;font-size:13px;color:#666;word-break:break-all;">Or copy this link: <a href="${safeUrl}" style="color:#150c6c;">${safeUrl}</a></p>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>
      <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">You requested this CV via <a href="https://nandaabi.my.id" style="color:#150c6c;text-decoration:none;">nandaabi.my.id</a>. If this wasn't you, please ignore this email.<br/>— Nanda Abi Fahmi</p>
    </div>
    <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#999;">nandaabi.my.id • portfolio</p>
  </div>
</body></html>`;
  return { subject, text, html };
}
