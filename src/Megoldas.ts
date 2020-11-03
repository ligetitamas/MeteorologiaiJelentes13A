import fs from "fs";
import Meresek from "./Meresek";

export default class Megoldás{
    private _meresAdatok: Meresek[]=[];  


   
    constructor(forrás: string) {
        fs.readFileSync(forrás).toString().split("\n").forEach(i=>{
            const aktSor:string=i.trim();
            this._meresAdatok.push(new Meresek(aktSor));
        });        
        
    }
}