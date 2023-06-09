import Category from "@/components/Category";
import React from "react";

export async function fetchCategories() {
  const resp = await fetch(
    "https://api.escuelajs.co/api/v1/categories?limit=6",
    { cache: "no-store" }
  );
  return resp.json();
}
export const metadata = {
  title: 'ISTAD - Categories',
  description: 'All The Categories of ISTAd are here',
}
export default async function Categories() {
  const categories = await fetchCategories();

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <h1 style={{ fontSize: "30px", color: "red", fontWeight: "bold",marginTop:"8px" }}>
        Category Management
      </h1>
      <div className="flex min-h-screen flex-wrap items-center justify-evenly">
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}