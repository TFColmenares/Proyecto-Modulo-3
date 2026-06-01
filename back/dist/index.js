"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
data_source_1.AppDataSource.initialize().then(() => {
    console.info('DB Connection established');
    server_1.default.listen(envs_1.PORT, () => {
        console.info(`Server up and running on http://localhost:${envs_1.PORT}`);
    });
}).catch((error) => console.log(error));
