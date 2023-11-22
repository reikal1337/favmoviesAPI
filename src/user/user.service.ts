import { BadRequestException, ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditUserDto } from './dto';
import * as argon from "argon2"
import { parse } from 'path';

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly userModel: Model<any>,) {}

    async changeUserPassword(
        userId: string,
        dto: EditUserDto){
        const user: DbUser = await this.userModel.findById({ _id: userId })
        const validPsw = await argon.verify(user.password, dto.oldPassword)
        if(!validPsw) throw new ForbiddenException("Blogas senas slaptazodis!")

        const hashedPassword = await argon.hash(dto.password)

        const userUpdated = await this.userModel.findByIdAndUpdate({
            _id: userId,
        },{
            password: hashedPassword
        }, {
            new: true
        }).select(" -password")

        return { user: userUpdated};
    }

    async getAllUsers(qPage: string){
        const limit = 5;
        const userNumber = await this.userModel.estimatedDocumentCount()
        const pageMax = Math.ceil(userNumber / limit);
        const parsedPage = parseInt(qPage)
        const page = parsedPage <= pageMax && parsedPage > 0 ? parsedPage : 1
        const usersToSkip = (page - 1 ) * limit

        const allUsers = await this.userModel.find().select("_id username").limit(limit).skip(usersToSkip)

        return { users: allUsers, page, pageMax }
    }

}
