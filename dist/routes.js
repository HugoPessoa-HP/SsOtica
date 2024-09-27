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
    "Authorization": `Bearer ${tokenV}`
  }
});

// src/SalesFunction/updatedDate.ts
var import_moment = __toESM(require("moment"));
function updatedDate() {
  return __async(this, null, function* () {
    let currentDate = /* @__PURE__ */ new Date();
    if (currentDate.getDay() == 1) {
      const previousDate = yield (0, import_moment.default)().subtract(3, "days").format("YYYY-MM-DD");
      return previousDate;
    } else {
      const previousDate = yield (0, import_moment.default)().subtract(1, "days").format("YYYY-MM-DD");
      return previousDate;
    }
  });
}
var updatedDate_default = updatedDate;

// src/services/AllServices/GetSales.ts
var GetSalesService = class {
  execute(store_CNPJ) {
    return __async(this, null, function* () {
      const previousdate = yield updatedDate_default();
      const sales = yield api.get(`${store_CNPJ}&inicio_periodo=${previousdate}&fim_periodo=${previousdate}`);
      return sales;
    });
  }
};

// src/controllers/AllControllers/GetVendasController.ts
var GetSalesController = class {
  ex(req, res) {
    return __async(this, null, function* () {
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Relat\xF3rio");
      sheet.columns = [
        { header: "Nome", key: "nome" },
        { header: "Numero", key: "numero" },
        { header: "Email", key: "email" }
      ];
      const arrayCNPJ = ["Enter the stores CNPJ to run"];
      const arraylength = arrayCNPJ.length;
      var i, j, v;
      var nameArray = [];
      var numberArray = [];
      var emailArray = [];
      for (i = 0; i < arraylength; i++) {
        console.log(i);
        const getSales = new GetSalesService();
        const sales = yield getSales.execute(arrayCNPJ[i]);
        const data = yield sales.data;
        const lengthData = data.length;
        for (j = 0; j < lengthData; j++) {
          const name = yield data[j].cliente.nome;
          if (name == null || name == void 0 || name == "") {
            var finalName = "N\xE3o informou nome";
          } else {
            var finalName = JSON.stringify(name);
          }
          yield nameArray.push(finalName);
          const number = yield data[j].cliente.telefones;
          if (number == null || number == void 0 || number == "") {
            var finalNumber = "N\xE3o informou n\xFAmero";
          } else {
            var firstNumber = number[0];
            var valueNumber = JSON.stringify(firstNumber);
            var finalNumber = valueNumber.replace(/\D/g, "");
          }
          yield numberArray.push(finalNumber);
          const email = yield data[j].valor_liquido;
          if (email == null || email == void 0) {
            var finalEmail = "N\xE3o informou email";
          } else {
            var finalEmail = yield JSON.stringify(email);
          }
          yield emailArray.push(finalEmail);
        }
      }
      const valuesLength = nameArray.length;
      console.log(valuesLength);
      for (v = 0; v < valuesLength; v++) {
        sheet.addRow({
          nome: nameArray[v],
          numero: numberArray[v],
          email: emailArray[v]
        });
      }
      const previousDate = yield updatedDate_default();
      sheet.workbook.xlsx.writeFile(`Relat\xF3rio Geral de Vendas - ${previousDate}.xlsx`);
      console.log("Created");
      return res.json("Fim da RotaEnd of the Route!");
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/Sales", new GetSalesController().ex);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
