import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/signin.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find()
            return users
            
        } catch(e) {
            throw new NotFoundException('Users are empty.')
        }
    }

    async getUserByID(id: string): Promise<User> {
        try {
            const userFinder = await this.userRepository.findOne(id)
            return userFinder
        } catch(e) {
            throw new NotFoundException('User not found.')
        }
    }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const {
            username,
            password,
        } = signUpDto

        const userCheck = await this.userRepository.findOne({ username })
        if(userCheck) {
            throw new ConflictException('This username has been already using.')
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({
            username,
            password: hashedPassword
        })

        await this.userRepository.save(user)
        return user
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const {
            username,
            password,
        } = signInDto

        const user = await this.userRepository.findOne({ username })

        if(!user) {
            throw new NotFoundException('Please check your username or password')
        }

        if(user && await bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { username }
            const accessToken: string = this.jwtService.sign(payload)
            return { accessToken }

        } else {
            throw new NotFoundException('Something\'s wrong I can feel it.')
        }
    }

    async getUserProfile(user: User): Promise<User> {
        try {
            const userInfo = await this.userRepository.findOne(user.id)
            return userInfo
        } catch(e) {
            throw new NotFoundException('Never gonna give you up.')
        }
    }

    async updateProfile(updateProfileDto: UpdateProfileDto, user: User): Promise<User> {
        const {
            username,
            oldPassword,
            newPassword,
        } = updateProfileDto

       if(username) {
           user.username = username
       }

       if(oldPassword === newPassword) {
           throw new ConflictException('Password can\'t be the same as last')
       }

       if(!await bcrypt.compare(oldPassword, user.password)) {
        throw new ConflictException('Please check your password')
       }

       const salt = await bcrypt.genSalt()
       const hashedPassword = await bcrypt.hash(newPassword, salt)
       user.password = hashedPassword

       await this.userRepository.save(user)
       return user
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const userDeleted = await this.getUserByID(id)
            await this.userRepository.delete(id)
            return userDeleted
        } catch(e) {
            throw new NotFoundException('User not found.')
        }
    }
}
