"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
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

// src/services/01muquicaba/GetMuquicabaServiceVendas.ts
var import_moment = __toESM(require("moment"));
var GetMuquicabaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`33879704000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/01muquicaba/GetMuquicabaControllerVendas.ts
var import_moment2 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment2.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Muquicaba-Relat\xF3rio-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/02guarapari/GetGuarapariServiceVendas.ts
var import_moment3 = __toESM(require("moment"));
var GetGuarapariVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment3.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/02guarapari/GetGuarapariControllerVendas.ts
var import_moment4 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment4.default)().subtract(1, "days").format("YYYY-MM-DD");
      yield sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Guarapari-${dataAnterior}.xlsx`);
      return res.json(data);
    });
  }
};

// src/services/03express/GetExpressServiceVendas.ts
var import_moment5 = __toESM(require("moment"));
var GetExpressVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment5.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/03express/GetExpressControllerVendas.ts
var import_moment6 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment6.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Express-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/05marcilio/GetMarcilioServiceVendas.ts
var import_moment7 = __toESM(require("moment"));
var GetMarcilioVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment7.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`39892855000100&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/05marcilio/GetMarcilioControllerVendas.ts
var import_moment8 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment8.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Marc\xEDlio-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/06shopping/GetShoppingServiceVendas.ts
var import_moment9 = __toESM(require("moment"));
var GetShoppingVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment9.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`39402286000177&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/06shopping/GetShoppingControllerVendas.ts
var import_moment10 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment10.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Shopping-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/07terravermelha/GetTerraVermelhaServiceVendas.ts
var import_moment11 = __toESM(require("moment"));
var GetTerraVermelhaVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment11.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`40248658000131&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/07terravermelha/GetTerraVermelhaControllerVendas.ts
var import_moment12 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment12.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Terra-Vermelha-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/11ulisses/GetUlissesServiceVendas.ts
var import_moment13 = __toESM(require("moment"));
var GetUlissesVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment13.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`40926713000103&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/11ulisses/GetUlissesControllerVendas.ts
var import_moment14 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment14.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Loja Ulisses - Relat\xF3rio de ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/08marcilio2/GetMarcilio2ServiceVendas.ts
var import_moment15 = __toESM(require("moment"));
var GetMarcilio02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment15.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`45517253000175&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/08marcilio2/GetMarcilio02ControllerVendas.ts
var import_moment16 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment16.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Marc\xEDlio02-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/09aeroporto/GetAeroportoServiceVendas.ts
var import_moment17 = __toESM(require("moment"));
var GetAeroportoVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment17.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`40254669000124&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/09aeroporto/GetAeroportoControllerVendas.ts
var import_moment18 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment18.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Aeroporto-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/10terravermelha2/GetTerraVermelha02ServiceVendas.ts
var import_moment19 = __toESM(require("moment"));
var GetTerraVermelha02Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment19.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`40248658000131&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/10terravermelha2/GetTerraVermelha02ControllerVendas.ts
var import_moment20 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment20.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio-Terra-Vermelha02-${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
    });
  }
};

// src/services/12marcilio3/GetMarcilio03ServiceVendas.ts
var import_moment21 = __toESM(require("moment"));
var GetMarcilio03Vendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield (0, import_moment21.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      return vendas;
    });
  }
};

// src/controllers/12marcilio3/GetMarcilio03ControllerVendas.ts
var import_moment22 = __toESM(require("moment"));
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
        var numeroV = yield data[i].cliente.telefones;
        var values = yield Object.values(numeroV[0]);
        numeroV = yield JSON.stringify(values);
        numeroV = yield numeroV.replace(/\D/g, "");
        yield numeroArray.push(numeroV);
        var emailV = yield data[i].valor_liquido;
        emailV = yield JSON.stringify(emailV);
        yield emailArray.push(emailV);
        sheet.addRow({
          nome: nomeArray[i],
          numero: numeroArray[i],
          email: emailArray[i]
        });
      }
      const dataAnterior = yield (0, import_moment22.default)().subtract(1, "days").format("YYYY-MM-DD");
      sheet.workbook.xlsx.writeFile(`Loja Marcilio 03 - Relat\xF3rio de ${dataAnterior}.xlsx`);
      console.log("Relat\xF3rio Criado");
      return res.json(data);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
