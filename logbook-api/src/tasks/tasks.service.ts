import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTasksDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import * as moment from "moment";
import { Tasks } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    async createTask(createTasksDto: CreateTasksDto) {
        const {
            title,
            description,
            created,
        } = createTasksDto

        let date: string

        if(!created) {
            date= moment().format('MMM DD YYYY')
        } else {
            date = created
        }

        const task = this.tasksRepository.create({
            title,
            description,
            created: date,
        })

        try {
            await this.tasksRepository.save(task)
            return task
        } catch(error) {

            throw new ConflictException('Something\'s wrong I can feel it.')
        }
    }

    async getTasks(getTasksDto: GetTasksDto): Promise<Tasks[]> {
        const {
            search,
            date,
        } = getTasksDto

        const query = this.tasksRepository.createQueryBuilder('task')

        if(search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` }
            )
        }

        if(date) {
            query.andWhere('task.created = :created', { date: `%${date}%` })
        }

        const tasks = await query.getMany()
        return tasks
    }

    async getTaskByID(id: string): Promise<Tasks> {
        try {
            const task = await this.tasksRepository.findOne(id)
            return task
        } catch(e) {

            throw new NotFoundException('There are no tasks here.')
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
        const {
            title,
            description,
        } = updateTaskDto

        try {
            const task = await this.getTaskByID(id)

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

    async deleteTask(id: string): Promise<Tasks> {
        try {
            const task = await this.getTaskByID(id)
            await this.tasksRepository.delete(id)
            return task
        } catch(e) {

            throw new NotFoundException('There are no tasks here.')
        }
    }
}
