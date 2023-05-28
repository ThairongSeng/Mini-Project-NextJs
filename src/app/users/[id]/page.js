import Link from 'next/link';
import React from 'react'

export async function fetchUser(id) {
    const resp = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);
    return resp.json();
}
  
export async function generateMetadata({ params }) {
  const user = await fetchUser(params.id);
  return {
    title: user.title,
    description: user.description,
    thumbnail: user.avatar,

    metadataBase: new URL("https://istad.com"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      images: user.avatar,
      title: user.title,
      description: user.description,
    },
  };
}

export default async function UserDetail({params}) {
    const {id} = params;
    const user = await fetchUser(id);
    return (
      <div>
        <div className="container mx-auto flex min-h-screen flex-wrap items-center justify-around p-3">
          <Link
            href={`/users/${id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={user.avatar}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-64">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <hr/>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-2">
                {user.email}
              </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
