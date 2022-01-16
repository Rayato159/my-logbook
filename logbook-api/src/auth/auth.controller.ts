import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from './jwt/get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(
        @Body() signUpDto: SignUpDto
    ): Promise<User> {
        return this.authService.signUp(signUpDto)
    }

    @Post('signin')
    signIn(
        @Body() signInDto: SignInDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto)
    }

    @Get('users')
    @UseGuards(AuthGuard())
    getUsers(): Promise<User[]> {
        return this.authService.getUsers()
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    getUserProfile(
        @GetUser() user: User,
    ): Promise<User> {
        return this.authService.getUserProfile(user)
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    getUserByID(
        @Param('id') id :string,
    ): Promise<User> {
        return this.authService.getUserByID(id)
    }

    @Patch('update')
    @UseGuards(AuthGuard())
    updateProfile(
        @GetUser() user: User,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<User> {
        return this.authService.updateProfile(updateProfileDto, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteUser(
        @Param('id') id: string
    ): Promise<User> {
        return this.authService.deleteUser(id)
    }
}
