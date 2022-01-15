import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTasksDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import * as moment from "moment";
import { Tasks } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    async createTask(createTasksDto: CreateTasksDto, user: User) {
        const {
            title,
            description,
            created,
        } = createTasksDto

        if(created) {
                const task = this.tasksRepository.create({
                    title,
                    description,
                    created: created,
                    user,
                })
        
                try {
                    await this.tasksRepository.save(task)
                    return task
                } catch(error) {
        
                    throw new ConflictException('Something\'s wrong I can feel it.')
                }

        } else {
            
            const task = this.tasksRepository.create({
                title,
                description,
                user,
            })
    
            try {
                await this.tasksRepository.save(task)
                return task
            } catch(error) {
    
                throw new ConflictException('Something\'s wrong I can feel it.')
            }
        }
    }

    async getTasks(getTasksDto: GetTasksDto, user: User): Promise<Tasks[]> {
        const {
            search,
        } = getTasksDto

        const query = this.tasksRepository.createQueryBuilder('task')
        query.where({ user })

        if(search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` }
            )
        }

        const tasks = await query.getMany()
        return tasks
    }

    async getTaskByID(id: string, user: User): Promise<Tasks> {
        try {
            const task = await this.tasksRepository.findOne({ where: { id, user } })
            return task
        } catch(e) {

            throw new NotFoundException('There are no tasks here.')
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Tasks> {
        const {
            title,
            description,
        } = updateTaskDto

        try {
            const task = await this.getTaskByID(id, user)

            if(title) {
                task.title = title
            }

            if(description) {
                task.description = description
            }

            await this.tasksRepository.save(task)
            return task
        } catch(e) {

            throw new NotFoundException('There are no tasks here.')
        }
    }

    async deleteTask(id: string, user: User): Promise<Tasks> {
        try {
            const task = await this.getTaskByID(id, user)
            await this.tasksRepository.delete(id)
            return task
        } catch(e) {

            throw new NotFoundException('There are no tasks here.')
        }
    }
}
