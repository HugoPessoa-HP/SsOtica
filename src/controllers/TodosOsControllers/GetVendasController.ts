import { Request, Response } from "express";
import { GetMuquicabaVendas_Service } from "../../services/01muquicaba/GetMuquicabaServiceVendas";
/*
class GetVendas {
    async ex(req: Request, res: Response){

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

        return res.json(vendasMuquicaba);

    }
}

export { GetVendas }
*/