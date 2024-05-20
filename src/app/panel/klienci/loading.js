import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

async function RootLoading() {

  return (
    <div className='w-full flex flex-col'>
      <span>Klienci - jest to miejsce, które umożliwia przeglądanie oraz zarządzanie wszystkimi użytkownikami.</span>
      <Separator className="my-3"/>
      <div className='flex flex-col gap-3'>
      <div className="flex items-center py-4">
            <Skeleton className={"h-8 w-80 rounded-md"} />
            <Skeleton className={"h-8 w-24 rounded-md ml-auto"} />
        </div>
        <Skeleton className={"rounded-md w-full h-8"} />
        <Skeleton className={"rounded-md w-full h-8"} />
        <Skeleton className={"rounded-md w-full h-8"} />
        <Skeleton className={"rounded-md w-full h-8"} />
        <Skeleton className={"rounded-md w-full h-8"} />
        <Skeleton className={"rounded-md w-full h-8"} />
      </div>
    </div>
  )
}

export default RootLoading