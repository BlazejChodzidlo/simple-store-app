export const getRecentOrders = async () => {
    const res = await fetch('http://localhost:3000/api/order/getRecent', {
        cache: 'no-cache',
        method: 'GET'
    })

    const data = await res.json()

    return data
}