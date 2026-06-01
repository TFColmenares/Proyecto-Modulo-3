import { FindManyOptions } from "typeorm";
import { appointmentRepository } from "../config/data-source";
import { ICreateAppointmentDTO } from "../dtos/IAppoinmentDTO";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus } from "../interfaces/IAppoinment";
import { getUserByIdService } from "./userService";



export const getAllAppointmentsService = async (userId: number | null = null): Promise<Appointment[]> => {
   const options: FindManyOptions<Appointment> = {};

   if(userId){
    options.where = {
        user: {
            id:userId,
        },
    };
   }

    const appointments: Appointment[] = await appointmentRepository.find(options);

    if(!appointments.length){
        throw new Error('Appointments Not Found');
    }

    return appointments;
};

export const getAppointmentByIdService = async (id:number): Promise<Appointment> => {
    const foundAppoinment: Appointment | null = await appointmentRepository.findOne({
        where: {
          id,
        },
    }) ;
    if(!foundAppoinment) throw new Error ("Appoinment Not Found");
    return foundAppoinment;
};

export const createAppoinmentService = async (appointmentDTO: ICreateAppointmentDTO): Promise<Appointment> => {
    const foundUser = await getUserByIdService(appointmentDTO.userId); 
    
    const newAppointment: Appointment= appointmentRepository.create({

        date: appointmentDTO.date,
        status: AppointmentStatus.ACTIVE,
        time: appointmentDTO.time,
        tipo: appointmentDTO.tipo,
        user: foundUser,
     });
    const results: Appointment = await appointmentRepository.save(newAppointment);
     return results;
};

export const cancelAppointmentService = async (id: number): Promise<number> => {
    const foundAppoinment= await getAppointmentByIdService(id);

    if (foundAppoinment.status == AppointmentStatus.CANCELLED) throw new Error("El turno ya estaba cancelado ")

    foundAppoinment.status = AppointmentStatus.CANCELLED;

    const results = await appointmentRepository.save(foundAppoinment);
    
    return results.id;

};


