"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import * as focusTrap from "focus-trap";
import { Icon } from "../Icon";
import { cn } from "../../utils/classnames";

type OverlayProps = PropsWithChildren<{
  showModal: boolean;
  className?: string;
}>;

type PanelProps = PropsWithChildren<{
  onClose: () => void;
  className?: string;
  closeOnClickOutside?: boolean;
}>;

type TitleProps = PropsWithChildren<{
  children: ReactNode;
  className?: string;
}>;

const Overlay: React.FC<OverlayProps> = ({
  children,
  showModal,
  className,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  if (showModal === false) {
    return null;
  }

  return createPortal(
    <section
      ref={overlayRef}
      role={"dialog"}
      aria-modal="true"
      className={cn(
        "fixed inset-0 flex justify-center items-center p-4 overflow-hidden z-10 sm:m-0 sm:p-0",
        className,
      )}
    >
      <div
        className={cn("absolute inset-0 bg-black opacity-50 z-[-1]", className)}
      ></div>
      {children}
    </section>,
    document.body,
  );
};

const Panel: React.FC<PanelProps> = ({
  onClose,
  children,
  className,
  closeOnClickOutside = true,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => {
    onClose?.();
  };

  const bindKeyPress = useCallback(() => {
    const handelKeydown = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && closeOnClickOutside) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handelKeydown);

    return (): void => document.removeEventListener("keydown", handelKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, closeOnClickOutside, handleClose]);

  useEffect(() => {
    const unbindKeyPress = bindKeyPress();

    let trap: focusTrap.FocusTrap;

    if (panelRef.current) {
      trap = focusTrap.createFocusTrap(panelRef.current);
      trap.activate();
    }

    document.body.classList.add("overflow-hidden");

    return (): void => {
      unbindKeyPress();
      trap.deactivate();
      document.body.classList.remove("overflow-hidden");
    };
  }, [panelRef, bindKeyPress]);

  useOutsideAlerter(panelRef, () => {
    if (closeOnClickOutside) {
      handleClose();
    }
  });

  return (
    <div
      ref={panelRef}
      className={cn(
        "box-border min-w-[20rem] max-w-300 p-8 rounded-sm border border-border flex flex-col bg-surface-elevated max-h-[90vh] min-h-50 my-8 overflow-hidden sm:h-auto sm:m-0 sm:min-w-0",
        className,
      )}
    >
      <div className="flex justify-end items-center">
        <button
          tabIndex={0}
          aria-label="Close modal"
          onClick={handleClose}
          className="absolute border-none text-text-tertiary bg-transparent h-4 text-3xl cursor-pointer p-0"
        >
          <Icon src="exit.svg" height={28} />
        </button>
      </div>
      <div className="w-full flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1 className={cn("tracking-[0.2px] text-2xl mb-6 pr-4", className)}>
      {children}
    </h1>
  );
};

const Body: React.FC<
  PropsWithChildren<{ children: ReactNode; className?: string }>
> = ({ children, className }) => {
  return (
    <section className={cn("flex-1 w-full overflow-y-auto", className)}>
      {children}
    </section>
  );
};

const Footer: React.FC<
  PropsWithChildren<{ children: ReactNode; className?: string }>
> = ({ children, className }) => {
  return <section className={cn("w-full mt-6", className)}>{children}</section>;
};

export const Modal = {
  Overlay,
  Panel,
  Title,
  Body,
  Footer,
};
