import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Cpu,
  Smartphone,
  Battery,
  Camera,
  HardDrive,
  Monitor,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ThaiDivider from "@/components/ThaiDivider";
import { getPhoneById, formatPrice, phones } from "@/data/phones";
import { useCompareStore } from "@/store/compareStore";
import PhoneCard from "@/components/PhoneCard";
import { cn } from "@/lib/utils";

const categoryLabels = {
  flagship: "เรือธง",
  midrange: "ระดับกลาง",
  budget: "ราคาประหยัด",
};

const PhoneDetail = () => {
  const { id } = useParams<{ id: string }>();
  const phone = getPhoneById(id || "");
  const { addPhone, removePhone, isSelected, selectedPhones } = useCompareStore();

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลมือถือ</h1>
          <Button asChild>
            <Link to="/phones">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้ารายการ
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isComparing = isSelected(phone.id);

  const handleCompare = () => {
    if (isComparing) {
      removePhone(phone.id);
    } else {
      addPhone(phone);
    }
  };

  const specs = [
    {
      icon: <Monitor className="h-5 w-5" />,
      label: "หน้าจอ",
      value: `${phone.display.size} ${phone.display.type}`,
      detail: `${phone.display.resolution} • ${phone.display.refreshRate}`,
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      label: "ชิปเซ็ต",
      value: phone.processor,
      detail: null,
    },
    {
      icon: <HardDrive className="h-5 w-5" />,
      label: "RAM / Storage",
      value: phone.ram,
      detail: phone.storage,
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "กล้องหลัง",
      value: phone.cameraRear,
      detail: null,
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "กล้องหน้า",
      value: phone.cameraFront,
      detail: null,
    },
    {
      icon: <Battery className="h-5 w-5" />,
      label: "แบตเตอรี่",
      value: phone.battery,
      detail: null,
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      label: "ระบบปฏิบัติการ",
      value: phone.os,
      detail: null,
    },
  ];

  // Related phones (same category, different id)
  const relatedPhones = phones
    .filter((p) => p.category === phone.category && p.id !== phone.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link to="/phones">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้ารายการ
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl overflow-hidden shadow-card thai-border">
                <div className="aspect-square p-8 flex items-center justify-center bg-muted/30">
                  <img
                    src={phone.imageUrl}
                    alt={`${phone.brand} ${phone.model}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-4">
                {phone.highlights.map((highlight) => (
                  <Badge
                    key={highlight}
                    className="bg-gradient-gold text-secondary shadow-gold"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{categoryLabels[phone.category]}</Badge>
                <Badge variant="outline">{phone.releaseDate}</Badge>
              </div>
              <p className="text-muted-foreground">{phone.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold">{phone.model}</h1>
            </div>

            {/* Price */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <p className="text-sm text-muted-foreground mb-1">ราคาเริ่มต้น</p>
              <p className="text-4xl font-bold text-gradient-gold">
                {formatPrice(phone.price)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleCompare}
                className={cn(
                  "flex-1",
                  isComparing
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-gradient-gold text-secondary shadow-gold"
                )}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {isComparing ? "ลบจากการเปรียบเทียบ" : "เพิ่มเพื่อเปรียบเทียบ"}
              </Button>
              {selectedPhones.length >= 2 && (
                <Button asChild variant="outline" className="border-primary text-primary">
                  <Link to="/compare">
                    ดูการเปรียบเทียบ ({selectedPhones.length})
                  </Link>
                </Button>
              )}
            </div>

            <Separator />

            {/* Specs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">สเปกโดยละเอียด</h2>
              <div className="space-y-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className="font-medium">{spec.value}</p>
                      {spec.detail && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {spec.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros */}
            <div className="bg-accent/10 rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-accent">จุดเด่น</h3>
              <ul className="space-y-2">
                {phone.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ThaiDivider />

        {/* Related Phones */}
        {relatedPhones.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-6">มือถือที่คล้ายกัน</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPhones.map((p) => (
                <PhoneCard
                  key={p.id}
                  phone={p}
                  onCompare={() =>
                    isSelected(p.id) ? removePhone(p.id) : addPhone(p)
                  }
                  isComparing={isSelected(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PhoneDetail;
