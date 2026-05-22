"use client";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium leading-5 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-aqua focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-hub-aqua text-white hover:bg-hub-aqua-dark rounded-[4px]",
        outline:
          "border border-hub-border bg-transparent text-hub-navy hover:bg-hub-surface rounded-[4px]",
        ghost:
          "bg-transparent text-hub-navy hover:bg-hub-surface rounded-[4px]",
        link: "text-hub-aqua underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-3 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        sm: "h-9 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
