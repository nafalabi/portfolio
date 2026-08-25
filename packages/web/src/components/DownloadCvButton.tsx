import React, { useState } from "react";
import { MdOutlineDownload } from "react-icons/md";
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
  marginBottom: "0.35rem",
  color: "#444444",
});

const EmailInput = styled.input({
  width: "100%",
  padding: "0.65rem 0.9rem",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.18)",
  fontSize: "15px",
  outline: "none",
  "&:focus": {
    borderColor: "#150c6c",
    boxShadow: "0 0 0 3px rgba(21, 12, 108, 0.12)",
  },
});

const SubmitRow = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "1rem",
});

const Notice = styled.div<{ kind: "error" | "info" }>(({ kind }) => ({
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  fontSize: "14px",
  lineHeight: 1.5,
  backgroundColor: kind === "error" ? "#fdecea" : "#eef3fd",
  color: kind === "error" ? "#991b1b" : "#150c6c",
}));

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

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setEmail("");
    setSentTo(null);
    setErrorMessage("");
  };

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
        <span css={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          <MdOutlineDownload size={18} />
          Download CV
        </span>
      </Button>

      <Modal open={open} onClose={closeModal} title="Get my CV">
        {status === "success" && sentTo ? (
          <Notice kind="info">
            CV sent to {sentTo} — please check your inbox (and spam) shortly.
          </Notice>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography css={{ fontSize: "14px", color: "#555555", marginBottom: "1rem" }}>
              Enter your email and I&apos;ll send you a link to my CV.
            </Typography>
            <FieldLabel htmlFor="cv-email">Email address</FieldLabel>
            <EmailInput
              id="cv-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "submitting"}
              autoComplete="email"
            />
            {status === "error" && (
              <div css={{ marginTop: "0.75rem" }}>
                <Notice kind="error">{errorMessage}</Notice>
              </div>
            )}
            <SubmitRow>
              <Button type="submit" color="blue" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send CV"}
              </Button>
            </SubmitRow>
          </form>
        )}
      </Modal>
    </>
  );
};

export default DownloadCvButton;
