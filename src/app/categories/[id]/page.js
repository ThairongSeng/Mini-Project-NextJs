import Link from "next/link";
import React from "react";

export async function fetchCategory(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`);
  return res.json();
}

export async function generateMetadata({ params }) {
  const category = await fetchCategory(params.id);
  return {
    title: category.title,
    description: category.description,
    thumbnail: category.image,

    metadataBase: new URL("https://istad.com"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      images: category.image,
      title: category.title,
      description: category.description,
    },
  };
}

export default async function CategoryDetail({ params }) {
  const { id } = params
  const category = await fetchCategory(id)

  return (
    <div>
        <div className="container mx-auto flex min-h-screen flex-wrap items-center justify-around p-3">
          <Link
            href={`/categories/${id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={category.image}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {category.name}
              </h5>
              <hr />
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-2">
                {category.creationAt}
              </p>
            </div>
          </Link>
        </div>
    </div>
  );
}
