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
exports.cancelAppointmentService = exports.createAppoinmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const IAppoinment_1 = require("../interfaces/IAppoinment");
const userService_1 = require("./userService");
const getAllAppointmentsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (userId = null) {
    const options = {};
    if (userId) {
        options.where = {
            user: {
                id: userId,
            },
        };
    }
    const appointments = yield data_source_1.appointmentRepository.find(options);
    if (!appointments.length) {
        throw new Error('Appointments Not Found');
    }
    return appointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppoinment = yield data_source_1.appointmentRepository.findOne({
        where: {
            id,
        },
    });
    if (!foundAppoinment)
        throw new Error("Appoinment Not Found");
    return foundAppoinment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppoinmentService = (appointmentDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield (0, userService_1.getUserByIdService)(appointmentDTO.userId);
    const newAppointment = data_source_1.appointmentRepository.create({
        date: appointmentDTO.date,
        status: IAppoinment_1.AppointmentStatus.ACTIVE,
        time: appointmentDTO.time,
        tipo: appointmentDTO.tipo,
        user: foundUser,
    });
    const results = yield data_source_1.appointmentRepository.save(newAppointment);
    return results;
});
exports.createAppoinmentService = createAppoinmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppoinment = yield (0, exports.getAppointmentByIdService)(id);
    if (foundAppoinment.status == IAppoinment_1.AppointmentStatus.CANCELLED)
        throw new Error("El turno ya estaba cancelado ");
    foundAppoinment.status = IAppoinment_1.AppointmentStatus.CANCELLED;
    const results = yield data_source_1.appointmentRepository.save(foundAppoinment);
    return results.id;
});
exports.cancelAppointmentService = cancelAppointmentService;
