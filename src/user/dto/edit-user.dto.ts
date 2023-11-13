import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator"

export class EditUserDto {

    @IsString({message: "Slaptazodis turi buti string!"})
    @IsNotEmpty({message: "Slaptazodis negali buti tuscias!"})
    @Length(4,25, {
        message: "Slaptazodis turi buti 6-25 ilgumo!"
    })
    password: string

    @IsString({message: "Slaptazodis turi buti string!"})
    @IsNotEmpty({message: "Slaptazodis negali buti tuscias!"})
    @Length(4,25, {
        message: "Slaptazodis turi buti 6-25 ilgumo!"
    })
    oldPassword: string
}