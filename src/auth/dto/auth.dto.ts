import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator"

export class AuthDto {
    @IsString({message: "Vartotojo vardas turi buti string!"})
    @IsNotEmpty({message: "Vartotojo vardas negali buti tuscias!"})
    @Length(4,25, {
        message: "Vartotojo vardas turi buti 4-25 ilgumo!"
    })
    username: string

    @IsString({message: "Slaptazodis turi buti string!"})
    @IsNotEmpty({message: "Slaptazodis negali buti tuscias!"})
    @Length(6, 100, {
        message: "Slaptazodis turi buti 6-100 ilgumo!"
    })
    password: string
}