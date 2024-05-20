import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("rounded-md bg-muted animate-pulse", className)} {...props} />);
}

export { Skeleton }
