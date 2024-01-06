"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const create_client_1 = require("./routes/create_client");
const create_banker_1 = require("./routes/create_banker");
const create_transaction_1 = require("./routes/create_transaction");
const connect_banker_to_client_1 = require("./routes/connect_banker_to_client");
const delete_client_1 = require("./routes/delete_client");
const fetch_clients_1 = require("./routes/fetch_clients");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)(ormconfig_1.default);
        console.log("Connected to mysql database!");
        app.use(express_1.default.json());
        app.use(create_client_1.createClientRouter);
        app.use(create_banker_1.createBankerRouter);
        app.use(create_transaction_1.createTransactionRouter);
        app.use(connect_banker_to_client_1.connectBankerToClientRouter);
        app.use(delete_client_1.DeleteClientRouter);
        app.use(fetch_clients_1.fetchClientRouter);
        app.listen(8080, () => {
            console.log("Running On Port 8080");
        });
    }
    catch (err) {
        console.error(err);
        throw new Error("Unable to connect to mysql!");
    }
});
main();
//# sourceMappingURL=index.js.map