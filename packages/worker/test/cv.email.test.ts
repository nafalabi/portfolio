import { describe, expect, it } from "vitest";
import { buildCvEmail } from "../src/modules/cv/cv.email";

describe("buildCvEmail", () => {
  const driveUrl = "https://drive.google.com/file/d/ABC123/view?usp=sharing";
  it("contains subject and drive url in text and html", () => {
    const { subject, text, html } = buildCvEmail("user@example.com", driveUrl);
    expect(subject).toBe("Your requested CV from nandaabi.my.id");
    expect(text).toContain(driveUrl);
    expect(html).toContain(driveUrl);
    expect(html).toContain("View / Download CV");
    expect(html).toContain("Nanda Abi Fahmi");
  });
  it("escapes drive url for html href", () => {
    const evil = "https://drive.google.com/file/d/1?x=\" onclick=\"alert(1)";
    const { html } = buildCvEmail("a@b.com", evil);
    expect(html).not.toContain(`href="${evil}"`);
    expect(html).toContain("&quot;");
  });
  it("plain text mentions portfolio link and ignore note", () => {
    const { text } = buildCvEmail("a@b.com", driveUrl);
    expect(text).toContain("nandaabi.my.id");
    expect(text).toMatch(/if this wasn't you/i);
  });
});
