export const getAllOrders = async () => {
    const res = await fetch('http://localhost:3000/api/order/getAll', {
        cache: 'no-cache',
        method: "GET"
    })

    const result = await res.json()

    return result
}