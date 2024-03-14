"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server/server.ts
var import_express2 = __toESM(require("express"));

// src/routes.ts
var import_express = require("express");

// src/API.ts
var import_axios = __toESM(require("axios"));
var token = process.env.TOKEN;
var tokenV = JSON.stringify(token);
var api = import_axios.default.create({
  baseURL: "https://app.ssotica.com.br/api/v1/integracoes/vendas/periodo?cnpj=",
  headers: {
    "Authorization": `Bearer KyhmIwwbbttTtiTynlrPKkyla0wOWxNDKBuqBbgka3xGTdOsniwagsqVIISi`
  }
});

// src/VendasFuncoes/dataAtualizada.ts
var import_moment = __toESM(require("moment"));
function dataAtualizada() {
  return __async(this, null, function* () {
    let dataAtual = /* @__PURE__ */ new Date();
    if (dataAtual.getDay() == 1) {
      const dataAnterior = yield (0, import_moment.default)().subtract(3, "days").format("YYYY-MM-DD");
      return dataAnterior;
    } else {
      const dataAnterior = yield (0, import_moment.default)().subtract(1, "days").format("YYYY-MM-DD");
      return dataAnterior;
    }
  });
}
var dataAtualizada_default = dataAtualizada;

// src/services/01muquicaba/GetMuquicabaServiceVendas.ts
var GetMuquicabaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000918&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/01muquicaba/GetMuquicabaControllerVendas.ts
var GetMuquicabaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMuquicaba = new GetMuquicabaVendas_Service();
      const vendasMuquicaba = yield getMuquicaba.execute();
      const data = yield vendasMuquicaba.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`01 Loja Muqui\xE7aba - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/02guarapari/GetGuarapariServiceVendas.ts
var GetGuarapariVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000837&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/02guarapari/GetGuarapariControllerVendas.ts
var GetGuarapariControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getGuarapari = new GetGuarapariVendas_Service();
      const vendasGuarapari = yield getGuarapari.execute();
      const data = yield vendasGuarapari.data;
      const lengthData = data.length;
      console.log(data);
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      yield sheet.workbook.xlsx.writeFile(`02 Loja Guarapari - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/03express/GetExpressServiceVendas.ts
var GetExpressVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000594&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/03express/GetExpressControllerVendas.ts
var GetExpressControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getExpress = new GetExpressVendas_Service();
      const vendasExpress = yield getExpress.execute();
      const data = yield vendasExpress.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`03 Loja Express - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/05marcilio/GetMarcilioServiceVendas.ts
var GetMarcilioVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001566&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/05marcilio/GetMarcilioControllerVendas.ts
var GetMarcilioControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMarcilio = new GetMarcilioVendas_Service();
      const vendasMarcilio = yield getMarcilio.execute();
      const data = yield vendasMarcilio.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`05 Loja Marc\xEDlio - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim de Rota");
    });
  }
};

// src/services/06shopping/GetShoppingServiceVendas.ts
var GetShoppingVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001302&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/06shopping/GetShoppingControllerVendas.ts
var GetShoppingControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getShopping = new GetShoppingVendas_Service();
      const vendasShopping = yield getShopping.execute();
      const data = yield vendasShopping.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`06 Loja Shopping - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/07terravermelha/GetTerraVermelhaServiceVendas.ts
var GetTerraVermelhaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`40248658000131&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/07terravermelha/GetTerraVermelhaControllerVendas.ts
var GetTerraVermelhaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getTerraVermelha = new GetTerraVermelhaVendas_Service();
      const vendasTerraVermelha = yield getTerraVermelha.execute();
      const data = yield vendasTerraVermelha.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`07 Loja Terra Vermelha - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/11ulisses/GetUlissesServiceVendas.ts
var GetUlissesVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`40926713000103&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/11ulisses/GetUlissesControllerVendas.ts
var GetUlissesControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getUlisses = new GetUlissesVendas_Service();
      const vendasUlisses = yield getUlisses.execute();
      const data = yield vendasUlisses.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`11 Loja Ulisses - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim de Rota");
    });
  }
};

// src/services/08marcilio2/GetMarcilio2ServiceVendas.ts
var GetMarcilio02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001485&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/08marcilio2/GetMarcilio02ControllerVendas.ts
var GetMarcilio02ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMarcilio = new GetMarcilio02Vendas_Service();
      const vendasMarcilio = yield getMarcilio.execute();
      const data = yield vendasMarcilio.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`08 Loja Marcilio02 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/09aeroporto/GetAeroportoServiceVendas.ts
var GetAeroportoVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001051&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/09aeroporto/GetAeroportoControllerVendas.ts
var GetAeroportoControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getAeroporto = new GetAeroportoVendas_Service();
      const vendasAeroporto = yield getAeroporto.execute();
      const data = yield vendasAeroporto.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`09 Loja Aeroporto - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/10terravermelha2/GetTerraVermelha02ServiceVendas.ts
var GetTerraVermelha02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`66286213000130&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/10terravermelha2/GetTerraVermelha02ControllerVendas.ts
var GetTerraVermelha02ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getTerraVermelha = new GetTerraVermelha02Vendas_Service();
      const vendasTerraVermelha = yield getTerraVermelha.execute();
      const data = yield vendasTerraVermelha.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`10 Loja Terra Vermelha 2 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio-Criado");
      return res.json("Fim de Rota");
    });
  }
};

// src/services/12marcilio3/GetMarcilio03ServiceVendas.ts
var GetMarcilio03Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001728&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/12marcilio3/GetMarcilio03ControllerVendas.ts
var GetMarcilio03ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMarcilio = new GetMarcilio03Vendas_Service();
      const vendasMarcilio = yield getMarcilio.execute();
      const data = yield vendasMarcilio.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`12 Loja Marcilio 3 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim de Rota");
    });
  }
};

// src/services/13barramares/GetBarramaresServiceVendas.ts
var GetBarraMaresVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`42816990000180&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/13barramares/GetBarraMaresControllerVendas.ts
var GetBarraMaresControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getBarraMares = new GetBarraMaresVendas_Service();
      const vendasBarraMares = yield getBarraMares.execute();
      const data = yield vendasBarraMares.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`13 Loja Barra Mares - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim de Rota");
    });
  }
};

// src/services/14matriz/GetMatrizServiceVendas.ts
var GetMatrizVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000160&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/14matriz/GetMatrizControllerVendas.ts
var GetMatrizControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMatriz = new GetMatrizVendas_Service();
      const vendasMatriz = yield getMatriz.execute();
      const data = yield vendasMatriz.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`14 Loja Matriz - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/15soteco/GetSotecoServiceVendas.ts
var GetSotecoVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`43229630000145&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/15soteco/GetSotecoControllerVendas.ts
var GetSotecoControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getSoteco = new GetSotecoVendas_Service();
      const vendasSoteco = yield getSoteco.execute();
      const data = yield vendasSoteco.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`15 Loja Soteco - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/16santamonica/GetSantaMonicaServiceVendas.ts
var GetSantaMonicaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44448029000106&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/16santamonica/GetSantaMonicaControllerVendas.ts
var GetSantaMonicaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getSantaMonica = new GetSantaMonicaVendas_Service();
      const vendasSantaMonica = yield getSantaMonica.execute();
      const data = yield vendasSantaMonica.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`16 Loja Santa Monica - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/17centrovilavelha/GetCentroVilaVelhaServiceVendas.ts
var GetCentroVilaVelhaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`43687134000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/17centrovilavelha/GetCentroVilaVelhaControllerVendas.ts
var GetCentroVilaVelhaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getCentro = new GetCentroVilaVelhaVendas_Service();
      const vendasCentro = yield getCentro.execute();
      const data = yield vendasCentro.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`17 Loja Centro Vila Velha - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/18itapua1/GetItapuaServiceVendas.ts
var GetItapuaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001809&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/18itapua1/GetItapuaControllerVendas.ts
var GetItapuaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getItapua = new GetItapuaVendas_Service();
      const vendasItapua = yield getItapua.execute();
      const data = yield vendasItapua.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`18 Loja Itapu\xE3 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/19amoresaude/GetAmoresSaudeServiceVendas.ts
var GetAmoresSaudeVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/19amoresaude/GetAmorSaudeControllerVendas.ts
var GetAmoresSaudeControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getAmorSaude = new GetAmoresSaudeVendas_Service();
      const vendas = yield getAmorSaude.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`19 Loja Amor e Saude - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/20castanheiras/GetCastanheirasServiceVendas.ts
var GetCastanheirasVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000756&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/20castanheiras/GetCastanheirasControllerVendas.ts
var GetCastanheirasControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      console.log("cheguei");
      const getCastanheiras = new GetCastanheirasVendas_Service();
      const vendas = yield getCastanheiras.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`20 Loja Castanheiras - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/21itapua2/GetItapua02ServiceVendas.ts
var GetItapua02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`48019477000145&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/21itapua2/GetItapua02ControllerVendas.ts
var GetItapua02ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getItapua02 = new GetItapua02Vendas_Service();
      const vendas = yield getItapua02.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`21 Loja Itapu\xE3 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/22serra1/GetSerra01ServiceVendas.ts
var GetSerra01Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000403&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/22serra1/GetSerra01ControllerVendas.ts
var GetSerra01ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getSerra01 = new GetSerra01Vendas_Service();
      const vendas = yield getSerra01.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`22 Loja Serra 1 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/23serra2/GetSerra02ServiceVendas.ts
var GetSerra02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000675&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/23serra2/GetSerra02ControllerVendas.ts
var GetSerra02ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getSerra02 = new GetSerra02Vendas_Service();
      const vendas = yield getSerra02.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`23 Loja Serra 2 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/24laranjeiras/GetLaranjeirasServiceVendas.ts
var GetLaranjeirasVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000322&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/24laranjeiras/GetLaranjeirasControllerVendas.ts
var GetLaranjeirasControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getLaranjeiras = new GetLaranjeirasVendas_Service();
      const vendas = yield getLaranjeiras.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`24 Loja Laranjeiras - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/25terravermelha3/GetTerraVermelha03ServiceVendas.ts
var GetTerraVermelha03Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`89982746000151&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/25terravermelha3/GetTerraVermelha03ControllerVendas.ts
var GetTerraVermelha03ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getTerraVermelha03 = new GetTerraVermelha03Vendas_Service();
      const vendas = yield getTerraVermelha03.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`25 Loja Terra Vermelha 3 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/26serra/GetSerraServiceVendas.ts
var GetSerraVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899000241&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/26serra/GetSerraControllerVendas.ts
var GetSerraControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getSerra = new GetSerraVendas_Service();
      const vendas = yield getSerra.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`26 Loja Serra - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/27quatropistas/GetQuatroPistasServiceVendas.ts
var Get04PistasVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001213&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/27quatropistas/GetQuatroPistasControllerVendas.ts
var GetQuatroPistasControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getQuatroPistas = new Get04PistasVendas_Service();
      const vendas = yield getQuatroPistas.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`27 Loja Quatro Pistas - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/28/GetLoja28ServiceVendas.ts
var GetLoja28Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001647&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/28/GetLoja28ControllerVendas.ts
var GetLoja28ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getLoja28 = new GetLoja28Vendas_Service();
      const vendas = yield getLoja28.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`28 Loja - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/29mercadao/GetMercadaoServiceVendas.ts
var GetMercadaoVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44447899001132&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/29mercadao/GetMercadaoControllerVendas.ts
var GetMercadaoControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getMercadao = new GetMercadaoVendas_Service();
      const vendas = yield getMercadao.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`29 Loja Mercad\xE3o - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/30laranjeiras3/GetLaranjeiras03ServiceVendas.ts
