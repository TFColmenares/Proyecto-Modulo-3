import { Router } from 'express';
import { cancelAppointment, getAllAppointments, getAppointmentById, scheduleAppointment, } from '../controllers/appoinmentsControllers';

const appointmentsRouter = Router();

appointmentsRouter.get("/", getAllAppointments);

appointmentsRouter.get("/:id", getAppointmentById);

appointmentsRouter.post("/schedule", scheduleAppointment);

appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
