import express from "express";
import { Client } from "../entites/Client";
import { Transactions, TransactionTypes } from "../entites/Transaction";

const router = express.Router();

router.post('/api/client/:clientId/transaction',async(req,res)=>{
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOneById(parseInt(clientId));

    if(!client){
        return res.json({
            message:"Client Not Found"
        })
    }

    const transaction = Transactions.create({
        amount,
        type,
        client
    });

    await transaction.save();

    if(type === TransactionTypes.DEPOSIT){
        client.balance = client.balance + amount;
    }

    else if(type === TransactionTypes.WITHDRAW){
        client.balance = client.balance - amount;
    }

    await client.save();

    return res.json({
        message: "Transaction successful!"
    })
});

export { router as createTransactionRouter};