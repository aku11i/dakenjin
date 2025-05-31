import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

export type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  ref?: React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>>;
};

export function Progress({ className, value, ref, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-muted shadow-inner",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-r from-primary/80 to-primary/60 transition-all duration-500 ease-out rounded-full shadow-sm"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
