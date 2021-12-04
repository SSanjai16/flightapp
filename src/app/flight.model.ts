export class Flight
{
    public id : string;
    public flightnumber: number;
    public businessclass : number;
    public economyclass : number;
    public source : string;
    public destination : string;
    public daysoftravel  : string;
    constructor(id : string , flightnumber : number , businessclass : number, economyclass : number , source : string , destination : string, daysoftravel : string)
    {
        this.id=id;
        this.flightnumber=flightnumber;
        this.businessclass=businessclass;
        this.economyclass=economyclass;
        this.source = source;
        this.destination=destination;
        this.daysoftravel=daysoftravel;
    }
}
