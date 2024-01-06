import express from "express";
import { Client } from "../entites/Client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

// router.get('/api/clients', async(req,res) => {
//     const clients = await Client.find();
//     return res.json(clients);
// });

router.get('/api/clients/:clientId', async(req,res) => {
    const clients = await createQueryBuilder(
        'client'
    )
    // .select('client')
    .select('client.first_name')
    .addSelect('client.last_name')
    .addSelect('client.balance')
    .from(Client, 'client')
    .leftJoinAndSelect(
        'client.transactions','transactions'
    )
    // .where('client.id = :clientId', {clientId: req.params.clientId})
    // .where('client.balance >= :balance', { balance: 500000})
    .where('client.balance >= :minBalance AND client.balance <= :maxBalance', { minBalance: 500000, maxBalance: 6000000})
    // .getOne()
    .getMany()

    return res.json(clients)
});

export { router as fetchClientRouter };