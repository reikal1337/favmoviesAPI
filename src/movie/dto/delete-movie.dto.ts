import { ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsArray } from "class-validator"

export class DeleteFavMoviesDto {

    @IsArray({message: "Istrinami filmu id turi buti array!"})
    @ArrayNotEmpty({message: "Filmo pavadinimas negali buti tuscias!"})
    @ArrayMinSize(1,{
        message: "Kad istrinti turi buti bent 1 Id!"
    })
    @ArrayUnique({message: "Ids negali kartotis!"})
    
    ids: string[]

}