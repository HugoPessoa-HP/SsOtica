import { Request, Response } from "express";
import { GetMuquicabaVendas_Service } from "../../services/01muquicaba/GetMuquicabaServiceVendas";

class GetVendasMuquicabaService {
    async ex(req: Request, res: Response){

        const getMuquicaba = new GetMuquicabaVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();


    }
}

export { GetVendasMuquicabaService }