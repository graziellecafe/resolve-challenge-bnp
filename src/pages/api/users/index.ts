/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { ApiMethod } from '@/decorators/method';
import { IUser } from '@/types/user.d';

import users_json from './users.json'

// exporta uma funcao que é o resultado da chamada da funcao ApiMethod('GET'). Cria e configura rotas de API HTTP
export default ApiMethod('GET')(async (req: NextApiRequest, res: NextApiResponse) => {
	const users: IUser[] = users_json;

	return res.status(200).json(users);
});


// Em resumo, esse trecho de código define uma rota de API HTTP que responde a solicitações HTTP GET 
// e envia um array de usuários em formato JSON como resposta. O array de usuários é obtido 
// a partir de uma fonte de dados chamada users_json.