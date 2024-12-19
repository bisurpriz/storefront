"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Search,
  Star,
  Tag,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const popularCategories: Category[] = [
  { id: 1, name: "Elektronik", icon: "💻", color: "bg-blue-100" },
  { id: 2, name: "Giyim", icon: "👕", color: "bg-green-100" },
  { id: 3, name: "Ev & Yaşam", icon: "🏠", color: "bg-yellow-100" },
  { id: 4, name: "Kozmetik", icon: "💄", color: "bg-pink-100" },
  { id: 5, name: "Kitap & Hobi", icon: "📚", color: "bg-purple-100" },
  { id: 6, name: "Spor & Outdoor", icon: "🏋️‍♂️", color: "bg-red-100" },
  { id: 7, name: "Oyuncak", icon: "🧸", color: "bg-orange-100" },
  { id: 8, name: "Süpermarket", icon: "🛒", color: "bg-teal-100" },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Akıllı Saat XYZ",
    price: 999.99,
    image: "/placeholder.svg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Kablosuz Kulaklık ABC",
    price: 299.99,
    image: "/placeholder.svg",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Akıllı Telefon 123",
    price: 4999.99,
    image: "/placeholder.svg",
    rating: 4.8,
  },
  {
    id: 4,
    name: "4K Ultra HD TV",
    price: 5999.99,
    image: "/placeholder.svg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Oyun Konsolu Pro",
    price: 7999.99,
    image: "/placeholder.svg",
    rating: 4.7,
  },
];

const trendingSearches = [
  "yaz modası",
  "akıllı ev sistemleri",
  "organik gıda",
  "fitness ekipmanları",
  "cilt bakım ürünleri",
];

export default function EnhancedSearchDefaultView() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("categories");

  useEffect(() => {
    const storedSearches = [
      "laptop",
      "spor ayakkabı",
      "bluetooth hoparlör",
      "yoga matı",
    ];
    setRecentSearches(storedSearches);
  }, []);

  const removeRecentSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg">
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
          <Search className="h-16 w-16 text-primary" />
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-4">
          <TabsTrigger value="categories">
            <Tag className="mr-2 h-4 w-4" />
            Kategoriler
          </TabsTrigger>
          <TabsTrigger value="featured">
            <Star className="mr-2 h-4 w-4" />
            Öne Çıkanlar
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="mr-2 h-4 w-4" />
            Son Aramalar
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trend Aramalar
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <div>
            <TabsContent value="categories">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {popularCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className={`flex h-auto w-full flex-col items-center justify-center py-4 ${category.color}`}
                    >
                      <span
                        className="mb-2 text-3xl"
                        role="img"
                        aria-label={category.name}
                      >
                        {category.icon}
                      </span>
                      <span className="text-center text-sm font-medium">
                        {category.name}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 * index }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="mb-1 font-medium">{product.name}</h3>
                        <p className="mb-2 text-sm text-gray-500">
                          ₺{product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4 w-full">
                      Ürüne Git
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              {recentSearches.length > 0 ? (
                <ul className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span>{search}</span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRecentSearch(index)}
                          aria-label="Aramayı sil"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <Clock className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                  <p>Henüz arama geçmişiniz yok.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending">
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((search, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Badge
                      variant="new"
                      className="cursor-pointer px-3 py-2 text-base transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {search}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <TrendingUp className="h-16 w-16 text-primary" />
                </motion.div>
              </div>
            </TabsContent>
          </div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
