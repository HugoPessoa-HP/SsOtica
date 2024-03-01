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

// src/controllers/02guarapari/GetGuarapariControllerVendas.ts
var GetGuarapariControllerVendas_exports = {};
__export(GetGuarapariControllerVendas_exports, {
  GetGuarapariControllerVendas: () => GetGuarapariControllerVendas
});
module.exports = __toCommonJS(GetGuarapariControllerVendas_exports);

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

// src/services/02guarapari/GetGuarapariServiceVendas.ts
var GetGuarapariVendas_Service = class {
  execute() {
    return __async(this, null, function* () {
      const dataAnterior = yield dataAtualizada_default();
      const vendas = yield api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);
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
        var primeiroNumero = numero[0];
        if (primeiroNumero != null || primeiroNumero != void 0) {
          console.log("Estou Aqui");
          var valorNumero = JSON.stringify(primeiroNumero);
          var numeroFinal = valorNumero.replace(/\D/g, "");
        } else {
          var valorNumero = yield JSON.stringify(numero);
          var numeroFinal = "N\xE3o informou numero";
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetGuarapariControllerVendas
});
