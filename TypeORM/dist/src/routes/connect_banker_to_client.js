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
exports.connectBankerToClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entites/Client");
const Banker_1 = require("../entites/Banker");
const router = express_1.default.Router();
exports.connectBankerToClientRouter = router;
router.put('/api/banker/:bankerId/client/:clientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bankerId, clientId } = req.params;
    const client = yield Client_1.Client.findOneById(parseInt(clientId));
    const banker = yield Banker_1.Banker.findOneById(parseInt(bankerId));
    if (!banker || !client) {
        return res.json({
            message: "Banker Or Client Not Found!"
        });
    }
    banker.client = [
        client
    ];
    yield banker.save();
    return res.json({
        message: "Banker Connected To Client"
    });
}));
//# sourceMappingURL=connect_banker_to_client.js.map