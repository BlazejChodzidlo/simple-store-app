import { getSession } from "../session/getSession"

export const getStats = async () => {
    const session = await getSession()
    const res = await fetch('http://localhost:3000/api/stats', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(session)
    })

    const result = await res.json()

    return result
}