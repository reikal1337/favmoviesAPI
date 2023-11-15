import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, ObjectId } from 'mongoose';
import { CreateFavMovieDto, DeleteFavMoviesDto } from './dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel("FavMovie") private readonly favMovieModel: Model<any>,
        @InjectModel("User") private readonly userModel: Model<any>) {}
        
        async getMyFavMovies( userId: string){
    
            const user = await this.userModel.findById({_id: userId})
            .populate({
                path: "favMovies",
                select: '-createdAt -updatedAt -__v',
                
            }).select("-createdAt -updatedAt -__v -password")
            console.log("geting my movies: ", user.favMovies.length)

            return user.favMovies
        }
    
        async getFavMoviesByUserId(userId: string){
            const user = await this.userModel.findById({_id: userId})
            .populate({
                path: "favMovies",
                select: '-createdAt -updatedAt -__v',
                
            }).select("-createdAt -updatedAt -__v -password")

            if(!user) throw new BadRequestException("Toks vartotojas neegzistoja!")

            return {username: user.username, movies: user.favMovies}

        }
    
        async createFavMovie(userId: string, dto: CreateFavMovieDto){
            const newFavMovie = await this.favMovieModel.create({
                ...dto,
            })

            if(!newFavMovie) throw new BadRequestException("Nepavyko sukurti naujo megstamiausio filmo!")
            
            const updatedUser = await this.userModel.findByIdAndUpdate({_id: userId},
                {
                    $push: {favMovies: newFavMovie._id}
                },{
                    new: true
                }
                ).populate({
                    path: "favMovies",
                    select: '-createdAt -updatedAt -__v',
                    
                }).select("-createdAt -updatedAt -__v -password")

                if(!updatedUser) throw new BadRequestException("Nepavyko isaugoti naujo megstamiausio filmo!")

                return { favMovies: updatedUser.favMovies}

        }
        

        async deleteFavMoviesById(userId: string, favMovies: string[], dto: DeleteFavMoviesDto){
            const usersFavMovies = favMovies.map(id => id.toString())
            
            const checkIfUsersFavMovies = dto.ids.every( id => usersFavMovies.includes(id))
            if(!checkIfUsersFavMovies) throw new  ForbiddenException("Tau nepriklauso sie filmai!")

            const delMovies = await this.favMovieModel.deleteMany({
                _id: {$in: dto.ids}
            }).exec()
            
            if(delMovies.deletedCount === 0) throw new BadRequestException("Nepavyko istrinti megstamiausiu filmu!")

            const updatedUser = await this.userModel.findByIdAndUpdate({_id: userId},
                {
                    $pull: { favMovies: {$in: dto.ids} }
                },
                {
                    new: true
                }
                ).populate({
                    path: "favMovies",
                    select: '-createdAt -updatedAt -__v',
                    
                }).select("-createdAt -updatedAt -__v -password")


            if(!updatedUser) throw new BadRequestException("Nepavyko istrinti megstamiausiu filmu!")


            return { favMovies: updatedUser.favMovies}

        }
    
}
