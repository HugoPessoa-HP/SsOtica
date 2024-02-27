import { Request, Response } from "express";
import { GetLaranjeiras03Vendas_Service } from "../../services/30laranjeiras3/GetLaranjeiras03ServiceVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetLaranjeiras03ControllerVendas {
    async ex(req: Request, res: Response){

        const getLaranjeiras03 = new GetLaranjeiras03Vendas_Service();
        const vendas = await getLaranjeiras03.execute();
        
        const data = await vendas.data;
        const lengthData = data.length;

        // Criação da Planilha
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatorio')

        sheet.columns = [
            { header: 'nome', key: 'nome' },
            { header: 'numero', key: 'numero' },
            { header: 'email', key:'email' }
        ]

        var nomeArray = [];
        var numeroArray = [];
        var emailArray = [];

        for(let i = 0; i < lengthData; i++){
            var nomeV = await data[i].cliente.nome;
            nomeV = await JSON.stringify(nomeV);
            await nomeArray.push(nomeV);

            var numeroV = await data[i].cliente.telefones;
            var values = await Object.values(numeroV[0]);
            numeroV = await JSON.stringify(values);
            numeroV = await numeroV.replace(/\D/g,'');
            await numeroArray.push(numeroV);

            var emailV = await data[i].valor_liquido;
            emailV = await JSON.stringify(emailV);
            await emailArray.push(emailV);

            sheet.addRow({
                nome: nomeArray[i],
                numero: numeroArray[i],
                email: emailArray[i]
            })

        }

        const dataAnterior = await dataAtualizada();
        sheet.workbook.xlsx.writeFile(`21 Loja Laranjeiras 3 - Relatório de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatório Criado")
        return res.json("Fim da Rota");
    }
}

export { GetLaranjeiras03ControllerVendas }