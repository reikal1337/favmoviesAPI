import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, "simpleJWT"){
    constructor(@InjectModel("User") private readonly userModel: Model<any>,){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(tokenPayload: {id: string, username: string}){
        const user: DbUser = await this.userModel.findById({
            _id: tokenPayload.id
        }).lean()
        delete user.password
        return user
    }
}