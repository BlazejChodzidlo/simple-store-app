import { Separator } from '@/components/ui/separator';
import React from 'react'

async function Panel() {
  return (
    <div className='w-full flex flex-col'>
      <span>Przegląd - totaj możesz sprawdzić ostatnie informacje i dane. Aby zobaczyć szczegóły sprawdź inne kategorie.</span>
      <Separator className="my-3"/>
    </div>
  )
}

export default Panel