import { Body, Controller, Get, Param, Post, Patch, Query, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTask(
        @Body() createTasksDto: CreateTasksDto
    ): Promise<Tasks> {
        return this.tasksService.createTask(createTasksDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getTasks(
        @Query() getTasksDto: GetTasksDto
    ): Promise<Tasks[]> {
        return this.tasksService.getTasks(getTasksDto)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getTaskByID(
        @Param('id') id: string,
    ): Promise<Tasks> {
        return this.tasksService.getTaskByID(id)
    }

    @Patch('/:id/update')
    @UseGuards(JwtAuthGuard)
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Tasks> {
        return this.tasksService.updateTask(id, updateTaskDto)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteTask(
        @Param('id') id: string
    ): Promise<Tasks> {
        return this.tasksService.deleteTask(id)
    }
}
