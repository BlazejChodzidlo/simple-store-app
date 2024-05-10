import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SECRET_KEY)

export const encrypt = async (payload) => {
    return await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime('1 hour from now')
    .sign(key)
}

export const decrypt = async (input) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })

    return payload
}