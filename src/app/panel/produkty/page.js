import { Separator } from '@/components/ui/separator'
import React from 'react'

function Produkty() {
  return (
    <div className='w-full flex flex-col'>
      <span>Produkty - totaj możesz sprawdzić ostatnie informacje i dane. Aby zobaczyć szczegóły sprawdź inne kategorie.</span>
      <Separator className="my-3"/>
    </div>
  )
}

export default Produkty