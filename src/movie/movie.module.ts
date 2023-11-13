import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import favMovieSchema from 'db/schemas/FavMovie';
import userSchema from 'db/schemas/User';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "FavMovie",
        schema: favMovieSchema,
      },
      {
        name: "User",
        schema: userSchema,
      },
    ]),
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
