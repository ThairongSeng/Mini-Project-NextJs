import Product from "@/components/Product";
import React from "react";


export async function fetchProducts() {
  const resp = await fetch(
    "https://api.escuelajs.co/api/v1/products?limit=18&offset=1",
    { cache: "no-store" }
  );
  return resp.json();
}

export default async function Products() {
  const products = await fetchProducts();

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <h1 style={{ fontSize: "30px", color: "blue", fontWeight: "bold"}}>
        Product Management
      </h1>
      <div className="flex min-h-screen flex-wrap items-center justify-evenly">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            images={product.images[0]}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

