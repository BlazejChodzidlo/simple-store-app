import { Separator } from "@/components/ui/separator"
import SideNav from "@/components/ui/side-nav"
import { getSession } from "@/lib/session/getSession"
import { logout } from "@/lib/session/logout"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Simple Store - Profil",
  description: "Trzeba bedzie zrobic",
}

const sidebarNavItems = [
  {
    title: "Zarządzaj",
    href: "/profil",
  },
  {
    title: "Przysyłki",
    href: "/profil/przesylki",
  },
  {
    title: "Zamówienia",
    href: "/profil/zamowienia",
  },
  {
    title: "Wygląd",
    href: "/profil/wyglad"
  },
  {
    title: "Panel Sterowania",
    href: "/panel"
  },
  {
    title: "Wyloguj",
    href: ""
  }
]

export default async function ProfilLayout({ children }) {
    const session = await getSession()

    if (!session){
        redirect('/')
    }

    async function handleLogout() {
        "use server"

        await logout()
    }

  return (
    <div className="w-full min-h-screen pt-20 pb-6">
        <div className="flex flex-col justify-start items-start w-full top-20 p-8 rounded-md">
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-3xl tracking-wide">Witaj {session?.name}!</h2>
                <span>Oto <span className="font-medium uppercase">twój</span> panel użytkownika. Tutaj możesz zmienić swoje dane, podejrzeć przesyłki oraz zobaczyć zamówienia z przeszłości.</span>
            </div>
            <Separator className="my-3"/>
            <div className="flex flex-row w-full gap-3">
                <SideNav links={sidebarNavItems} admin={session?.admin} logout={handleLogout}/>
                {children}
            </div>
        </div> 
    </div>
  )
}