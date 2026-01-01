import { Link } from "react-router-dom";
import { X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compareStore";
import { cn } from "@/lib/utils";

const CompareBar = () => {
  const { selectedPhones, removePhone, clearAll } = useCompareStore();

  if (selectedPhones.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevated">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              เปรียบเทียบ ({selectedPhones.length}/4):
            </span>
            <div className="flex gap-2">
              {selectedPhones.map((phone) => (
                <div
                  key={phone.id}
                  className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5"
                >
                  <img
                    src={phone.imageUrl}
                    alt={phone.model}
                    className="w-6 h-6 rounded object-cover"
                  />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {phone.model.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <button
                    onClick={() => removePhone(phone.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground"
            >
              ล้างทั้งหมด
            </Button>
            <Button
              asChild
              size="sm"
              disabled={selectedPhones.length < 2}
              className={cn(
                "bg-gradient-gold text-secondary shadow-gold",
                selectedPhones.length < 2 && "opacity-50 cursor-not-allowed"
              )}
            >
              <Link to="/compare">
                <BarChart3 className="h-4 w-4 mr-2" />
                เปรียบเทียบ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
