export class Purchase {
    idFlightPurchase: number;
    idFlightP: number;
    idUserP: string;
    statusP: string;
    constructor(idFlightPurchase: number, idFlightP: number, idUserP: string, statusP: string)
    {
        this.idFlightPurchase = idFlightPurchase
        this.idFlightP = idFlightP
        this.idUserP = idUserP
        this.statusP = statusP
    }
}