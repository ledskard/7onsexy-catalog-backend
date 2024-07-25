require('dotenv').config();
import "reflect-metadata";
import * as express from 'express';
import routes from './routes';

const cors = require("cors");
import { Server } from "http";
import { AppDataSource } from "./database/data-source";


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(routes);

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
    const server: Server = app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}

export default app;
