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
import users_json from './users.json'

const users: IUser[] = [];

export default ApiMethod('POST')(async (req: NextApiRequest, res: NextApiResponse) => {
	const id = getId(); 
	const name = req?.body?.name; 
	const email = req?.body?.email; 

	const user: IUser = {id, name, email}; 

    // Retornar uma resposta de sucesso para o cliente.
    res.status(200).json({ success: true, message: 'Dados recebidos com sucesso!' });
  } 
);

function getId() {
	return 1; 
}