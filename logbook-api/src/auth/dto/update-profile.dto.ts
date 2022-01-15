import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    oldPassword: string

    @IsOptional()
    @IsString()
    newPassword: string
}