/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { ApiMethod } from '@/decorators/method';
import { IUser, IUserCreate } from '@/types/user.d';
import { faker } from '@faker-js/faker'

const users: IUser[] = [];

export default ApiMethod('POST')(async (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req;

    const createUser: IUserCreate = body;

    users.push({
      id: faker.number.int(),
      ...createUser,
    });

    res.status(200).json({ user: createUser });
  }
);

function getId() {
	return 1; 
}