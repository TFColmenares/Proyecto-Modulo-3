import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

@Entity({
    name:'Appointments',
})
export class Appointment {
     @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
    })
    date: Date;

    @Column()
    time: string;

    @Column() 
    tipo: string;


    @Column({
        type:'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE,
    })
    status: AppointmentStatus;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
}