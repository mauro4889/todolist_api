import { prisma } from ".."
import { UserRoles } from "../entities/Users/roles.enum";


export class UsersService {
    constructor() { }

    static async create({ email, password = '', profile }: any) {
        try {
            const { firstname, lastname } = profile
            const created = await prisma.user.create({
                data: {
                    email,
                    password,
                    role: UserRoles.USER,
                    profile: {
                        create: {
                            firstname,
                            lastname
                        }
                    }
                }
            })
            return { success: true, user: created }
        } catch (error) {
            
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    static async getAll() {
        try {
            const data = await prisma.user.findMany({
                include:{
                    tasks: true,
                    permission: true
                }
            })
            return { success: true, data }
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async getOneById(id: any) {
        try {
            const data = await prisma.user.findUnique({
                where: { id },
                include:{
                    permission: true
                }
            })
            return { success: true, data }
        } catch (error) {
            return { success: false, error: 'Hubo un error' }
        }
    }

    static async getOneByEmail(email: any) {
        try {
            const data = await prisma.user.findUnique({
                where: { email },
                include:{
                    permission: true
                }
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

    static async update({ id}: any, data: any) {
        try {
            const user = this.getOneById(id)
            if (!user) {
                throw Error()
            }

            const modified = await prisma.user.update({
                where: { id },
                data: { ...data }
            })

            return { success: true, modified }
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async delete(id: any) {
        try {

            const deleteUser = await prisma.user.delete({ where: { id }, include: { profile: true } })

            return { success: true, deleteUser };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }
}