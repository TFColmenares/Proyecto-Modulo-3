import { Request, Response } from "express";
import { cancelAppointmentService, createAppoinmentService, getAllAppointmentsService, getAppointmentByIdService,  } from "../service/appoinmentService";
import { Appointment } from "../entities/Appointment";


// GET /appointments ⇒ Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointments = async (_req: Request, res: Response) => {
  try{
      const appoinments: Appointment[] = await getAllAppointmentsService();
      res.status(200).json(appoinments);
    } catch (error: unknown) {
     res.status(500).json({ 
     message: error instanceof Error? error.message : "Unknown Error" , 
    });
    }
};


// GET /appointments ⇒ Obtener el detalle de un turno específico.
export const getAppointmentById = async (req: Request, res: Response) => {
  try{
      const { id } = req.params;
      const appoinment: Appointment = await getAppointmentByIdService(Number(id));
      res.status(200).json(appoinment);
    } catch (error: unknown) {
      if (error instanceof Error && error.message == 'Appointment Not Found') {
      res.status(404).json({
        message: error.message,
      });
    }
     res.status(500).json({ 
     message: error instanceof Error? error.message : "Unknown Error" , 
    });
    }
};

// POST /appointments/schedule ⇒ Agendar un nuevo turno.
export const scheduleAppointment = async (req: Request, res: Response) => {
 try{
     const appoinment: Appointment = await createAppoinmentService(req.body);
     res.status(201).json(appoinment);
   } catch (error: unknown) {
    res.status(500).json({ 
    message: error instanceof Error? error.message : "Unknown Error" , 
   });
   }
};

// PUT /appointments/cancel ⇒ Cambiar el estatus de un turno a “cancelled”.
export const cancelAppointment = async (req: Request, res: Response) => {
  try{
      const { id } = req.params;
      const appointmentId: number = await cancelAppointmentService(Number(id));
      res.status(200).json(appointmentId);
    } catch (error: unknown) {
      if (error instanceof Error && error.message == 'Appointment Not Found') {
      res.status(404).json({
        message: error.message,
      });
    }
     res.status(500).json({ 
     message: error instanceof Error? error.message : "Unknown Error" , 
    });
    }
};
