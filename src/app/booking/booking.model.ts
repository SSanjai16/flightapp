export class Booking
{
    public id: string;
    public userid : number;
    public flight : number;
    public meals : string;
    public travelclass : string;
    public tickets : number;
    public name:string;
    public amount : number;
    public dateofbooking : string;
    public validationstatus : string;
    public bookinglength:number;
    constructor(id:string,userid:number,name:string,flight:number,meals:string,travelclass:string,tickets:number,amount : number,
        dateofbooking : string,validationstatus : string,bookinglength:number )
    {
        this.id=id;
        this.userid=userid;
        this.name=name;
        this.flight=flight;
        this.meals=meals;
        this.travelclass=travelclass;
        this.tickets=tickets;
        this.amount=amount;
        this.dateofbooking=dateofbooking;
        this.validationstatus=validationstatus;
        this.bookinglength=bookinglength;
        
    }
}