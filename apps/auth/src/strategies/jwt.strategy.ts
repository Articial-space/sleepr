import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly usersService: UsersService) {
        super({jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => request?.cookies?.Authentication || request?.Authentication]), // As the JWT will pass a straight authentication method not pass in via the cookie obj so we ckeck the request if it has Authentication prop 
            secretOrKey: configService.get('JWT_SECRET')
        }) // Specify where on the request on the request obj does the jwt live
    }
    async validate({userId}: TokenPayload) {
        return this.usersService.getUser({_id: userId})
    } //When the JWT decoded, the tokenPayload is supplied to the validate method here. | Check if the user on the token actually exist
}