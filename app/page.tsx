import CampaignGrid from '@/components/Grids/CampaignGrid/CampaignGrid'
import View1 from '@/components/Layout/GridViews/View1'
import { Suspense } from 'react'
import { getBanners } from './actions'

export default async function Page() {
  const { banners } = await getBanners()
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-48 h-48 bg-gray-400 rounded-md shadow-md m-2 animate-pulse"
            />
          ))}
        </div>
      }>
      <CampaignGrid banners={banners} />
      <View1 />
    </Suspense>
  )
}
