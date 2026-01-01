import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Zap, Crown, Star, Camera, Gamepad2 } from "lucide-react";
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

  const categories = [
    {
      id: "flagship",
      name: "เรือธง",
      description: "มือถือระดับพรีเมียม",
      icon: <Crown className="h-6 w-6" />,
      color: "bg-primary text-primary-foreground",
    },
    {
      id: "midrange",
      name: "ระดับกลาง",
      description: "คุ้มค่าทุกการใช้งาน",
      icon: <Star className="h-6 w-6" />,
      color: "bg-accent text-accent-foreground",
    },
    {
      id: "budget",
      name: "ราคาประหยัด",
      description: "คุณภาพดี ราคาเบา",
      icon: <Sparkles className="h-6 w-6" />,
      color: "bg-secondary text-secondary-foreground",
    },
  ];

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
              ค้นหามือถือ
              <span className="block text-gradient-gold">ที่ใช่สำหรับคุณ</span>
            </h1>

            <p className="text-lg text-secondary-foreground/80 max-w-lg">
              เปรียบเทียบสเปก ราคา และรีวิวจากผู้ใช้จริง
              เพื่อช่วยคุณเลือกมือถือที่เหมาะสมที่สุด
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-secondary shadow-gold hover:opacity-90 text-lg px-8"
              >
                <Link to="/phones">
                  ดูมือถือทั้งหมด
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-secondary-foreground/30 hover:bg-secondary-foreground/10 text-lg px-8"
              >
                <Link to="/compare">เปรียบเทียบสเปก</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            {/* <div className="flex gap-8 pt-6">
              {[
                { value: "100+", label: "รุ่นมือถือ" },
                { value: "10+", label: "แบรนด์ชั้นนำ" },
                { value: "50K+", label: "ผู้เข้าชม" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-secondary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-gradient-hero thai-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">เลือกตามหมวดหมู่</h2>
            <p className="text-muted-foreground">
              เลือกดูมือถือตามงบประมาณและความต้องการของคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/phones?category=${cat.id}`}
                className="group bg-card rounded-xl p-6 shadow-card card-hover thai-border text-center"
              >
                <div
                  className={`w-16 h-16 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                <p className="text-muted-foreground text-sm">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ThaiDivider />

      {/* Featured Phones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">มือถือยอดนิยม</h2>
              <p className="text-muted-foreground">รุ่นที่ได้รับความสนใจมากที่สุด</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/phones">
                ดูทั้งหมด
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {featuredPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onCompare={handleCompare}
                isComparing={isSelected(phone.id)}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild className="bg-gradient-gold text-secondary shadow-gold">
              <Link to="/phones">
                ดูมือถือทั้งหมด
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ThaiDivider />

      {/* Highlights Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-secondary-foreground">
              แนะนำตามการใช้งาน
            </h2>
            <p className="text-secondary-foreground/70">
              เลือกมือถือที่เหมาะกับสไตล์การใช้งานของคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) =>
              item.phone ? (
                <Link
                  key={item.title}
                  to={`/phones/${item.phone.id}`}
                  className="group bg-secondary-foreground/5 rounded-xl p-6 border border-secondary-foreground/10 hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center text-secondary">
                      {item.icon}
                    </div>
                    <div>
                      <Badge className="bg-primary text-primary-foreground mb-1">
                        {item.title}
                      </Badge>
                      <p className="text-sm text-secondary-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.phone.imageUrl}
                      alt={item.phone.model}
                      className="w-16 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm text-secondary-foreground/70">
                        {item.phone.brand}
                      </p>
                      <h3 className="font-semibold text-secondary-foreground group-hover:text-primary transition-colors">
                        {item.phone.model}
                      </h3>
                      <p className="text-lg font-bold text-primary mt-1">
                        {formatPrice(item.phone.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      <ThaiDivider />

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">ทำไมต้อง PhoneThai</h2>
            <p className="text-muted-foreground">
              เราช่วยให้คุณตัดสินใจเลือกมือถือได้ง่ายขึ้น
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "ข้อมูลถูกต้อง",
                description: "สเปกและราคาอัปเดตตรงจากผู้ผลิต ไม่มีข้อมูลเก่าหรือผิดพลาด",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "เปรียบเทียบง่าย",
                description: "เลือกมือถือที่สนใจและเปรียบเทียบสเปกแบบ side-by-side ได้ทันที",
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "คำแนะนำอัจฉริยะ",
                description: "ระบบแนะนำมือถือตามงบประมาณและความต้องการการใช้งานของคุณ",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl bg-card shadow-card card-hover"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 text-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-secondary">
            พร้อมเลือกมือถือเครื่องใหม่แล้วหรือยัง?
          </h2>
          <p className="text-secondary/80 mb-8 max-w-xl mx-auto">
            สำรวจมือถือกว่า 100+ รุ่น พร้อมสเปกละเอียดและการเปรียบเทียบที่ใช้งานง่าย
          </p>
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8"
          >
            <Link to="/phones">
              เริ่มต้นค้นหา
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
