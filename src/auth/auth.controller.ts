import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authServise: AuthService) {}

    @Post("registracija")
    register(@Body() dto: AuthDto){
        return this.authServise.register(dto)
    }

    @Post("prisijungimas")
    login(@Body() dto: AuthDto){
        return this.authServise.login(dto)

    }
}
