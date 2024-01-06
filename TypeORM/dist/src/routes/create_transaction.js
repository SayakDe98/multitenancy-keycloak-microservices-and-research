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
exports.createTransactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entites/Client");
const Transaction_1 = require("../entites/Transaction");
const router = express_1.default.Router();
exports.createTransactionRouter = router;
router.post('/api/client/:clientId/transaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.params;
    const { type, amount } = req.body;
    const client = yield Client_1.Client.findOneById(parseInt(clientId));
    if (!client) {
        return res.json({
            message: "Client Not Found"
        });
    }
    const transaction = Transaction_1.Transactions.create({
        amount,
        type,
        client
    });
    yield transaction.save();
    if (type === Transaction_1.TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount;
    }
    else if (type === Transaction_1.TransactionTypes.WITHDRAW) {
        client.balance = client.balance - amount;
    }
    yield client.save();
    return res.json({
        message: "Transaction successful!"
    });
}));
//# sourceMappingURL=create_transaction.js.map