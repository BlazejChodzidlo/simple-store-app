import DashBoardNav from "@/components/ui/dashboard-nav";
import { getSession } from "@/lib/session/getSession";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panel sterowania",
  description: "Panel sterowania do zarządzania sklepem.",
};


const dashboardLinks = [
    {
        title: "Overview",
        href: "/dashboard/overview"
    },
    {
        title: "Customers",
        href: '/dashboard/customers'
    },
    {
        title: "Products",
        href: '/dashboard/products'
    },
    {
        title: "Orders",
        href: '/dashboard/orders'
    },
    {
        title: "Support",
        href: '/dashboard/support'
    },
]

export default async function RootLayout({ children }) {

    const session = await getSession()

    if (!session && !session?.admin){
        redirect('/')
    }

  return (
    <div className="w-full min-h-screen pt-20 pb-6">
        <div className="flex flex-col justify-start items-start w-full top-20 p-8 rounded-md gap-0.5">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="font-bold text-3xl tracking-wide">Dashboard</h2>
                <DashBoardNav links={dashboardLinks}/>
            </div>
            <div className="flex flex-row w-full gap-3">
                {children}
            </div>
        </div> 
    </div>
  );
}
