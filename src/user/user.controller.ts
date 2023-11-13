import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard("simpleJWT"))
@Controller('user')
export class UserController {
    constructor( private userService: UserService) {}

    @Get()
    getMe(@GetUser() user: SafeUser){
        return user
    }

    @Patch()
    changeUserPassword(
    @GetUser("_id") userId: string,
     @Body() dto: EditUserDto){
        return this.userService.changeUserPassword(userId, dto)
    }


}
