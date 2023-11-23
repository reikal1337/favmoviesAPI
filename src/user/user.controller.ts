import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { EditUserDto, UsersQuery } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private userService: UserService) {}

    @UseGuards(AuthGuard("simpleJWT"))
    @Get()
    getMe(@GetUser() user: SafeUser){
        return user
    }

    @Get("all")
    getAllUsers(
        @Query() dto: UsersQuery,
        ){
        return this.userService.getAllUsers(dto)
    }

    @UseGuards(AuthGuard("simpleJWT"))
    @Get("me")
    getMyUsername(@GetUser("username") username: string){
        return { username: username }

    }

    @UseGuards(AuthGuard("simpleJWT"))
    @Patch()
    changeUserPassword(
    @GetUser("_id") userId: string,
     @Body() dto: EditUserDto){
        return this.userService.changeUserPassword(userId, dto)
    }

    


}
