export const createUser = async (data) => {
    const res = await fetch('http://localhost:3000/api/user/create', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(data)
    })

    const result = res.json()

    return result
}