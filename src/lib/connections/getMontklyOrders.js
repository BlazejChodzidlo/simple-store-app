export const getMonthlyOrders = async () => {
    const res = await fetch('http://localhost:3000/api/order/getMonthly', {
        method: 'GET',
        cache: 'no-cache'
    })

    const result = await res.json()

    return result
}