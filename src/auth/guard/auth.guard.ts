import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "../auth.service";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService) {}
    
    publicPath = [
        'auth/sign-in',
        'auth/sign-up',
        'auth/generate-password'
    ]

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();    
        const response = context.switchToHttp().getResponse();
        const path = request.route.path.slice(5)
        
        if(this.publicPath.includes(path)) return true
        return this.authService.validateUser(request, response);
    }
}

