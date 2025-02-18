import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordRecoveryService } from './password-recovery.service';
import { GqlContext } from '@/src/shared/types/gql-context,types';
import { ResetPasswordInput } from './inputs/reset-password.inputs';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';

@Resolver('PasswordRecovery')
export class PasswordRecoveryResolver {
  public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Mutation(() => Boolean, {name: "resetPassword"})
  public async resetPassword(
    @Context() { req }: GqlContext, 
    @Args('data') input: ResetPasswordInput, 
    @UserAgent() userAgent: string
  ) {
    return this.passwordRecoveryService.reserPassword(req, input, userAgent)
  }
}
