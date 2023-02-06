import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

router.use(morgan('dev'));
/** Analisar a solicitação */
router.use(express.urlencoded({ extended: false }));
/** De olho no JSON data */
router.use(express.json());

/** Regras da API */
router.use((req, res, next) => {
 
    res.header('Access-Control-Allow-Origin', '*');
  
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));


/*

Aplicação Node.js usando Express que cria um servidor HTTP.

As primeiras linhas importam as dependências necessárias:

"http" é um módulo padrão do Node.js para criar um servidor HTTP.
"express" é uma biblioteca para criar aplicações web no Node.js.
"morgan" é um middleware de registro para Express que registra as solicitações HTTP.
"routes/posts" é o arquivo de rotas da aplicação.
A const "router" é uma instância do Express.

O middleware "morgan" é usado para registrar as solicitações HTTP.

Os métodos "express.urlencoded" e "express.json" são usados para analisar a solicitação e extrair dados do corpo da solicitação.

O código dentro do middleware "router.use" adiciona cabeçalhos aos pedidos HTTP para permitir que a aplicação seja acessada por outros domínios. Além disso, ele verifica se o método HTTP é "OPTIONS" e, se for, retorna um código de status 200 e um objeto JSON vazio.

A rota raiz "/" é usada para configurar as rotas da aplicação, que são importadas do arquivo "routes/posts".

O middleware "router.use" adiciona tratamento de erro para casos em que a rota não for encontrada.

A const "httpServer" é uma instância do servidor HTTP criada usando a instância "router" do Express. A porta que o servidor irá ouvir é determinada pela variável de ambiente "PORT" ou, se não for encontrada, usa 6060 como padrão.

O servidor é iniciado usando "httpServer.listen" e exibe uma mensagem de console indicando em qual porta está sendo executado.

*/