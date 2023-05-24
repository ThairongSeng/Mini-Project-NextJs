import Image from 'next/image'
import { Suspense } from 'react'
import LoadingDataFetching from './loading'
import Products from './products/page'
import Categories from './categories/page'
import Users from './users/page'
import SlideShow from '@/components/Slideshow'

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<LoadingDataFetching/>}>
          <SlideShow/>
          <Products/>
          <Categories/>
          <Users/>
      </Suspense>

    </main>
  )
}
