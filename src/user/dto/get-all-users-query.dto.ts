import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator"

export class UsersQuery {
    @IsOptional()
    @IsString({message: "Puslapis turi buti string!"})
    p: string

    @IsOptional()
    @IsString({message: "Paieska turi buti string!"})
    paieska: string

    @IsOptional()
    @IsString({message: "Nuo iki turi buti string, arba Az arba Za!"})
    ob: string


}