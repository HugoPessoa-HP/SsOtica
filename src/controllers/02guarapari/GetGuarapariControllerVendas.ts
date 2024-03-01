import { Request, Response } from "express";
import { GetGuarapariVendas_Service } from "../../services/02guarapari/GetGuarapariServiceVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada"

class GetGuarapariControllerVendas {
    async ex(req: Request, res: Response){

        const getGuarapari = new GetGuarapariVendas_Service();
        const vendasGuarapari = await getGuarapari.execute();

        const data = await vendasGuarapari.data;
        const lengthData = data.length;
        console.log(data);
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
        await sheet.workbook.xlsx.writeFile(`02 Loja Guarapari - Relatório de Vendas - ${dataAnterior}.xlsx`);
        console.log("Relatório Criado")
        return res.json("Fim da Rota")
    }
}

export { GetGuarapariControllerVendas }