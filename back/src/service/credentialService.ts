import { EntityManager } from 'typeorm';
import { credentialRepository } from '../config/data-source';
import { Credential } from '../entities/Credential';
import bcrypt from 'bcryptjs';

export const createCredential = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  const hashPassword = await bcrypt.hash(password, 10);

  const newCredential: Credential = entityManager.create(Credential, {
    username,
    password: hashPassword,
});

const results: Credential = await entityManager.save(Credential, newCredential);

return results;
};

export const validateCredential = async (username: string, password: string): Promise<number> => {
  const foundCredential: Credential | null = await credentialRepository.findOne({
    where: {
      username,
    },
  });

  if (!foundCredential) throw new Error('No existe el username ingresado');

  const isPasswordValid = await bcrypt.compare(password, foundCredential.password);

  if (!isPasswordValid) throw new Error('Contraseña incorrecta');

  return foundCredential.id;
};

