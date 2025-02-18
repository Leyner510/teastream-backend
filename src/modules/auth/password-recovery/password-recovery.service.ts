import { PrismaService } from '@/src/core/prisma/prisma/prisma.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { MailService } from '../../libs/mail/mail.service';
import { Request } from 'express';
import { ResetPasswordInput } from './inputs/reset-password.inputs';
import { generateToken } from '@/src/shared/utils/generate-token.utils';
import { Token } from 'graphql';
import { TokenType } from '@/prisma/generated';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.utils';

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailservice: MailService
    ) {}

    public async reserPassword(
        req: Request,
        input: ResetPasswordInput,
        userAgent: string
    ) {
        const {email} = input

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            throw new NotAcceptableException("Пользователь не найден")
        }

        const resetToken = await generateToken(
            this.prismaService, 
            user, 
            TokenType.PASSWORD_RESET
        )
        const metadata = getSessionMetadata(req, userAgent)

        await this.mailservice.sendPasswordResetToken(
            user.email, 
            resetToken.token,
            metadata
        )

        return true
    }
}
