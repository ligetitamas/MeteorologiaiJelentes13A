import fs from "fs";
import Meresek from "./Meresek";

export default class Megoldás {
    private _meresAdatok: Meresek[] = [];


    public get legalacsonyabbMeres(): string {
        let meres: number = 100;
        let varos: string = "";
        let ido: Date = new Date;
        this._meresAdatok.forEach(i => {
            if (i.Homerseklet < meres) {
                meres = i.Homerseklet;
                varos = i.Telepules;
                ido = i.Ido;
            }
        });
        return `${varos} ${ido.getHours()}:${ido.getMinutes()} ${meres}`;
    }
    public get legmagasabbMeres(): string {
        let meres: number = 0;
        let varos: string = "";
        let ido: Date = new Date;
        this._meresAdatok.forEach(i => {
            if (i.Homerseklet > meres) {
                meres = i.Homerseklet;
                varos = i.Telepules;
                ido = i.Ido;
            }
        });
        return `${varos} ${ido.getHours()}:${ido.getMinutes()} ${meres}`;
    }
    public get szelCsend():string{
        let szelCsendMeresek:string[]=[];
        this._meresAdatok.forEach(i => {
            if(i.SzelErosseg=="000" && i.SzelIrany=="00")
            {
                szelCsendMeresek.push(`${i.}`);
            }
            
        });
    }





    constructor(forrás: string) {
        fs.readFileSync(forrás).toString().split("\n").forEach(i => {
            const aktSor: string = i.trim();
            if (aktSor !== "") this._meresAdatok.push(new Meresek(aktSor));
        });

    }
}