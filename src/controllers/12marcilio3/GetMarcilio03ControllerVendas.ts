import { Request, Response } from "express";
import { GetMarcilio03Vendas_Service } from "../../services/12marcilio3/GetMarcilio03ServiceVendas"; 
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetMarcilio03ControllerVendas {
    async ex(req: Request, res: Response){

        const getMarcilio = new GetMarcilio03Vendas_Service();
        const vendasMarcilio = await getMarcilio.execute();
        
        const data = await vendasMarcilio.data;
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
        sheet.workbook.xlsx.writeFile(`12 Loja Marcilio 3 - Relatório de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatório Criado")
        return res.json("Fim de Rota");
    }
}

export { GetMarcilio03ControllerVendas }