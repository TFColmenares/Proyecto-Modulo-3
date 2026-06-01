import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || 'localhost',
    port: DB_PORT || 5432,
    username: DB_USERNAME || 'test',
    password: DB_PASSWORD || 'test',
    database: DB_NAME || 'test',
    synchronize: true,
    logging: false,
    entities: [ Credential, User, Appointment],
    subscribers: [],
    migrations: [],
});

export const userRepository = AppDataSource.getRepository(User);
export const appointmentRepository = AppDataSource.getRepository(Appointment);
export const credentialRepository = AppDataSource.getRepository(Credential);


