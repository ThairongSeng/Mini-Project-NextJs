import Link from 'next/link'
import React from 'react'

export async function fetchProduct(id){
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    return res.json()
}

export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  return {
    title: product.title,
    description: product.description,
    thumbnail: product.image,

    metadataBase: new URL("https://istad.com"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      images: product.image,
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductDetail({params}) {
    const {id} = params
    const product = await fetchProduct(id)

  return (
    <div>
        <div className="container mx-auto flex min-h-screen flex-wrap items-center justify-around p-3">
        <Link
          href={`/products/${id}`}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={product.images[0]}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
            <hr/>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-2">
              {product.description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
