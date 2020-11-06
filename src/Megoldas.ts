import fs from "fs";
import { Http2ServerRequest } from 'http2';
import { resolve } from 'path';
import Meresek from "./Meresek";

interface Istatisztika {
    város: string;
    középhőmérséklet: number;
    hőmérséklet_ingadozás: number;
}
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

    public LegutolsoMeres(bekértVáros:string):any{
        let meres:Date=new Date;
        meres.setHours(0);
        meres.setMinutes(0);
        this._meresAdatok.forEach(x => {
            if(bekértVáros==x.Telepules&&x.Ido>meres)
            {
                meres.setHours(x.Ido.getHours());
                meres.setMinutes(x.Ido.getMinutes());
            }
        });
        return `${meres.getHours()}:${meres.getMinutes()}`;
        
    }

    public get szelCsend(): string[] {
        let szelCsendMeresek: string[] = [];
        this._meresAdatok.forEach(i => {
            if (i.SzelErosseg == "00" && i.SzelIrany == "000") {
                szelCsendMeresek.push(`${i.Telepules} ${i.Ido.getHours()}:${i.Ido.getMinutes()}`);
            }
        });
        return szelCsendMeresek;
    }
    public get Statisztika(): Istatisztika[] {       
        let statisztikák: Istatisztika[] = [];
        this._meresAdatok.forEach(x => {
            let teszt: boolean = false;
            statisztikák.forEach(elem => {
                if (elem.város == x.Telepules) {
                    teszt = true;
                }
            });
            if (teszt == false) {
                statisztikák.push({ város: `${x.Telepules}`, középhőmérséklet: 0, hőmérséklet_ingadozás: 0 });
            }
        });

        statisztikák.forEach(x => {
            let max: number = -1;
            let min: number = 1000;
            let kozep: number = 0;
            let sum: number = 0;
            let hours: number[] = [];
            this._meresAdatok.forEach(y => {
                if (x.város == y.Telepules) {

                    if ([1, 7, 13, 19].includes(y.Ido.getHours())) {
                        hours.push(y.Ido.getHours());
                        kozep++;
                        sum += y.Homerseklet;
                    }
                    if (y.Homerseklet > max) max = y.Homerseklet;
                    if (y.Homerseklet < min) min = y.Homerseklet;
                }
            });
            x.hőmérséklet_ingadozás = max - min;
            if (hours.includes(1) && hours.includes(7) && hours.includes(13) && hours.includes(19)) {
                x.középhőmérséklet = Math.round((sum / kozep));
            }
            else {
                x.középhőmérséklet = -1;
            }
        });
        return statisztikák;
    }

    public Fájlbaír():void{
        this.Statisztika.forEach(x => {
            let kiir:string=`${x.város}\n`;
            this._meresAdatok.forEach(y => {
                if(y.Telepules==x.város)
                {
                    kiir+=`${y.Ido.getHours()}:${y.Ido.getMinutes()} `
                    for (let i = 0; i < parseInt(y.SzelErosseg); i++)
                    {
                        kiir+="#";
                    }
                    kiir+="\n";
                }
            });
            fs.writeFileSync(`${x.város}.txt`,kiir)         
        });


    }





    constructor(forrás: string) {
        fs.readFileSync(forrás).toString().split("\n").forEach(i => {
            const aktSor: string = i.trim();
            if (aktSor !== "") this._meresAdatok.push(new Meresek(aktSor));
        });

    }
}