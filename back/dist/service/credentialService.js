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
exports.validateCredential = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createCredential = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const newCredential = entityManager.create(Credential_1.Credential, {
        username,
        password: hashPassword,
    });
    const results = yield entityManager.save(Credential_1.Credential, newCredential);
    return results;
});
exports.createCredential = createCredential;
const validateCredential = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCredential = yield data_source_1.credentialRepository.findOne({
        where: {
            username,
        },
    });
    if (!foundCredential)
        throw new Error('No existe el username ingresado');
    const isPasswordValid = yield bcryptjs_1.default.compare(password, foundCredential.password);
    if (!isPasswordValid)
        throw new Error('Contraseña incorrecta');
    return foundCredential.id;
});
exports.validateCredential = validateCredential;
