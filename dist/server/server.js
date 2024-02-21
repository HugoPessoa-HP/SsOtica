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

// src/API-Google-Sheets.ts
var import_axios2 = __toESM(require("axios"));
var SalvarVendas = class {
  salvarVendas(_0) {
    return __async(this, arguments, function* ({ nome, numeroMudado, email }) {
      yield import_axios2.default.post("https://sheetdb.io/api/v1/bo6z9p6sxriyi", {
        "data": {
          "nome": nome,
          "numero": numeroMudado,
          "email": email
        }
      }, {
        "auth": {
          "username": "ywlesyn2",
          "password": "zaf3rnvarz6a5ei61jth"
        }
      });
    });
  }
};

// src/services/Muquicaba_01/GetVendasService.ts
var import_moment = __toESM(require("moment"));
var GetVendasMuquicaba_Service = class {
  execute() {
    return __async(this, null, function* () {
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relatorio");
      const dataAtual = yield (0, import_moment.default)().format("YYYY-MM-DD");
      console.log(dataAtual);
      const dataAnterior = yield (0, import_moment.default)().subtract(1, "days").format("YYYY-MM-DD");
      console.log(dataAnterior);
      const vendas = yield api.get(`33879704000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
      const data = yield vendas.data;
      const lengthData = data.length;
      const vendasSalvar = yield new SalvarVendas();
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
      sheet.workbook.xlsx.writeFile(`Relatorio-${dataAnterior}.xlsx`);
      console.log(lengthData);
      return vendas.data;
    });
  }
};

// src/controllers/Muquicaba_01/GetVendasController.ts
var GetVendasMuquicaba = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const getVendas = new GetVendasMuquicaba_Service();
      const vendas = yield getVendas.execute();
      return res.json(vendas);
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/vendasMuquicaba", new GetVendasMuquicaba().ex);

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
  process.env.PORT ? Number(process.env.PORT) : 3333
);
