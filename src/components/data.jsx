import { Ban, PackageCheck } from "lucide-react"

export const statuses = [
    {
        value: "FINISHED",
        label: "Finished",
        icon: PackageCheck
    },
    {
        value: "CANCELED",
        label: "Canceled",
        icon: Ban
    }
]