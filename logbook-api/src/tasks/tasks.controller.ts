import { Body, Controller, Get, Param, Post, Patch, Query, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    @UseGuards(AuthGuard())
    async createTask(
        @Body() createTasksDto: CreateTasksDto,
        @GetUser() user: User,
    ): Promise<Tasks> {
        return this.tasksService.createTask(createTasksDto ,user)
    }

    @Get()
    @UseGuards(AuthGuard())
    async getTasks(
        @Query() getTasksDto: GetTasksDto,
        @GetUser() user: User,
    ): Promise<Tasks[]> {
        return this.tasksService.getTasks(getTasksDto, user)
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async getTaskByID(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Tasks> {
        return this.tasksService.getTaskByID(id, user)
    }

    @Patch('/:id/update')
    @UseGuards(AuthGuard())
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User,
    ): Promise<Tasks> {
        return this.tasksService.updateTask(id, updateTaskDto, user)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    async deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Tasks> {
        return this.tasksService.deleteTask(id, user)
    }
}
