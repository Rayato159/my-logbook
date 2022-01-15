import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from './jwt/get-user.decorator';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
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
    ): Promise<{ accessToken }> {
        return this.authService.signIn(signInDto)
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    getUsers(): Promise<User[]> {
        return this.authService.getUsers()
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getUserProfile(
        @GetUser() user: User,
    ): Promise<User> {
        return this.authService.getUserProfile(user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getUserByID(
        @Param('id') id :string,
    ): Promise<User> {
        return this.authService.getUserByID(id)
    }

    @Patch('update')
    @UseGuards(JwtAuthGuard)
    updateProfile(
        @GetUser() user: User,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<User> {
        return this.authService.updateProfile(updateProfileDto, user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(
        @Param('id') id: string
    ): Promise<User> {
        return this.authService.deleteUser(id)
    }
}
