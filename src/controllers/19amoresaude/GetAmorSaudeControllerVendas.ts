import { Request, Response } from "express";
import { GetAmoresSaudeVendas_Service } from "../../services/19amoresaude/GetAmoresSaudeServiceVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetAmoresSaudeControllerVendas {
    async ex(req: Request, res: Response){

        const getAmorSaude = new GetAmoresSaudeVendas_Service();
        const vendas = await getAmorSaude.execute();
        
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

        const dataAnterior = await dataAtualizada
        sheet.workbook.xlsx.writeFile(`19 Loja Amor e Saude - Relatório de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatório Criado")
        return res.json("Fim da Rota");
    }
}

export { GetAmoresSaudeControllerVendas }