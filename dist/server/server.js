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
      return res.json(data);
      console.log("Relat\xF3rio Criado");
    });
  }
};

// src/services/02guarapari/GetGuarapariServiceVendas.ts
var import_axios2 = __toESM(require("axios"));
var import_moment3 = __toESM(require("moment"));
var GetGuarapariVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const api2 = yield import_axios2.default.create({
        baseURL: "https://app.ssotica.com.br/api/v1/integracoes/vendas/periodo?cnpj=",
        headers: {
          "Authorization": "Bearer KyhmIwwbbttTtiTynlrPKkyla0wOWxNDKBuqBbgka3xGTdOsniwagsqVIISi"
        }
      });
      const dataAnterior = yield (0, import_moment3.default)().subtract(1, "days").format("YYYY-MM-DD");
      const vendas = yield api2.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
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

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/vendasMuquicaba", new GetMuquicabaControllerVendas().ex);
router.get("/vendasGuarapari", new GetGuarapariControllerVendas().ex);

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
app.listen(
  3333,
  () => {
    console.log("Servidor Rodando!!");
  }
);
