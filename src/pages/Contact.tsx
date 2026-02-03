import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Crown, Star, Camera, Gamepad2, FacebookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PhoneCard from "@/components/PhoneCard";
import ThaiDivider from "@/components/ThaiDivider";
import { phones, getPhonesByCategory, formatPrice } from "@/data/phones";
import { useCompareStore } from "@/store/compareStore";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { addPhone, removePhone, isSelected } = useCompareStore();

  const handleCompare = (phone: typeof phones[0]) => {
    if (isSelected(phone.id)) {
      removePhone(phone.id);
    } else {
      addPhone(phone);
    }
  };

  const featuredPhones = phones.slice(0, 4);
  const flagshipPhones = getPhonesByCategory("flagship");
  const budgetPhones = getPhonesByCategory("budget");

  const highlights = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Best Camera",
      description: "กล้องถ่ายสวย",
      phone: phones.find((p) => p.highlights.includes("Best Camera")),
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "Best Gaming",
      description: "เล่นเกมลื่นไหล",
      phone: phones.find((p) => p.highlights.includes("Best for Gaming")),
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Best Value",
      description: "คุ้มค่าที่สุด",
      phone: phones.find((p) => p.highlights.includes("Best Value") || p.highlights.includes("Great Value")),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <Badge className="bg-gradient-gold text-secondary shadow-gold px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              #1 Mobile Recommendation in Thailand
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight">
              ติดต่อเรา
              <span className="block text-gradient-gold">เพื่อเลือกโทรศัพท์ที่ใช่สำหรับคุณ</span>
            </h1>

            <p className="text-lg text-secondary-foreground/80 max-w-lg">
              มาทำความรู้จักกับเราสิครับ
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-secondary shadow-gold hover:opacity-90 text-lg px-8"
              >
                <Link to="/phones">
                    <Link to="https://www.facebook.com/share/1Ha6b7Evmj/?mibextid=wwXIfr">แฟนเพจ</Link>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-secondary-foreground/30 hover:bg-secondary-foreground/10 text-lg px-8"
              >
                <Link to="https://www.instagram.com/jar_chontcha?igsh=MXUwZTRxY2dqNWNocA==">อินสตาแกรม</Link>
              </Button>
            </div>
           
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Index;
