import express from "express";
import { Client } from "../entites/Client";
import { Banker } from "../entites/Banker";
const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async(req,res) => {
    const { bankerId, clientId } = req.params;

    const client = await Client.findOneById(parseInt(clientId));

    const banker = await Banker.findOneById(parseInt(bankerId));

    if(!banker ||  !client){
        return res.json({
            message: "Banker Or Client Not Found!"
        })
    }

    banker.client = [
        client
    ]

    await banker.save();

    return res.json({
        message: "Banker Connected To Client"
    })
});

export { router as connectBankerToClientRouter };