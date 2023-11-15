import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { CreateFavMovieDto, DeleteFavMoviesDto } from './dto';
import { ObjectId } from 'mongoose';

@Controller('movies')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @UseGuards(AuthGuard("simpleJWT"))
    @Get()
    getMyFavMovies(
        @GetUser("_id") userId: string,
        ){
        return this.movieService.getMyFavMovies(userId)

    }

    @Get(":id")
    getFavMoviesByUserId(@Param("id") userId: string){
        return this.movieService.getFavMoviesByUserId(userId)

    }

    @UseGuards(AuthGuard("simpleJWT"))
    @Post()
    createFavMovie(
        @GetUser("_id") userId: string,
        @Body() dto: CreateFavMovieDto,
        ){
            return this.movieService.createFavMovie(userId, dto)
    }

    @UseGuards(AuthGuard("simpleJWT"))
    @Delete()
    deleteFavMoviesById(
        @GetUser("_id") userId: string,
        @GetUser("favMovies") favMovies: string[],
        @Body() dto: DeleteFavMoviesDto,
    ){
        return this.movieService.deleteFavMoviesById(userId, favMovies, dto)
    }
}
