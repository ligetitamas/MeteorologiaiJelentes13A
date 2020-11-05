﻿import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from './Megoldas';

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        let bekértVáros: string = params.város as string;
        const megold: Megoldás = new Megoldás("./tavirathu13.txt");
        //2. feladat
        res.write(`2. feladat: Adja meg egy város kódját: <input type='text' name="város" onChange='this.form.submit();'>`);

        res.write("</br>");
        //3. feladat
        res.write(`3. feladat:\nA legalacsonyabb hőmérséklet: ${megold.legalacsonyabbMeres} fok\nA legmagasabb hőmérséklet: ${megold.legalacsonyabbMeres} fok`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
