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
exports.fetchClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entites/Client");
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
exports.fetchClientRouter = router;
router.get('/api/clients/:clientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield (0, typeorm_1.createQueryBuilder)('client')
        .select('client.first_name')
        .addSelect('client.last_name')
        .addSelect('client.balance')
        .from(Client_1.Client, 'client')
        .leftJoinAndSelect('client.transactions', 'transactions')
        .where('client.balance >= :minBalance AND client.balance <= :maxBalance', { minBalance: 500000, maxBalance: 6000000 })
        .getMany();
    return res.json(clients);
}));
//# sourceMappingURL=fetch_clients.js.map