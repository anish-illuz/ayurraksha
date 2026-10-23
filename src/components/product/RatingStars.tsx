import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, count, size = 14 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-ayur-amber">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-${size === 14 ? "3.5" : "4"} h-${size === 14 ? "3.5" : "4"} ${
              star <= Math.round(rating)
                ? "fill-ayur-amber text-ayur-amber"
                : "text-ayur-border fill-ayur-cream"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-ayur-slate ml-0.5">{rating}</span>
      {count !== undefined && (
        <span className="text-[10px] text-ayur-muted">({count})</span>
      )}
    </div>
  );
};
