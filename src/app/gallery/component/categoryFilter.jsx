"use client";

import Button from "@/component/button/button";
import { useRouter, usePathname } from "next/navigation";

const CategoryFilter = ({ categories = [], activeCategory = "all" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category) => {
    if (category === "all") {
      router.push("/gallery");
    } else {
      router.push(`/gallery/${category}`);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-4 mb-6 overflow-x-auto">
      <Button
        onClick={() => handleCategoryClick("all")}
        className={`px-3 py-1 text-xs sm:text-sm rounded-full transition font-medium
          ${
            activeCategory === "all" || pathname === "/gallery"
              ? "bg-purple-600 text-white hover:bg-purple-700"  // انتخاب‌شده
              : "bg-white text-gray-500 hover:bg-purple-600 hover:text-white" // انتخاب‌نشده
          }`}
        width="auto"
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-3 py-1 text-xs sm:text-sm rounded-full transition font-medium
            ${
              activeCategory === category
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-white text-gray-500 hover:bg-purple-600 hover:text-white" 
            }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
