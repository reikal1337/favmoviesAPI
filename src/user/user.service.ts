import { BadRequestException, ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditUserDto, UsersQuery } from './dto';
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

    async getAllUsers(dto: UsersQuery){

        const limit = 5;
        const userNumber = await this.userModel.estimatedDocumentCount()
        const pageMax = Math.ceil(userNumber / limit);
        const parsedPage = parseInt(dto.p)
        const page = parsedPage <= pageMax && parsedPage > 0 ? parsedPage : 1
        const usersToSkip = (page - 1 ) * limit

        let sortingOrderQuery = {};
        if(dto.ob === "Az"){
            sortingOrderQuery = {
                username: 1
            }
        } else if (dto.ob === "Za"){
            sortingOrderQuery = {
                username: -1
            }
        }

        let searchQuery = {}
        if(dto.paieska != undefined){
            searchQuery = {
                username: { $regex: new RegExp(dto.paieska, "i")}
            }
        }

        const allUsers = await this.userModel.find(searchQuery)
        .select("_id username")
        .limit(limit)
        .skip(usersToSkip)
        .sort(sortingOrderQuery)

        return { users: allUsers, page, pageMax }
    }

}
