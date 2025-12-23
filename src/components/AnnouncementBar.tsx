import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AnnouncementBarProps = {
  title: string;
  message: string;
  ctaLabel: string;
  ctaLink: string;
  className?: string;
  actionsSlot?: ReactNode;
};

export const AnnouncementBar = ({
  title,
  message,
  ctaLabel,
  ctaLink,
  className,
  actionsSlot,
}: AnnouncementBarProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-200 bg-amber-50 shadow-sm px-5 py-4",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {actionsSlot ?? (
          <Button asChild variant="outline" size="sm" className="whitespace-nowrap">
            <Link to={ctaLink}>{ctaLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
