import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Megaphone } from "lucide-react";
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
        "rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-amber-600" aria-hidden="true" />
            <p className="text-base font-semibold text-amber-900">{title}</p>
          </div>
          <p className="text-sm text-amber-900/85">{message}</p>
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
