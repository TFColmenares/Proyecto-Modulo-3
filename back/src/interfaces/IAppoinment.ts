export enum AppointmentStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

interface IAppointment {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: AppointmentStatus;
}

export default IAppointment;