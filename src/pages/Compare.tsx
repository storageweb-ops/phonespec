import { Link } from "react-router-dom";
import { X, Plus, ArrowLeft, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThaiDivider from "@/components/ThaiDivider";
import { useCompareStore } from "@/store/compareStore";
import { phones, formatPrice, Phone } from "@/data/phones";
import { cn } from "@/lib/utils";

const Compare = () => {
  const { selectedPhones, removePhone, addPhone, clearAll } = useCompareStore();

  const specs: {
    key: keyof Phone | string;
    label: string;
    getValue: (phone: Phone) => string;
    highlight?: "highest" | "lowest";
  }[] = [
    { key: "price", label: "ราคา", getValue: (p) => formatPrice(p.price), highlight: "lowest" },
    { key: "display", label: "หน้าจอ", getValue: (p) => `${p.display.size} ${p.display.type}` },
    { key: "resolution", label: "ความละเอียด", getValue: (p) => p.display.resolution },
    { key: "refreshRate", label: "อัตราการรีเฟรช", getValue: (p) => p.display.refreshRate },
    { key: "processor", label: "ชิปเซ็ต", getValue: (p) => p.processor },
    { key: "ram", label: "RAM", getValue: (p) => p.ram, highlight: "highest" },
    { key: "storage", label: "ความจุ", getValue: (p) => p.storage },
    { key: "cameraRear", label: "กล้องหลัก", getValue: (p) => p.cameraRear },
    { key: "cameraFront", label: "กล้องหน้า", getValue: (p) => p.cameraFront },
    { key: "battery", label: "แบตเตอรี่", getValue: (p) => p.battery, highlight: "highest" },
    { key: "os", label: "ระบบปฏิบัติการ", getValue: (p) => p.os },
  ];

  const getNumericValue = (value: string): number => {
    const match = value.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  };

  const getBestValue = (spec: typeof specs[0]): string[] => {
    if (!spec.highlight || selectedPhones.length < 2) return [];

    const values = selectedPhones.map((p) => ({
      id: p.id,
      value: getNumericValue(spec.getValue(p)),
    }));

    if (spec.highlight === "highest") {
      const max = Math.max(...values.map((v) => v.value));
      return values.filter((v) => v.value === max).map((v) => v.id);
    } else {
      const min = Math.min(...values.map((v) => v.value));
      return values.filter((v) => v.value === min).map((v) => v.id);
    }
  };

  const availablePhones = phones.filter(
    (p) => !selectedPhones.find((sp) => sp.id === p.id)
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <Link to="/phones">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้ารายการ
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">เปรียบเทียบมือถือ</h1>
              <p className="text-muted-foreground">
                เลือกมือถือสูงสุด 4 รุ่นเพื่อเปรียบเทียบสเปก
              </p>
            </div>
            {selectedPhones.length > 0 && (
              <Button variant="outline" onClick={clearAll} className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                ล้างทั้งหมด
              </Button>
            )}
          </div>
        </div>

        <ThaiDivider />

        {selectedPhones.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">ยังไม่มีมือถือในรายการเปรียบเทียบ</h2>
            <p className="text-muted-foreground mb-6">
              เลือกมือถือจากรายการเพื่อเริ่มเปรียบเทียบ
            </p>
            <Button asChild className="bg-gradient-gold text-secondary shadow-gold">
              <Link to="/phones">เลือกมือถือ</Link>
            </Button>
          </div>
        ) : (
          // Comparison Table
          <div className="py-8">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-background p-4 text-left font-semibold w-40 min-w-40"></th>
                    {selectedPhones.map((phone) => (
                      <th
                        key={phone.id}
                        className="p-4 text-center min-w-60 bg-card rounded-t-xl border border-b-0 border-border"
                      >
                        <div className="relative">
                          <button
                            onClick={() => removePhone(phone.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <img
                            src={phone.imageUrl}
                            alt={phone.model}
                            className="w-24 h-32 object-cover rounded-lg mx-auto mb-3"
                          />
                          <p className="text-sm text-muted-foreground">
                            {phone.brand}
                          </p>
                          <h3 className="font-semibold">{phone.model}</h3>
                          <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {phone.highlights.slice(0, 2).map((h) => (
                              <Badge
                                key={h}
                                variant="secondary"
                                className="text-xs"
                              >
                                {h}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </th>
                    ))}
                    {selectedPhones.length < 4 && (
                      <th className="p-4 text-center min-w-60 bg-muted/50 rounded-t-xl border border-b-0 border-dashed border-border">
                        <div className="h-48 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            เพิ่มมือถือ
                          </p>
                          <Button asChild size="sm" variant="outline">
                            <Link to="/phones">เลือก</Link>
                          </Button>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, index) => {
                    const bestIds = getBestValue(spec);
                    return (
                      <tr key={spec.key}>
                        <td className="sticky left-0 z-10 bg-background p-4 text-sm font-medium border-b border-border">
                          {spec.label}
                        </td>
                        {selectedPhones.map((phone) => {
                          const isBest = bestIds.includes(phone.id);
                          return (
                            <td
                              key={phone.id}
                              className={cn(
                                "p-4 text-center text-sm border border-t-0 border-border",
                                index % 2 === 0 ? "bg-card" : "bg-card/50",
                                isBest && "bg-accent/10"
                              )}
                            >
                              <div className="flex items-center justify-center gap-2">
                                {isBest && (
                                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                )}
                                <span className={cn(isBest && "font-semibold text-accent")}>
                                  {spec.getValue(phone)}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                        {selectedPhones.length < 4 && (
                          <td
                            className={cn(
                              "p-4 text-center border border-t-0 border-dashed border-border",
                              index % 2 === 0 ? "bg-muted/30" : "bg-muted/20"
                            )}
                          >
                            <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Add Section */}
            {availablePhones.length > 0 && selectedPhones.length < 4 && (
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">เพิ่มมือถือเปรียบเทียบ</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {availablePhones.slice(0, 6).map((phone) => (
                    <button
                      key={phone.id}
                      onClick={() => addPhone(phone)}
                      className="flex-shrink-0 bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-shadow flex items-center gap-3 min-w-60"
                    >
                      <img
                        src={phone.imageUrl}
                        alt={phone.model}
                        className="w-12 h-16 rounded-lg object-cover"
                      />
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">
                          {phone.brand}
                        </p>
                        <p className="font-medium">{phone.model}</p>
                        <p className="text-sm text-primary font-semibold">
                          {formatPrice(phone.price)}
                        </p>
                      </div>
                      <Plus className="h-5 w-5 text-muted-foreground ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
