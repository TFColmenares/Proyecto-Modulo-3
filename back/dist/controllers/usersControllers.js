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
exports.login = exports.register = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../service/userService");
// GET /users ⇒ Obtener el listado de todos los usuarios.
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.getAllUsers = getAllUsers;
// GET /users/:id ⇒ Obtener el detalle de un usuario específico.
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error && error.message == 'User Not Found') {
            res.status(404).json({
                message: error.message,
            });
        }
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.getUserById = getUserById;
// POST /users/register ⇒ Registro de un nuevo usuario.
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.createUserService)(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.register = register;
// POST /users/login ⇒ Login del usuario a la aplicación.
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, userService_1.loginUserService)(username, password);
        res.status(200).json({
            login: true,
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.login = login;
