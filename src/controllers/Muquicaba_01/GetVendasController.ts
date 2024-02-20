import { Request, Response } from "express";
import { GetVendasMuquicaba_Service } from "../../services/Muquicaba_01/GetVendasService";

class GetVendasMuquicaba {
    async ex(req: Request, res: Response){

        const getVendas = new GetVendasMuquicaba_Service();
        const vendas = await getVendas.execute();

        return res.json(vendas);

    }
}

export { GetVendasMuquicaba }