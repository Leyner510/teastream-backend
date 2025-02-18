import { PrismaService } from '@/src/core/prisma/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { hash } from 'argon2';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AccountService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly verificationdService: VerificationService
    ) {}
    
    public async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    public async create(input: CreateUserInput) {
        const {username, email, password} = input

        const isUsernmaeExsists = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })
        
        if (isUsernmaeExsists) {
            throw new ConflictException('Это имя пользователя уже занято.')
        }

        const isEmailExsists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        
        if (isEmailExsists) {
            throw new ConflictException('Эта электронная почта уже была зарегистрирована.')
        }

        const user = await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username
            }
        })

        await this.verificationdService.sendVerificationToken(user)

        return true
    }
}
