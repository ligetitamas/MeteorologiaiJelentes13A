import { resolve } from 'path';

export default class Meresek{
    protected _telepules: string;
    protected _ido: Date;
    protected _szelIrany: string;
    protected _szelErosseg: number;
    protected _homerseklet: number;

    public get Telepules(): string{
        return this._telepules;
    }
    public get Ido(): Date{
        return this._ido;
    }
    public get SzelIrany(): string{
        return this._szelIrany
    }
    public get SzelErosseg(): number{
        return this._szelErosseg;
    }
    public get Homerseklet(): number{
        return this._homerseklet;
    }


   
    constructor(sor: string) {
        const m: string[]=sor.split(" ");
        this._telepules=m[0];      
        const óra: number=parseInt(m[1].substr(0,2));
        const perc: number=parseInt(m[1].substr(2,2));
        this._ido=new Date(óra,perc);
        this._szelIrany=m[2].substr(0,3);
        this._szelErosseg=parseInt(m[2].substr(3,2));
        this._homerseklet=parseInt(m[3]);
    }
}