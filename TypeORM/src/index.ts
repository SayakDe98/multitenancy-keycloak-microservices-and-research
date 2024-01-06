import { createConnection } from "typeorm";
import { Banker } from "./entites/Banker";
import { Client } from "./entites/Client";
import { Transactions } from "./entites/Transaction";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { DeleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";
import config from "./ormconfig";

const app = express();

const main = async () => {
    try {
            await createConnection(config)
        // console.log("Connected to postgres database!");
        console.log("Connected to mysql database!");

        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter);
        app.use(DeleteClientRouter);
        app.use(fetchClientRouter);

        app.listen(8080, () => {
            console.log("Running On Port 8080");
        })
    }
    catch(err) {
        console.error(err);
        // throw new Error("Unable to connect to postgres!");
        throw new Error("Unable to connect to mysql!");
    }
    }

main();