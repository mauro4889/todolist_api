import { prisma } from "..";


export class PermissionService {
    constructor() { }

    static async create(name: string) {
        try {

            const created = await prisma.permission.create({
                data: {
                    name,
                }
            })

            return { success: true, permission: created }
        } catch (error) {
            console.log(error)
            return { success: false, error: 'Hubo un error' }
        }
    }

    static async getAll() {
        try {
            const data = await prisma.permission.findMany()
            return { success: true, data }
        } catch (error) {
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async assingPermission({ permission, user }: any) {
        try {
            const assigned = prisma.user.update({
                where: { id: user },
                data: {
                    permission: {
                        connect: {
                            name: permission
                        }
                    }
                }
            })

            return { success: true, assigned }
        } catch (error) {
            console.log(error)
            return { success: false, error: 'Hubo un error' }
        }
    }
}