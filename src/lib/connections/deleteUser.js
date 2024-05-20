export const deleteUser = async (id) => {
    const res = await fetch('http://localhost:3000/api/user/delete', {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(id)
    })

    const result = await res.json()

    return result
}