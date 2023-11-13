import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditUserDto } from './dto';
import * as argon from "argon2"

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly userModel: Model<any>,) {}

    async changeUserPassword(
        userId: string,
        dto: EditUserDto){
        const user: DbUser = await this.userModel.findById({_id: userId})
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

        return userUpdated;
    }
}
