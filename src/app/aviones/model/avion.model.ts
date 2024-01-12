export class Plane {
    idPlane: string;
    airlineName: string;
    capacity: number;
    availableSeats: number;
    constructor(idPlane: string, airlineName: string, capacity: number, availableSeats: number)
    {
        this.idPlane = idPlane
        this.airlineName = airlineName
        this.capacity = capacity
        this.availableSeats = availableSeats
    }
}