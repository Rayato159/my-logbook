import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTasksDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    created?: string
}