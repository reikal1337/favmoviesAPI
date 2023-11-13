import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateFavMovieDto {

    @IsString({message: "Filmo pavadinimas turi buti string!"})
    @IsNotEmpty({message: "Filmo pavadinimas negali buti tuscias!"})
    @Length(1, 100, {
        message: "Filmo Pavadinimas turi buti 1-100 ilgumo!"
    })
    title: string

    @IsString({message: "Paveksliuko url turi buti string!"})
    @IsNotEmpty({message: "Paveksliuko url negali buti tuscias!"})
    @Length(5, 200, {
        message: "Paveksliuko url turi buti 5-200 ilgumo!"
    })
    imageURL: string

    @IsOptional()
    @IsString({message: "IMDb url turi buti string!"})
    @IsNotEmpty({message: "IMDb url negali buti tuscias!"})
    @Length(5, 200, {
        message: "IMDb url turi buti 5-200 ilgumo!"
    })
    imdbURL?: string

    @IsOptional()
    @IsString({message: "Aprasymas turi buti string!"})
    @IsNotEmpty({message: "Aprasymas negali buti tuscias!"})
    @Length(1, 250, {
        message: "Aprasymas turi buti 5-250 ilgumo!"
    })
    description?: string
}