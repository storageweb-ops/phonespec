import { Link } from "react-router-dom";
import { Phone, formatPrice } from "@/data/phones";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCardProps {
  phone: Phone;
  onCompare?: (phone: Phone) => void;
  isComparing?: boolean;
}

const categoryLabels = {
  flagship: "เรือธง",
  midrange: "ระดับกลาง",
  budget: "ราคาประหยัด",
};

const categoryColors = {
  flagship: "bg-primary text-primary-foreground",
  midrange: "bg-accent text-accent-foreground",
  budget: "bg-secondary text-secondary-foreground",
};

const PhoneCard = ({ phone, onCompare, isComparing }: PhoneCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card card-hover thai-border">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={phone.imageUrl}
          alt={`${phone.brand} ${phone.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={cn("font-medium", categoryColors[phone.category])}>
            {categoryLabels[phone.category]}
          </Badge>
        </div>
        {phone.highlights.length > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-gold text-secondary font-medium shadow-gold">
              {phone.highlights[0]}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Model */}
        <div>
          <p className="text-sm text-muted-foreground">{phone.brand}</p>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {phone.model}
          </h3>
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted rounded-lg px-2 py-1.5">
            <span className="text-muted-foreground">CPU</span>
            <p className="font-medium text-foreground truncate">{phone.processor.split(" ").slice(0, 2).join(" ")}</p>
          </div>
          <div className="bg-muted rounded-lg px-2 py-1.5">
            <span className="text-muted-foreground">RAM</span>
            <p className="font-medium text-foreground">{phone.ram}</p>
          </div>
          <div className="bg-muted rounded-lg px-2 py-1.5">
            <span className="text-muted-foreground">กล้อง</span>
            <p className="font-medium text-foreground">{phone.cameraRear.split(" ")[0]}</p>
          </div>
          <div className="bg-muted rounded-lg px-2 py-1.5">
            <span className="text-muted-foreground">แบต</span>
            <p className="font-medium text-foreground">{phone.battery.replace(" mAh", "")}</p>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <p className="text-2xl font-bold text-gradient-gold">
            {formatPrice(phone.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-gradient-gold text-secondary hover:opacity-90 shadow-gold">
            <Link to={`/phones/${phone.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              ดูสเปก
            </Link>
          </Button>
          <Button
            variant={isComparing ? "secondary" : "outline"}
            size="icon"
            onClick={() => onCompare?.(phone)}
            className={cn(
              "border-primary",
              isComparing && "bg-primary text-primary-foreground"
            )}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
