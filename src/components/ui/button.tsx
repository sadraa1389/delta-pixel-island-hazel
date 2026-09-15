import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[color,background-color,border-color,opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-ink-soft",
        gold: "bg-gold text-gold-foreground hover:bg-gold-soft",
        outline:
          "border border-border bg-transparent text-foreground hover:border-gold hover:text-ink",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "rounded-none bg-transparent px-0 text-foreground underline-offset-8 hover:text-gold hover:underline",
      },
      size: {
        sm: "h-10 min-h-10 px-3.5 text-sm",
        md: "h-11 min-h-11 px-5 text-sm",
        lg: "h-12 min-h-12 px-7 text-base",
        icon: "size-11 min-h-11 min-w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? {} : { type })}
      {...props}
    />
  );
}


