export const updateUserData = async (values, path) => {
    const res = await fetch('http://localhost:3000/api/user/update', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({
            values,
            path
        })
    })

    const result = await res.json()

    return result
}