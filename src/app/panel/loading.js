import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

async function RootLoading() {

  return (
    <div className='w-full flex flex-col'>
      <span>Przegląd - tutaj możesz sprawdzić ostatnie informacje i dane. Aby zobaczyć szczegóły sprawdź inne kategorie.</span>
      <Separator className="my-3"/>
      <div className='flex flex-col gap-3'>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className={"rounded-md h-32"} />
            <Skeleton className={"rounded-md h-32"} />
            <Skeleton className={"rounded-md h-32"} />
            <Skeleton className={"rounded-md h-32"} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Skeleton className={"h-[450px] col-span-3 rounded-md"} />
            <Skeleton className={"h-[450px] col-span-5 rounded-md"} />
        </div>
      </div>
    </div>
  )
}

export default RootLoading