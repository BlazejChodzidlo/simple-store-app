import ModeToggleButton from '@/components/ui/mode-toggle-buttons'
import React from 'react'

function Apperance() {
  return (
    <div className='flex flex-grow border rounded-md shadow p-6' style={{minHeight: '71vh'}}>
      <ModeToggleButton />
    </div>
  )
}

export default Apperance