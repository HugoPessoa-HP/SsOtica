import { Request, Response } from "express";
import { GetSerraVendas_Service } from "../../services/26serra/GetSerraServiceVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetSerraControllerVendas {
    async ex(req: Request, res: Response){

        const getSerra = new GetSerraVendas_Service();
        const vendas = await getSerra.execute();
        
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

            const numero = await data[i].cliente.telefones;
            if((numero === null) || (numero === undefined)){
                var valorNumero = await JSON.stringify(numero);
                var numeroFinal = "Não informou numero";
            } else {
                //console.log("Estou aqui")
                var primeiroNumero = numero[0]
                var valorNumero = JSON.stringify(primeiroNumero);
                var numeroFinal = valorNumero.replace(/\D/g, '');
            }
            
            await numeroArray.push(numeroFinal);

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
        sheet.workbook.xlsx.writeFile(`26 Loja Serra - Relatório de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatório Criado")
        return res.json("Fim da Rota");
    }
}

export { GetSerraControllerVendas }