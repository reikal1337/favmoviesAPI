type DbUser = {
    _id: string,
    username: string,
    password: string,
    favMovies: [],
    updatedAt?: string,
    createdAt?: string,
    __v?: number,
}

type SafeUser = Omit<DbUser, "password"> 