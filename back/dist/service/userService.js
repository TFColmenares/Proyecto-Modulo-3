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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.userRepository.find();
    return users.map((user) => ({
        id: user.id,
        name: user.name,
        birthdate: user.birthdate,
        email: user.email,
        nDni: user.nDni,
        appointments: user.appointments,
    }));
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield data_source_1.userRepository.findOne({
        where: {
            id,
        },
        relations: [
            "appointments"
        ],
    });
    if (!foundUser)
        throw new Error('User Not Found');
    return foundUser;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (userDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const resultUser = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const newCredential = yield (0, credentialService_1.createCredential)(entityManager, userDTO.username, userDTO.password);
        const newUser = entityManager.create(User_1.User, {
            name: userDTO.name,
            email: userDTO.email,
            birthdate: userDTO.birthdate,
            nDni: userDTO.nDni,
            credentials: newCredential
        });
        const results = yield entityManager.save(User_1.User, newUser);
        return results;
    }));
    return {
        id: resultUser.id,
        name: resultUser.name,
        email: resultUser.email,
        birthdate: resultUser.birthdate,
        nDni: resultUser.nDni,
        appointments: resultUser.appointments,
    };
});
exports.createUserService = createUserService;
const loginUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialService_1.validateCredential)(username, password);
    const foundUser = yield data_source_1.userRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
        relations: {
            appointments: true,
        },
    });
    if (!foundUser) {
        throw new Error('User Not Found');
    }
    return {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        birthdate: foundUser.birthdate,
        nDni: foundUser.nDni,
        appointments: foundUser.appointments,
    };
});
exports.loginUserService = loginUserService;
