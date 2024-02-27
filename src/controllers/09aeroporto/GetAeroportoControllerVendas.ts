import { Request, Response } from "express";
import { GetAeroportoVendas_Service } from "../../services/09aeroporto/GetAeroportoServiceVendas"; 
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetAeroportoControllerVendas {
    async ex(req: Request, res: Response){

        const getAeroporto = new GetAeroportoVendas_Service();
        const vendasAeroporto = await getAeroporto.execute();
        
        const data = await vendasAeroporto.data;
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
            var valorInteiro = await numeroV[0];
            valorInteiro = await JSON.stringify(valorInteiro);
            const valor = await valorInteiro.replace(/\D/g,'');
            await numeroArray.push(valor);

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
        sheet.workbook.xlsx.writeFile(`09 Loja Aeroporto - Relatório de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatorio-Criado")
        return res.json("Fim da Rota");
    }
}

export { GetAeroportoControllerVendas }