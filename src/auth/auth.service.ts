import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(@InjectModel("User") private readonly userModel: Model<any>) {}

    async register(dto: AuthDto){
        try {
            // const userExists = this.userModel.find({ username: dto.username })
            // if(userExists) throw new ForbiddenException("Toks vartotojas jau egzistuoja!")

            const hashedPsw = await argon.hash(dto.password)
            const newUser = await this.userModel.create({
                username: dto.username,
                password: hashedPsw,
            })
            const userObj = newUser.toObject()
            delete userObj.password
            delete userObj.updatedAt
            delete userObj.createdAt
            delete userObj.__v

            return userObj

        } catch (error) {
            if(error.code === 11000){
                throw new ForbiddenException("Toks vartotojas jau egzistuoja!")
            }
            console.error(error)
            
            throw new InternalServerErrorException("Nepavyko sukurti naujo vartotojo!")
        }
    }

    login(dto: AuthDto){
        
    }

}
