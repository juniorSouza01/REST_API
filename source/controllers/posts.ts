import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };


/*

 Estas funções são destinadas a serem usadas como middlewares em uma aplicação Express, onde são passados três argumentos padrões: Request, Response e NextFunction.

 A interface Post define a estrutura básica de um post, contendo quatro propriedades: userId, id, title e body.

As funções são:

getPosts: Faz uma chamada GET para a API para obter todos os posts e, em seguida, retorna um objeto JSON com uma mensagem contendo todos os posts.

getPost: Faz uma chamada GET para a API para obter um post específico, baseado no id fornecido como parte da rota. Em seguida, retorna um objeto JSON com uma mensagem contendo o post.

updatePost: Faz uma chamada PUT para a API para atualizar um post específico, baseado no id fornecido como parte da rota. Os dados para atualização são obtidos a partir do corpo da solicitação. Em seguida, retorna um objeto JSON com uma mensagem contendo o post atualizado.

deletePost: Faz uma chamada DELETE para a API para excluir um post específico, baseado no id fornecido como parte da rota. Em seguida, retorna um objeto JSON com uma mensagem informando que o post foi excluído com sucesso.

addPost: Faz uma chamada POST para a API para adicionar um novo post. Os dados para adição são obtidos a partir do corpo da solicitação. Em seguida, retorna um objeto JSON com uma mensagem contendo o post adicionado.

Finalmente, todas as funções são exportadas como um objeto default para que possam ser importadas e utilizadas em outras partes da aplicação.



####################  !!MELHOR ENTENDIMENTO!!  #################################

import { Request, Response, NextFunction } from 'express';: Este import está importando três tipos de requisições do Express: Request, Response e NextFunction.

===========

import axios, { AxiosResponse } from 'axios';: Este import está importando a biblioteca Axios e o tipo AxiosResponse.

==================

interface Post { userId: Number; id: Number; title: String; body: String; }: Este é um tipo de interface que define o formato de um objeto Post com as propriedades userId, id, title e body.

=======================

const getPosts = async (req: Request, res: Response, next: NextFunction) => {: Esta é uma função assíncrona que obtém todos os posts. Ela recebe três parâmetros: req (Request), res (Response) e next (NextFunction).

===================

let result: AxiosResponse = await axios.get(https://jsonplaceholder.typicode.com/posts`);`: Este é um exemplo de uma chamada à API, que obtém todos os posts a partir da URL https://jsonplaceholder.typicode.com/posts. A resposta é armazenada na variável result.

============

let posts: [Post] = result.data;: A variável posts é definida como um array de objetos Post, cujos dados são obtidos a partir da propriedade data da resposta da API (variável result).

===========================

return res.status(200).json({ message: posts });: A função retorna a resposta da API com o status HTTP 200 (OK) e o corpo da mensagem com o array de posts.

======================================

const getPost = async (req: Request, res: Response, next: NextFunction) => {: Esta é uma função assíncrona que obtém um único post. Ela recebe três parâmetros: req (Request), res (Response) e next (NextFunction).

============

let id: string = req.params.id;: A variável id é definida como o valor do parâmetro id na requisição.

============

let result: AxiosResponse = await axios.get(https://jsonplaceholder.typicode.com/posts/${id}`);`: Este é um exemplo de uma chamada à API, que obtém um único post a partir da URL https://jsonplaceholder.typicode.com/posts/{id}. A resposta é armazenada na variável result.

===============

let post: Post = result.data;: A variável post é definida como um objeto Post, cujos dados são obtidos a partir da propriedade data da resposta da API (variável result).

==================

return res.status(200).json({ message: post });: A função retorna a resposta da API com o status HTTP 200 (OK)






*/