var GetLaranjeiras03Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`83214449000180&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/30laranjeiras3/GetLaranjeiras03ControllerVendas.ts
var GetLaranjeiras03ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getLaranjeiras03 = new GetLaranjeiras03Vendas_Service();
      const vendas = yield getLaranjeiras03.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`21 Loja Laranjeiras 3 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/31cariacica/GetCariacicaServiceVendas.ts
var GetCariacicaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`82677480000194&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/31cariacica/GetCariacicaControllerVendas.ts
var GetCariacicaControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getCariacica = new GetCariacicaVendas_Service();
      const vendas = yield getCariacica.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`31 Loja Cariacica - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/32alegriacard/GetAlegriaCardServiceVendas.ts
var GetAlegriaCardVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`29132921000190&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/32alegriacard/GetAlegriaCardControllerVendas.ts
var GetAlegriaCardControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getAlegriaCard = new GetAlegriaCardVendas_Service();
      const vendas = yield getAlegriaCard.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`32 Loja Alegria Card - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/33cariacica2/GetCariacica02ServiceVendas.ts
var GetCariacica02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`03034259000141&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/33cariacica2/GetCariacica02ControllerVendas.ts
var GetCariacica02ControllerVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getCariacica02 = new GetCariacica02Vendas_Service();
      const vendas = yield getCariacica02.execute();
      const data = yield vendas.data;
      const lengthData = data.length;
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (let i = 0; i < lengthData; i++) {
        var nomeV = yield data[i].cliente.nome;
        nomeV = yield JSON.stringify(nomeV);
        yield nomeArray.push(nomeV);
        const numero = yield data[i].cliente.telefones;
        if (numero === null || numero === void 0) {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
        } else {
          var primeiroNumero = numero[0];
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        }
        yield numeroArray.push(numeroFinal);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`33 Loja Cariacica 2 - Relat\xF3rio de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json("Fim da Rota");
    });
  }
};

