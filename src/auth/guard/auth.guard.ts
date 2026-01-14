import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "../auth.service";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return this.authService.validateUser(request, response);
    }
}