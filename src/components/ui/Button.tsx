import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonBaseProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: ButtonSize;
  readonly variant?: ButtonVariant;
}

interface ButtonLinkProps
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> {
  readonly href: string;
  readonly external?: boolean;
}

interface ButtonActionProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  readonly href?: never;
  readonly external?: never;
}

export type ButtonProps = ButtonActionProps | ButtonLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-glow hover:bg-brand-strong hover:text-white focus-visible:outline-brand",
  secondary:
    "border border-line bg-surface/80 text-text hover:border-brand/40 hover:bg-brand-soft/70 focus-visible:outline-brand",
  ghost:
    "bg-transparent text-text hover:bg-brand-soft/60 hover:text-brand-strong focus-visible:outline-brand",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function isButtonLinkProps(props: ButtonProps): props is ButtonLinkProps {
  return typeof props.href === "string";
}

function getButtonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";

  if (isButtonLinkProps(props)) {
    const {
      children,
      className,
      external,
      href,
      size: unusedSize,
      variant: unusedVariant,
      ...rest
    } = props;
    const classes = getButtonClasses(variant, size, className);
    const shouldOpenExternally = external ?? isExternalHref(href);
    const opensNewWindow = href.startsWith("http");
    void unusedSize;
    void unusedVariant;

    if (shouldOpenExternally) {
      return (
        <a
          className={classes}
          href={href}
          rel={rest.rel ?? (opensNewWindow ? "noreferrer" : undefined)}
          target={rest.target ?? (opensNewWindow ? "_blank" : undefined)}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    size: unusedSize,
    variant: unusedVariant,
    type = "button",
    ...rest
  } = props;
  void unusedSize;
  void unusedVariant;
  const buttonType =
    type === "submit" || type === "reset" || type === "button" ? type : "button";

  return (
    <button className={getButtonClasses(variant, size, className)} type={buttonType} {...rest}>
      {children}
    </button>
  );
}
