import React, { useState, useCallback } from "react";
import {
  MdOutlineDownload,
  MdMarkEmailRead,
  MdErrorOutline,
  MdOutlineEmail,
} from "react-icons/md";
import styled from "@emotion/styled";
import Button, { ButtonColors, ButtonVariants } from "@/components/Button";
import Modal from "@/components/Modal";
import Typography from "@/components/Typography";
import { requestCvSend, ApiError } from "@/services/api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FieldLabel = styled.label({
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "0.4rem",
  color: "#374151",
});

const InputWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  "& .input-icon": {
    position: "absolute",
    left: "0.85rem",
    color: "#9ca3af",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s ease",
  },
  "&:focus-within .input-icon": {
    color: "#150c6c",
  },
});

const EmailInput = styled.input({
  width: "100%",
  padding: "0.75rem 0.9rem 0.75rem 2.5rem",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.18)",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  "&:focus": {
    borderColor: "#150c6c",
    boxShadow: "0 0 0 3px rgba(21, 12, 108, 0.12)",
  },
  "&::placeholder": {
    color: "#9ca3af",
  },
});

const Notice = styled.div<{ kind: "error" | "info" }>(({ kind }) => ({
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  fontSize: "14px",
  lineHeight: 1.5,
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: kind === "error" ? "#fdecea" : "#eef3fd",
  color: kind === "error" ? "#991b1b" : "#150c6c",
}));

const SuccessContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "0.25rem 0 0.5rem 0",
});

const IconBadge = styled.div({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: "rgba(21, 12, 108, 0.08)",
  color: "#150c6c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1rem",
});

const SuccessHeading = styled.h4({
  margin: "0 0 0.5rem 0",
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#111111",
});

const SuccessMessage = styled.p({
  margin: "0 0 0.85rem 0",
  fontSize: "14px",
  lineHeight: 1.55,
  color: "#4b5563",
});

const EmailHighlight = styled.span({
  fontWeight: 600,
  color: "#150c6c",
  wordBreak: "break-all",
});

const SpamNotice = styled.p({
  margin: "0 0 1.5rem 0",
  fontSize: "13px",
  lineHeight: 1.45,
  color: "#6b7280",
  backgroundColor: "#f9fafb",
  padding: "0.65rem 0.85rem",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  width: "100%",
  boxSizing: "border-box",
});

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "That email doesn't look right. Please check and try again.",
  disposable_not_allowed: "Disposable/temporary emails aren't allowed. Please use your regular address.",
  rate_limited: "Too many requests from your network. Please try again later.",
  upstream_unavailable: "Couldn't send the email right now. Please try again shortly.",
  internal_error: "Something went wrong. Please try again later.",
  config: "CV service is not configured yet.",
  unknown_error: "Something went wrong. Please try again later.",
};

type Status = "idle" | "submitting" | "success" | "error";

export interface DownloadCvButtonProps {
  color?: ButtonColors;
  variant?: ButtonVariants;
}

const DownloadCvButton = ({
  color = "blue",
  variant = "outlined",
}: DownloadCvButtonProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sentTo, setSentTo] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setEmail("");
    setSentTo(null);
    setErrorMessage("");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      setErrorMessage(ERROR_MESSAGES.invalid_email);
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      await requestCvSend(email.trim());
      setSentTo(email.trim());
      setStatus("success");
    } catch (error) {
      const code = error instanceof ApiError ? error.code : "unknown_error";
      setStatus("error");
      setErrorMessage(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.unknown_error);
    }
  };

  return (
    <>
      <Button color={color} variant={variant} onClick={() => setOpen(true)}>
        <span
          css={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.45rem",
            lineHeight: 1,
          }}
        >
          <MdOutlineDownload size={18} style={{ display: "block" }} />
          <span>Download CV</span>
        </span>
      </Button>

      <Modal
        open={open}
        onClose={closeModal}
        title={status === "success" ? "CV Requested" : "Get my CV"}
      >
        {status === "success" && sentTo ? (
          <SuccessContainer>
            <IconBadge>
              <MdMarkEmailRead size={28} />
            </IconBadge>
            <SuccessHeading>Check your inbox!</SuccessHeading>
            <SuccessMessage>
              I&apos;ve sent a link to download my CV to{" "}
              <EmailHighlight>{sentTo}</EmailHighlight>.
            </SuccessMessage>
            <SpamNotice>
              Please check your spam folder if it doesn&apos;t arrive shortly.
            </SpamNotice>
            <Button
              type="button"
              color="blue"
              onClick={closeModal}
              css={{ width: "100%", justifyContent: "center" }}
            >
              Got it
            </Button>
          </SuccessContainer>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography css={{ fontSize: "14px", color: "#4b5563", marginBottom: "1.25rem", lineHeight: 1.5 }}>
              Enter your email address and I&apos;ll send you a link to download my CV.
            </Typography>
            <FieldLabel htmlFor="cv-email">Email address</FieldLabel>
            <InputWrapper>
              <span className="input-icon">
                <MdOutlineEmail size={18} />
              </span>
              <EmailInput
                id="cv-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === "submitting"}
                autoComplete="email"
                required
              />
            </InputWrapper>
            {status === "error" && (
              <div css={{ marginTop: "0.85rem" }}>
                <Notice kind="error">
                  <MdErrorOutline size={18} css={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </Notice>
              </div>
            )}
            <div css={{ marginTop: "1.25rem" }}>
              <Button
                type="submit"
                color="blue"
                disabled={status === "submitting"}
                css={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {status === "submitting" ? (
                  "Sending…"
                ) : (
                  <>
                    <MdOutlineDownload size={18} />
                    <span>Send CV</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default DownloadCvButton;
