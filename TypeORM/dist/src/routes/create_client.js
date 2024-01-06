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
exports.createClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entites/Client");
const router = express_1.default.Router();
exports.createClientRouter = router;
router.post('/api/client', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, cardNumber, balance } = req.body;
    const client = Client_1.Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        card_number: cardNumber,
        balance
    });
    yield client.save();
    return res.send(client);
}));
//# sourceMappingURL=create_client.js.map