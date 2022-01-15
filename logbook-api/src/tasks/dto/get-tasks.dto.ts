import { IsOptional, IsString } from "class-validator";

export class GetTasksDto {

    @IsOptional()
    @IsString()
    search: string
}