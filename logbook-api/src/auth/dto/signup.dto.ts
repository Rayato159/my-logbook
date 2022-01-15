import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'A password must be: minimum eight characters, at least one letter and one number'
    })
    password: string
}