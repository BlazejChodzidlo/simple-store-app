export const login = async (data) => {
    const res = await fetch('http://localhost:3000/api/user/login', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(data)
    })

    const result = await res.json()

    return result
}