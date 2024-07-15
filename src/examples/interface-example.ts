import { v4 } from 'uuid'

interface User {
    id?: string
    firstName: string
    lastName: string
    email: string
    role: string
}

function createUser(user: User): User {
    return {
        id: v4().replace(/-/g, '').substring(0, 10),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    }
}

export const TonyStark: User = createUser({
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony.stark@gmail.com',
    role: 'admin'
})
