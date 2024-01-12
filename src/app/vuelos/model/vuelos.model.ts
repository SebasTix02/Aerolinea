export class Flight {
    idFlight: number;
    name: string;
    departureDate: Date;
    arrivalDate: Date;
    price: number;
    flightClass: string;
    idPlane: string;
  
    constructor(
      idFlight: number,
      name: string,
      departureDate: Date,
      arrivalDate: Date,
      price: number,
      flightClass: string,
      idPlane: string
    ) {
      this.idFlight = idFlight;
      this.name = name;
      this.departureDate = departureDate;
      this.arrivalDate = arrivalDate;
      this.price = price;
      this.flightClass = flightClass;
      this.idPlane = idPlane;
    }
  }
  