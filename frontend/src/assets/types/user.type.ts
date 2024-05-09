export type User = {
    name: string
    email: string
    role: 'admin' | 'baseUser'
    id?: number
}
