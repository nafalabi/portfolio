import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

import { MdClose } from "react-icons/md";

const Overlay = styled.div({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(1, 1, 2, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "1rem",
});

const Panel = styled("div")(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#111111",
  borderRadius: "16px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: theme.shadow[3],
  width: "100%",
  maxWidth: "420px",
  padding: "1.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

const TitleRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Title = styled.h3({
  margin: 0,
  fontSize: "1.05rem",
  fontWeight: 700,
});

const CloseButton = styled.button(({ theme }) => ({
  appearance: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "1.25rem",
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.text,
  padding: "0.35rem",
  borderRadius: "8px",
  transition: "background-color 0.15s ease, color 0.15s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
}));

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus first input field if present, otherwise first focusable element
    const initialFocusElement =
      panelRef.current?.querySelector<HTMLElement>("input, textarea, select") ??
      panelRef.current?.querySelector<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
    initialFocusElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  // NOTE: react-dom ships its own nested @types/react in this yarn v1
  // install, so its ReactPortal isn't structurally identical to our
  // React.ReactNode. Bridge it explicitly.
  return createPortal(
    <Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Panel ref={panelRef} role="dialog" aria-modal="true" aria-label={title}>
        <TitleRow>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} aria-label="Close">
            <MdClose size={20} />
          </CloseButton>
        </TitleRow>
        {children}
      </Panel>
    </Overlay>,
    document.body
  ) as unknown as React.ReactElement;
};

export default Modal;
