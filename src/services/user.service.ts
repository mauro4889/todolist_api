import { prisma } from ".."


export class UsersService {
    constructor() { }

    static async create(user: any) {
        try {
            const { email, firstname, lastname, password } = user
            const created = await prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    password,
                }
            })
            return { success: true, user: created }
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    static async getAll() {
        try {
            const data = await prisma.user.findMany({})
            return { success: true, data }
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async getOneById(id: any) {
        try {
            const data = await prisma.user.findUnique({
                where: { id }
            })
            return { success: true, data }
        } catch (error) {
            return { success: false, error: 'Hubo un error' }
        }
    }

    static async getOneByEmail(email: any) {
        try {
            const data = await prisma.user.findUnique({
                where: { email }
            })
            if (!data) {
                throw data;
            }
            return { success: true, data }
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' }
        }
    }
}