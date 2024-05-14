import DashBoardNav from "@/components/ui/dashboard-nav";
import { getSession } from "@/lib/session/getSession";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panel sterowania",
  description: "Panel sterowania do zarządzania sklepem.",
};


const dashboardLinks = [
    {
        title: "Przegląd",
        href: "/panel"
    },
    {
        title: "Klienci",
        href: "/panel/klienci"
    },
    {
        title: "Produkty",
        href: "/panel/produkty"
    },
    {
        title: "Zamówienia",
        href: '/panel/zamowienia'
    },
    {
        title: "Wsparcie",
        href: '/panel/wsparcie'
    },
]

export default async function RootLayout({ children }) {

    const session = await getSession()

    if (!session && !session.admin){
        redirect('/')
    }

  return (
    <div className="w-full min-h-screen pt-20 pb-6">
        <div className="flex flex-col justify-start items-start w-full top-20 p-8 rounded-md gap-0.5">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="font-bold text-3xl tracking-wide">Panel sterowania</h2>
                <DashBoardNav links={dashboardLinks}/>
            </div>
            <div className="flex flex-row w-full gap-3">
                {children}
            </div>
        </div> 
    </div>
  );
}