// src/services/TodosOsServices/GetVendas.ts
var GetVendasService = class {
  execute(lojaCNPJ) {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`${lojaCNPJ}&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/TodosOsControllers/GetVendasController.ts
var GetGeralVendas = class {
  ex(req, res) {
    return __async(this, null, function* () {
      console.log("Estou Aqui");
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      sheet.columns = [
        { header: "nome", key: "nome" },
        { header: "numero", key: "numero" },
        { header: "email", key: "email" }
      ];
      const arrayCNPJ = [
        "44447899000918",
        "44447899000837",
        "44447899000594",
        "44447899001566",
        "44447899001302",
        "40248658000131",
        "44447899001485",
        "44447899001051",
        "66286213000130",
        "40926713000103",
        "44447899001728",
        "44447899000160",
        "43229630000145",
        "44447899001809",
        "44690704000109",
        "44447899000756",
        "48019477000145",
        "44447899000403",
        "44447899000675",
        "44447899000322",
        "89982746000151",
        "44447899000241",
        "44447899001213",
        "44447899001647",
        "44447899001132",
        "83214449000180",
        "82677480000194",
        "29132921000190",
        "48940172000171",
        "74449580000135",
        "03034259000141"
      ];
      const arraylength = arrayCNPJ.length;
      var i, j;
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (i = 0; i < arraylength; i++) {
        const getVendas = new GetVendasService();
        const vendas = yield getVendas.execute(arrayCNPJ[0]);
        const data = yield vendas.data;
        const lengthData = data.length;
        for (let j2 = 0; j2 < lengthData; j2++) {
          const nome = yield data[i].cliente.nome;
          if (nome === null || nome === void 0) {
            var nomeFinal = "N\xE3o informou nome";
          } else {
            var nomeFinal = JSON.stringify(nome);
          }
          yield nomeArray.push(nomeFinal);
          console.log(nomeFinal);
          const numero = yield data[i].cliente.telefones;
          if (numero === null || numero === void 0) {
            var numeroFinal = "N\xE3o informou n\xFAmero";
          } else {
            var primeiroNumero = numero[0];
            var valorNumero = JSON.stringify(primeiroNumero);
            var numeroFinal = valorNumero.replace(/\D/g, "");
          }
          yield numeroArray.push(numeroFinal);
          console.log(numeroFinal);
          const email = yield data[i].valor_liquido;
          if (email === null || email === void 0) {
            var emailFinal = "N\xE3o informou email";
          } else {
            var emailFinal = yield JSON.stringify(email);
          }
          yield emailArray.push(emailFinal);
          console.log(emailFinal);
          sheet.addRow({
            nome: nomeArray[i],
            numero: numeroArray[i],
            email: emailArray[i]
          });
        }
      }
      const dataAnterior = yield dataAtualizada_default();
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio Geral de Vendas - ${dataAnterior}.xlsx`);
      console.log("Relatorio Criado");
      return res.json("Fim da Rota!");
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/vendasMuquicaba", new GetMuquicabaControllerVendas().ex);
router.get("/vendasGuarapari", new GetGuarapariControllerVendas().ex);
router.get("/vendasExpress", new GetExpressControllerVendas().ex);
router.get("/vendasMarcilio", new GetMarcilioControllerVendas().ex);
router.get("/vendasShopping", new GetShoppingControllerVendas().ex);
router.get("/vendasTerraVermelha", new GetTerraVermelhaControllerVendas().ex);
router.get("/vendasMarcilio02", new GetMarcilio02ControllerVendas().ex);
router.get("/vendasAeroporto", new GetAeroportoControllerVendas().ex);
router.get("/vendasTerraVermelha02", new GetTerraVermelha02ControllerVendas().ex);
router.get("/vendasUlisses", new GetUlissesControllerVendas().ex);
router.get("/vendasMarcilio03", new GetMarcilio03ControllerVendas().ex);
router.get("/vendasBarraMares", new GetBarraMaresControllerVendas().ex);
router.get("/vendasMatriz", new GetMatrizControllerVendas().ex);
router.get("/vendasSoteco", new GetSotecoControllerVendas().ex);
router.get("vendasSantaMonica", new GetSantaMonicaControllerVendas().ex);
router.get("/vendasCentroVilaVelha", new GetCentroVilaVelhaControllerVendas().ex);
router.get("/vendasItapua1", new GetItapuaControllerVendas().ex);
router.get("/vendasAmorSaude", new GetAmoresSaudeControllerVendas().ex);
router.get("/vendasCastanheiras", new GetCastanheirasControllerVendas().ex);
router.get("/vendasItapua02", new GetItapua02ControllerVendas().ex);
router.get("/vendasSerra01", new GetSerra01ControllerVendas().ex);
router.get("/vendasSerra02", new GetSerra02ControllerVendas().ex);
router.get("/vendasLaranjeiras", new GetLaranjeirasControllerVendas().ex);
router.get("/vendasTerraVermelha03", new GetTerraVermelha03ControllerVendas().ex);
router.get("/vendasSerra", new GetSerraControllerVendas().ex);
router.get("/vendasQuatroPistas", new GetQuatroPistasControllerVendas().ex);
router.get("/vendasLoja28", new GetLoja28ControllerVendas().ex);
router.get("/vendasMercadao", new GetMercadaoControllerVendas().ex);
router.get("/vendasLaranjeiras03", new GetLaranjeiras03ControllerVendas().ex);
router.get("/vendasCariacica", new GetCariacicaControllerVendas().ex);
router.get("/vendasAlegriaCard", new GetAlegriaCardControllerVendas().ex);
router.get("/vendasCariacica02", new GetCariacica02ControllerVendas().ex);
router.get("/vendasGeral", new GetGeralVendas().ex);

// src/server/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server Error"
  });
});
app.listen(3333, () => {
  console.log("Servidor Rodando!!");
});
