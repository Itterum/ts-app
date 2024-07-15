import { v4 } from 'uuid'

export const generateId = () => {
    return v4().replace(/-/g, '').substring(0, 10)
}
