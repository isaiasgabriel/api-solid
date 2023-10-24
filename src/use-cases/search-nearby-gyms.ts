import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Gym } from "@prisma/client";

interface SearchNearbyGymsUseCaseRequest{
    userLatitude: number
    userLongitude: number
}
interface SearchNearbyGymsUseCaseResponse{
    gyms: Gym[]
}

export class SearchNearbyGymsUseCase{
    constructor(private gymRepository:InMemoryGymsRepository)

    run({
        userLatitude,
        userLongitude,
    }:SearchNearbyGymsUseCaseRequest ) : Promise <SearchNearbyGymsUseCaseResponse> {

    }
}