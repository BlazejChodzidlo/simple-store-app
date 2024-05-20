export const getAllUsers = async () => {
    const res = await fetch('http://localhost:3000/api/user/getAll', {
        method: 'GET',
        cache: 'no-cache',
    })

    const result = await res.json()

    return result
}