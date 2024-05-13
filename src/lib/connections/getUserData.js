export const getUserData = async (email) => {
    const res = await fetch('http://localhost:3000/api/user/get', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({email: email})
    })

    const result = await res.json()

    return result.data
}