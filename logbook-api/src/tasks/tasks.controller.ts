import { Body, Controller, Get, Param, Post, Patch, Query, Delete } from '@nestjs/common';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    async createTask(
        @Body() createTasksDto: CreateTasksDto
    ): Promise<Tasks> {
        return this.tasksService.createTask(createTasksDto)
    }

    @Get()
    async getTasks(
        @Query() getTasksDto: GetTasksDto
    ): Promise<Tasks[]> {
        return this.tasksService.getTasks(getTasksDto)
    }

    @Get('/:id')
    async getTaskByID(
        @Param('id') id: string,
    ): Promise<Tasks> {
        return this.tasksService.getTaskByID(id)
    }

    @Patch('/:id/update')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Tasks> {
        return this.tasksService.updateTask(id, updateTaskDto)
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id') id: string
    ): Promise<Tasks> {
        return this.tasksService.deleteTask(id)
    }
}
