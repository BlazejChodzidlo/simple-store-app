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
        title: "User information.",
        description: "Specified user successfully deleted!"
      })
    }
    else {
      toast({
        title: "Something went wrong.",
        description: "There is a problem with your command.",
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
            <DialogTitle>Customer {data?.id}</DialogTitle>
            <DialogDescription>Information about this user. You can see various information, change data, etc.</DialogDescription>
          </DialogHeader>
        )
        : 
        (
          <DialogHeader>
            <DialogTitle>Delete customer</DialogTitle>
            <DialogDescription>This action cannot be undone. Make sure you want to do this.</DialogDescription>
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
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
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