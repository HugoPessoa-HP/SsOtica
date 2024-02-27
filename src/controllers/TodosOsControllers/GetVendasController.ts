import { Request, Response } from "express";
import { GetMuquicabaVendas_Service } from "../../services/01muquicaba/GetMuquicabaServiceVendas";

class GetVendas {
    async ex(req: Request, res: Response){

        const getMuquicaba = new GetMuquicabaVendas_Service();
        const vendasMuquicaba = await getMuquicaba.execute();
/*
        const getGuarapari = new GetVendas_Service();
        const vendasGuarapari = await getGuarapari.execute();
        
        const getExpress = new GetVendas_Service();
        const vendasExpress = await getMuquicaba.execute();
        
        const getMarcilio = new GetVendas_Service();
        const vendasMarcilio = await getMuquicaba.execute();
        
        const getShopping = new GetVendas_Service();        
        const vendasShopping = await getMuquicaba.execute();
        
        const getTerraVermelha = new GetVendas_Service();
        const vendasTerraVermelha = await getMuquicaba.execute();
        
        const getMarcilio02 = new GetVendas_Service();
        const vendasMarcilio02 = await getMuquicaba.execute();
        
        const getAeroporto = new GetVendas_Service();
        const vendasAeroporto = await getMuquicaba.execute();
        
        const getTerraVermelha02 = new GetVendas_Service();
        const vendasTerraVermelha02 = await getMuquicaba.execute();
        
        const getUlisses = new GetVendas_Service();
        const vendasUlisses = await getMuquicaba.execute();
        
        const getMarcilio03 = new GetVendas_Service();
        const vendasMarcilio03 = await getMuquicaba.execute();
        
        const getM = new GetVendas_Service();
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

        sheet.columns = [
            { header: 'nome', key: 'nome' },
            { header: 'numero', key: 'numero' },
            { header: 'email', key:'email' }
        ]

        sheet.addRow({
            nome: nomeArray[i],
            numero: numeroArray[i],
            email: emailArray[i]
        })
*/
        return res.json(vendasMuquicaba);

    }
}

export { GetVendas }