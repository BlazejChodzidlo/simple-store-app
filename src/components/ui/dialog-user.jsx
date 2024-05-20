import React from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'
import { deleteUser } from '@/lib/connections/deleteUser'
import { useRouter } from 'next/navigation'
import { useToast } from '../use-toast'
import UpdateUserDataForm from './update-user-form'

function DialogUser({data, logout}) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete(){
    const res = await deleteUser(data)

    if (res?.status){
      router.refresh()
      toast({
        title: "Informacja o użytkowniku.",
        description: "Pomyślnie usunięto wskazanego użytkownika!"
      })
    }
    else {
      toast({
        title: "Coś poszło nie tak.",
        description: "Jest jakiś problem z twoim poleceniem.",
        variant: "destructive"
      })
    }
  }

  return (
    <DialogContent>
      {
        typeof data === "object" ?
        (
          <DialogHeader>
            <DialogTitle>Użytkownik {data?.id}</DialogTitle>
            <DialogDescription>Informaja o tym użytkowniku. Możesz zobaczyć różne informacje, zmienić dane itp.</DialogDescription>
          </DialogHeader>
        )
        : 
        (
          <DialogHeader>
            <DialogTitle>Usuń użytkownika</DialogTitle>
            <DialogDescription>Ta akcja nie może zostać cofnięta. Upewnij się, że chcesz to zrobić.</DialogDescription>
          </DialogHeader>
        )
      }
      <div className="flex flex-col w-full space-x-2">
        <UpdateUserDataForm data={data} logout={logout} />
      </div>
      {
        typeof data !== "object" ?
        (
          <div className='flex justify-end w-full space-x-2'>
            <DialogClose asChild>
              <Button variant="secondary">
                Anuluj
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDelete}>Usuń</Button>
            </DialogClose>
          </div>
        )
        :
        null
      }
    </DialogContent>
  )
}

export default DialogUser