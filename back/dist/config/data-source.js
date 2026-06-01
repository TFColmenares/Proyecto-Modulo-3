"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialRepository = exports.appointmentRepository = exports.userRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const Credential_1 = require("../entities/Credential");
const User_1 = require("../entities/User");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST || 'localhost',
    port: envs_1.DB_PORT || 5432,
    username: envs_1.DB_USERNAME || 'test',
    password: envs_1.DB_PASSWORD || 'test',
    database: envs_1.DB_NAME || 'test',
    synchronize: true,
    logging: false,
    entities: [Credential_1.Credential, User_1.User, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
});
exports.userRepository = exports.AppDataSource.getRepository(User_1.User);
exports.appointmentRepository = exports.AppDataSource.getRepository(Appointment_1.Appointment);
exports.credentialRepository = exports.AppDataSource.getRepository(Credential_1.Credential);
