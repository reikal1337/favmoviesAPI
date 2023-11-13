import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") private readonly userModel: Model<any>,
        private jwt: JwtService
        ) {}

    async register(dto: AuthDto){
        try {
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

    async login(dto: AuthDto){
        const user: DbUser = await this.userModel.findOne({
            username: dto.username
        })

        if(!user) throw new ForbiddenException("Toks vartotojas neegzistuoja!")

        const validPsw = await argon.verify(user.password, dto.password)
        if(!validPsw) throw new ForbiddenException("Slaptazodis netinka!!")

        const tokenPayload = {
            id: user._id,
            username: user.username

        }

        const token = await this.jwt.signAsync(tokenPayload, {
            expiresIn: process.env.DEVELOPMENT === "true" ? "1h" : "20m",
            secret: process.env.JWT_SECRET
        })

        return { access_token: token }


    }

}
