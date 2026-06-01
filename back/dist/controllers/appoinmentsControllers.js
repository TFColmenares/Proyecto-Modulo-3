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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appoinmentService_1 = require("../service/appoinmentService");
// GET /appointments ⇒ Obtener el listado de todos los turnos de todos los usuarios.
const getAllAppointments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appoinments = yield (0, appoinmentService_1.getAllAppointmentsService)();
        res.status(200).json(appoinments);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.getAllAppointments = getAllAppointments;
// GET /appointments ⇒ Obtener el detalle de un turno específico.
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appoinment = yield (0, appoinmentService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(appoinment);
    }
    catch (error) {
        if (error instanceof Error && error.message == 'Appointment Not Found') {
            res.status(404).json({
                message: error.message,
            });
        }
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.getAppointmentById = getAppointmentById;
// POST /appointments/schedule ⇒ Agendar un nuevo turno.
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appoinment = yield (0, appoinmentService_1.createAppoinmentService)(req.body);
        res.status(201).json(appoinment);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.scheduleAppointment = scheduleAppointment;
// PUT /appointments/cancel ⇒ Cambiar el estatus de un turno a “cancelled”.
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentId = yield (0, appoinmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json(appointmentId);
    }
    catch (error) {
        if (error instanceof Error && error.message == 'Appointment Not Found') {
            res.status(404).json({
                message: error.message,
            });
        }
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.cancelAppointment = cancelAppointment;
