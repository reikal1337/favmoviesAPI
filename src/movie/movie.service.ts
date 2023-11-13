import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
    constructor(@InjectModel("Movie") private readonly movieModel: Model<any>,) {}
        
        getMyMovies(){
    
        }
    
        getMoviesByUserId(){
    
        }
    
        createMovie(){
    
        }
    
        deleteMovieById(){
            
        }
    
}
