import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({usernameField: 'email'}) //specify a different field to check username on
    }

    async validate(username: string, password: string) {
        try {
            return this.usersService.verifyUser(username, password)   
        } catch(err) {
            throw new UnauthorizedException(err)
        }
    }
}