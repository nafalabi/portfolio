import { describe, expect, it } from "vitest";
import {
  isDisposableDomain,
  isValidEmailShape,
  normalizeEmail,
  parseBlockedDomains,
} from "../src/modules/cv/cv.validation";

describe("normalizeEmail", () => {
  it("trims and lowercases", () => {
    expect(normalizeEmail("  User.Name@Example.COM \n")).toBe("user.name@example.com");
  });
  it("returns empty for non-string", () => {
    expect(normalizeEmail(undefined)).toBe("");
    expect(normalizeEmail(42)).toBe("");
    expect(normalizeEmail(null)).toBe("");
  });
});

describe("parseBlockedDomains", () => {
  it("splits csv, trims, lowercases, drops empties", () => {
    expect(parseBlockedDomains(" Mailinator.com , TEMPMail.org ,, ")).toEqual(["mailinator.com", "tempmail.org"]);
  });
  it("handles empty string", () => {
    expect(parseBlockedDomains("")).toEqual([]);
  });
});

describe("isValidEmailShape", () => {
  it("accepts valid shapes", () => {
    expect(isValidEmailShape("a@gmail.com")).toBe(true);
    expect(isValidEmailShape("some.user+tag@outlook.com")).toBe(true);
    expect(isValidEmailShape("a_b@protonmail.com")).toBe(true);
  });
  it("rejects malformed", () => {
    expect(isValidEmailShape("no-at-sign")).toBe(false);
    expect(isValidEmailShape("@gmail.com")).toBe(false);
    expect(isValidEmailShape("user@")).toBe(false);
    expect(isValidEmailShape("user name@gmail.com")).toBe(false);
    expect(isValidEmailShape("")).toBe(false);
    expect(isValidEmailShape("a@b")).toBe(false);
  });
  it("rejects >254 chars", () => {
    const long = `${"a".repeat(250)}@gmail.com`;
    expect(long.length).toBeGreaterThan(254);
    expect(isValidEmailShape(long)).toBe(false);
  });
});

describe("isDisposableDomain", () => {
  it("blocks known disposable domains", () => {
    expect(isDisposableDomain("mailinator.com", [])).toBe(true);
    expect(isDisposableDomain("10minutemail.com", [])).toBe(true);
    expect(isDisposableDomain("guerrillamail.com", [])).toBe(true);
    expect(isDisposableDomain("tempmail.org", [])).toBe(true);
    expect(isDisposableDomain("yopmail.com", [])).toBe(true);
  });
  it("allows normal domains", () => {
    expect(isDisposableDomain("gmail.com", [])).toBe(false);
    expect(isDisposableDomain("outlook.com", [])).toBe(false);
    expect(isDisposableDomain("yahoo.com", [])).toBe(false);
    expect(isDisposableDomain("protonmail.com", [])).toBe(false);
    expect(isDisposableDomain("nandaabi.my.id", [])).toBe(false);
  });
  it("respects extra blocked list from env", () => {
    expect(isDisposableDomain("example.com", ["example.com"])).toBe(true);
    expect(isDisposableDomain("EXAMPLE.COM", ["example.com"])).toBe(true);
  });
  it("is case-insensitive", () => {
    expect(isDisposableDomain("MAILINATOR.COM", [])).toBe(true);
  });
});
