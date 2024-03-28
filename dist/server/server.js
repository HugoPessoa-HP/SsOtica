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
        "44447899001132",
        "83214449000180",
        "82677480000194",
        "29132921000190",
        "48940172000171",
        "74449580000135",
        "03034259000141"
      ];
      const arraylength = arrayCNPJ.length;
      var i, j, v;
      var nomeArray = [];
      var numeroArray = [];
      var emailArray = [];
      for (i = 0; i < arraylength; i++) {
        console.log(i);
        const getVendas = new GetVendasService();
        const vendas = yield getVendas.execute(arrayCNPJ[i]);
        const data = yield vendas.data;
        const lengthData = data.length;
        for (j = 0; j < lengthData; j++) {
          const nome = yield data[j].cliente.nome;
          if (nome === null || nome === void 0) {
            var nomeFinal = "N\xE3o informou nome";
            console.log(nomeFinal);
          } else {
            var nomeFinal = JSON.stringify(nome);
          }
          yield nomeArray.push(nomeFinal);
          console.log(nomeFinal);
          const numero = yield data[j].cliente.telefones;
          if (numero == null || numero == void 0 || numero == "") {
            var numeroFinal = "N\xE3o informou n\xFAmero";
          } else {
            var primeiroNumero = numero[0];
            var valorNumero = JSON.stringify(primeiroNumero);
            var numeroFinal = valorNumero.replace(/\D/g, "");
          }
          yield numeroArray.push(numeroFinal);
          console.log(numeroFinal);
          const email = yield data[j].valor_liquido;
          if (email === null || email === void 0) {
            var emailFinal = "N\xE3o informou email";
          } else {
            var emailFinal = yield JSON.stringify(email);
          }
          yield emailArray.push(emailFinal);
          console.log(emailFinal);
        }
      }
      const valoresLength = nomeArray.length;
      console.log(valoresLength);
      for (v = 0; v < valoresLength; v++) {
        sheet.addRow({
          nome: nomeArray[v],
          numero: numeroArray[v],
          email: emailArray[v]
        });
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
app.listen(3003, () => {
  console.log("Servidor Rodando!!");
});
