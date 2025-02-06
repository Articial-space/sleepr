import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication // any service that using this Auth guard will have to use the cookie-parser lib to make sure we get the authentication cookie set on.
        if (!jwt) {
            return false
        }
        return this.authClient.send<UserDto>('authenticate', {
            Authentication: jwt
        }).pipe(
            tap((res) => {
                context.switchToHttp().getRequest().user = res
            }),
            map(() => true), // return true to auth service via the message pattern that the request is authenticated
            // tap() allows to alter side effect on the response
            catchError(() => of(false))
        )
    }
}