import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @UseGuards(AuthGuard("simpleJWT"))
    @Get()
    getMyMovies(){

    }

    @Get(":id")
    getMoviesByUserId(){

    }

    @Post(":id")
    createMovie(){

    }

    @Delete(":id")
    deleteMovieById(){

    }
}
