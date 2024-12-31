"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/graphql/generated-types";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import {
  ArrowRight,
  Clock,
  Search,
  Star,
  Tag,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const trendingSearches = [];

export default function SearchDefaultView({
  categories,
  featuredProducts,
}: {
  categories: Category[];
  featuredProducts: Product[];
}) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("categories");

  const { push } = useRouter();
  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    setRecentSearches(storedSearches);
  }, []);

  const removeRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="mx-auto h-full w-full max-w-4xl cursor-pointer overflow-hidden overflow-y-auto rounded-lg bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg">
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
        <TabsList
          className={cn(
            "mb-8 grid w-full grid-cols-4",
            {
              "grid-cols-3":
                !featuredProducts?.length || !trendingSearches?.length,
            },
            {
              "grid-cols-2":
                !featuredProducts?.length && !trendingSearches?.length,
            },
          )}
        >
          <TabsTrigger value="categories">
            <Tag className="mr-2 h-4 w-4" />
            Kategoriler
          </TabsTrigger>
          {featuredProducts?.length > 0 && (
            <TabsTrigger value="featured">
              <Star className="mr-2 h-4 w-4" />
              Öne Çıkanlar
            </TabsTrigger>
          )}
          <TabsTrigger value="recent">
            <Clock className="mr-2 h-4 w-4" />
            Son Aramalar
          </TabsTrigger>
          {trendingSearches?.length > 0 && (
            <TabsTrigger value="trending">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trend Aramalar
            </TabsTrigger>
          )}
        </TabsList>

        <AnimatePresence mode="wait">
          <div>
            <TabsContent value="categories">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {categories?.map((category, index) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className={`flex h-auto w-full flex-col items-center justify-center py-4`}
                    >
                      <Image
                        src={getImageUrlFromPath(category.image_url)}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

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
                {featuredProducts?.map((product, index) => (
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
                      <Image
                        src={getImageUrlFromPath(product.image_url?.[0])}
                        alt={product.name}
                        className="h-20 w-20 rounded object-cover"
                        width={80}
                        height={80}
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
                              className={`h-4 w-4 ${i < Math.floor(product.score) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {product.score.toFixed(1)}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2"
                          onClick={() => push(`/arama?search=${search}`)}
                        >
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
                {trendingSearches?.map((search, index) => (
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
