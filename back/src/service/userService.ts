import { IUserResponseDTO , IUserRegisterDTO } from '../dtos/IUserDTO';
import { createCredential, validateCredential } from './credentialService';
import { AppDataSource, userRepository } from '../config/data-source';
import { User } from '../entities/User';
import { Credential } from '../entities/Credential';



export const getAllUsersService = async (): Promise<IUserResponseDTO[]> => {
  const users: User[] = await userRepository.find(); 
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    birthdate: user.birthdate,
    email: user.email,
    nDni: user.nDni,
    appointments: user.appointments,
  }));
};

export const getUserByIdService = async (id: number): Promise<IUserResponseDTO> =>{
    const foundUser: User | null = await userRepository.findOne({
      where:{
        id,
      },
      relations:[
        "appointments"
      ],
    });
    if (!foundUser) throw new Error('User Not Found');
    return foundUser;
};

export const createUserService = async (userDTO: IUserRegisterDTO ):Promise<IUserResponseDTO> => {
  const resultUser: User = await AppDataSource.transaction(async (entityManager) => {
    const newCredential: Credential = await createCredential(entityManager, userDTO.username, userDTO.password);

    const newUser : User = entityManager.create(User, {
    name: userDTO.name,
    email: userDTO.email,
    birthdate: userDTO.birthdate,
    nDni: userDTO.nDni,
    credentials: newCredential
  });
  const results = await entityManager.save(User, newUser);
  return results;
 });



  return{
    id: resultUser.id,
    name: resultUser.name,
    email: resultUser.email,
    birthdate: resultUser.birthdate,
    nDni: resultUser.nDni,
    appointments: resultUser.appointments,
  };
};

export const loginUserService = async (username: string, password: string) => {
  const credentialId: number = await validateCredential(username, password);

  const foundUser: User | null = await userRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
     relations: {
        appointments: true,
      },
  });
  if (!foundUser){
    throw new Error ('User Not Found');
  }
  return {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    birthdate: foundUser.birthdate,
    nDni: foundUser.nDni,
    appointments: foundUser.appointments,
  };
};