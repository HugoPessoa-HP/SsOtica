import { Request, Response } from "express";
import { GetVendas_Service } from "../../services/Muquicaba_01/GetVendasService";

class GetVendas {
    async ex(req: Request, res: Response){

        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();        
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
        const getMuquicaba = new GetVendas_Service();

        

        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatorio')

        return res.json(vendasMuquicaba);

    }
}

export { GetVendas }