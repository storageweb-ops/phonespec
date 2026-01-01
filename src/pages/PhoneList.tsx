import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneCard from "@/components/PhoneCard";
import ThaiDivider from "@/components/ThaiDivider";
import { phones, brands, formatPrice } from "@/data/phones";
import { useCompareStore } from "@/store/compareStore";

type SortOption = "price-asc" | "price-desc" | "name" | "newest";

const PhoneList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addPhone, removePhone, isSelected } = useCompareStore();

  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000]);
  const [minRam, setMinRam] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const handleCompare = (phone: typeof phones[0]) => {
    if (isSelected(phone.id)) {
      removePhone(phone.id);
    } else {
      addPhone(phone);
    }
  };

  // Filter and sort phones
  const filteredPhones = useMemo(() => {
    let result = [...phones];

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by RAM
    if (minRam > 0) {
      result = result.filter((p) => {
        const ram = parseInt(p.ram.replace(/\D/g, ""));
        return ram >= minRam;
      });
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case "newest":
        result.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        break;
    }

    return result;
  }, [selectedBrands, selectedCategories, priceRange, minRam, sortBy]);

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 60000]);
    setMinRam(0);
    setSortBy("newest");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 60000 ||
    minRam > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brands */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">แบรนด์</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand.id]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand.id));
                  }
                }}
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm cursor-pointer"
              >
                {brand.logo} {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">หมวดหมู่</Label>
        <div className="space-y-2">
          {[
            { id: "flagship", name: "เรือธง" },
            { id: "midrange", name: "ระดับกลาง" },
            { id: "budget", name: "ราคาประหยัด" },
          ].map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, cat.id]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== cat.id)
                    );
                  }
                }}
              />
              <label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer">
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">
          ช่วงราคา: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={60000}
          step={1000}
          className="mt-2"
        />
      </div>

      {/* Min RAM */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">RAM ขั้นต่ำ</Label>
        <Select
          value={minRam.toString()}
          onValueChange={(v) => setMinRam(parseInt(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="เลือก RAM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">ทั้งหมด</SelectItem>
            <SelectItem value="6">6 GB+</SelectItem>
            <SelectItem value="8">8 GB+</SelectItem>
            <SelectItem value="12">12 GB+</SelectItem>
            <SelectItem value="16">16 GB+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          ล้างตัวกรอง
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">โทรศัพท์ทั้งหมด</h1>
          <p className="text-muted-foreground">
            ค้นหาและเปรียบเทียบมือถือที่เหมาะกับคุณ
          </p>
        </div>

        <ThaiDivider />

        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl p-6 shadow-card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                ตัวกรอง
              </h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-muted-foreground">
                พบ <span className="font-semibold text-foreground">{filteredPhones.length}</span> รุ่น
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      ตัวกรอง
                      {hasActiveFilters && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                          {selectedBrands.length + selectedCategories.length}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        ตัวกรอง
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="เรียงตาม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                    <SelectItem value="price-asc">ราคา: ต่ำ → สูง</SelectItem>
                    <SelectItem value="price-desc">ราคา: สูง → ต่ำ</SelectItem>
                    <SelectItem value="name">ชื่อรุ่น A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Phone Grid */}
            {filteredPhones.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPhones.map((phone) => (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    onCompare={handleCompare}
                    isComparing={isSelected(phone.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl">
                <p className="text-muted-foreground mb-4">
                  ไม่พบมือถือตามเงื่อนไขที่เลือก
                </p>
                <Button onClick={clearFilters} variant="outline">
                  ล้างตัวกรอง
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
