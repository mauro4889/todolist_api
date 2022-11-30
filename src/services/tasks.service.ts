import { prisma } from ".."


export class TasksService {
    constructor(){}

    static async create({task, description, status, createdTask, createdBy}: any){
        try {
            const created = await prisma.task.create({
                data:{
                    task,
                    description,
                    status,
                    createdTask,
                    createdBy:{
                        connect:{id: createdBy}
                    }
                }
            })
            return {success: true, task: created}
        } catch (error) {
            console.log({error})
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    static async getAll(){
        try {
            const data = await prisma.task.findMany({
                include:{
                    createdBy: true
                }
            })
            return {success: true, data}
        } catch (error) {
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async getOneById(id: any){
        try {
            const data = await prisma.task.findUnique({
                where: {id}
            })
            return {success: true, data}
        } catch (error) {
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    static async update(id: number, data: any){
        try {
            const task = this.getOneById(id)
            if(!task){
                throw Error()
            }

            const modified = await prisma.task.update({
                where: {id},
                data: {...data}
            })

            return {success: true, modified}
        } catch (error) {
            console.log(error)
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    static async delete(id: number){
        try {
            const deleted = await prisma.task.delete({
                where: {id}
            })

            return {success: true, deleted}
        } catch (error) {
            console.log({error})
            return { success: false, error: 'Hubo un error' };
        }
    }
}