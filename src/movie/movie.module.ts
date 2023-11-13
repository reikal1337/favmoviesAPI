import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import movieSchema from 'db/schemas/Movie';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Movie",
        schema: movieSchema,
      },
    ]),
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
