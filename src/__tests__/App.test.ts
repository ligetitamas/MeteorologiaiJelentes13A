import fs from "fs";
import Megoldas from "../Megoldas";

interface Istatisztika {
    város: string;
    középhőmérséklet: number;
    hőmérséklet_ingadozás: number;
}


describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("tavirathu13.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("Legutolsó mérés a megadott városban", async () => {
        expect(instance.LegutolsoMeres).toBe("23:45");
    });

    it("Minimum/maximum hőfok", async () => {
        expect(instance.legalacsonyabbMeres).toBe("SM 23:45 16");
        expect(instance.legmagasabbMeres).toBe("DC 13:15 35");
    });

    it("Mérések, ahol szélcsend volt", async () => {
        let tesztArray: string[] = []
        tesztArray.push("BP 1:0");
        tesztArray.push("DC 2:15");
        tesztArray.push("SN 3:15");
        tesztArray.push("BC 4:45");
        tesztArray.push("DC 4:45");
        tesztArray.push("SN 5:15");
        tesztArray.push("SN 5:45");
        tesztArray.push("KE 8:45");
        tesztArray.push("BC 11:45");
        expect(instance.szelCsend).toEqual(tesztArray);
    });

    it("Középhőmérséklet, ingadozás statisztika", async () => {
        let tesztStat: Istatisztika[] = [];
        tesztStat.push({ város:"BP", középhőmérséklet:23, hőmérséklet_ingadozás:8 });
        tesztStat.push({ város:"DC", középhőmérséklet:29, hőmérséklet_ingadozás:15 });
        tesztStat.push({ város:"SM", középhőmérséklet:22, hőmérséklet_ingadozás:8 });
        tesztStat.push({ város:"PA", középhőmérséklet:21, hőmérséklet_ingadozás:7 });
        tesztStat.push({ város:"SN", középhőmérséklet:26, hőmérséklet_ingadozás:13 });
        tesztStat.push({ város:"PR", középhőmérséklet:21, hőmérséklet_ingadozás:8 });
        tesztStat.push({ város:"BC", középhőmérséklet:-1, hőmérséklet_ingadozás:14 });
        tesztStat.push({ város:"PP", középhőmérséklet:-1, hőmérséklet_ingadozás:6 });
        tesztStat.push({ város:"KE", középhőmérséklet:-1, hőmérséklet_ingadozás:13 });
        expect(instance.Statisztika).toEqual(tesztStat);
    });
});
