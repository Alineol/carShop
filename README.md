
<img width="130px" align="right" src="https://acegif.com/wp-content/uploads/gifs/car-driving-61.gif"/>  
<br/>
<h1>API-Concessionária de carros</h1>
<p><strong>Contexto</strong></p>

Simulação de uma api de uma concessionária, na qual é possível fazer um crud de carros.
A Api foi construída no modelo MSC(model, service e controller).
Sendo a model responsável pelo BD, service para as regras de negócio, e controller para lidar com as requisições e respostas.
Também foram realizados testes unitários com Mocha Chai e Sinon.

<details>
 <summary><strong>Habilidades desenvolvidas durante o desenvolvimento da API</strong></summary><br />

- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada camada;
- Melhorar a reusabilidade do código;
- Entender e aplicar os padrões REST, SOLID E POO;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis;
- Utilizar Zod e express-async-errors para tratamento de erros;
plicação backEnd com banco de dados na nuvem através heroku**; :fire:
- Realizar testes unitários tentando buscar cobertura de 100% do código.
- Uyliziar o TypeScript;
- Aprender a utilizar o Mongoose 
 
</details>

<details>
 <summary><strong>Tecnologias utilizadas</strong></summary><br />

- Mocha     
- Sinon     
- Node
- TypeScript   
- Chai
- Joi
- Express
- MondeDb
- nyc

</details>

<details>
 
   <summary><strong>Como rodar o projeto na sua máquina:</strong></summary><br />
 
   <strong>:whale: Rodando no Docker vs Localmente</strong>
  
  **Com Docker**
  > Pare o mongo se ele estiver rodando na sua máquina local 

  > Rode os containers com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar dois containers chamados car_shop(node) e car_shop_db(mongodb).
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
  > Use o comando `docker exec -it car_shop bash.`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências  com `npm install`
  
  > Para iniciar a aplicação: `npm run dev`
   - Todos os comandos npm devem ser rodados dentro do container.
  
  **Sem Docker**
  
  > Instale as dependências com `npm install`
    
 
:eyes: **De olho nas dicas:** 
 
 1. Para rodar o projeto desta forma, **obrigatóriamente** você deve ter o `node` instalado em seu computador.
  
 > Para iniciar a aplicação: `npm run dev`

</details>
<details>
 <summary><strong>Informações sobre teste</strong></summary>

  Nessa aplicação foram realizados apenas testes unitários. Para rodar os testes localmente não é necessário que a aplicação esteja iniciada.

  >  No terminal digite `npm run test` 
  
  - Esse comando iniciará os testes

  > No terminal digite `npm run coverage`

  - Esse comando iniciará os testes e no final apresentará um relatório de cobertura dos testes.

   </details>

   <details>
<summary><strong> Validações e ações das rotas: </strong></summary>
<details>

<summary><strong> get: /cars </strong></summary>

  - Rota para **buscar** carros
  - Busca todos os carros do bd(é necessário que você cadastre carros antes, se não retornará um array vazio)
  - Retorna status 200 em caso de sucesso
</details>

<details>
<summary><strong>post: /cars </strong></summary>

  - Rota para **criar** um carro
  - Responde com status http 201 e os dados do carro criado;
  - Response com um erro caso o req.body esteja errado;
  - Formato do body: 

  | Atributo | Descrição |
 | :-------: | :-------- |
 | `model`   | Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres |
 | `year`    | Ano de fabricação do veículo. Deve ser maior ou igual a 1900, porém menor ou igual a 2022 |
 | `color`   | Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres |
 | `status`  | Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional |
 | `buyValue` | Valor de compra do veículo. Deve receber apenas números inteiros |
 | `doorsQty` | Quantidade de portas de um carro. Deve ser maior ou igual a 2 e menor ou igual a 4 |
 | `seatsQty` | Quantidade de assentos disponíveis no carro. Deve ser maior ou igual a 2 e menor ou igual a 7 |

</details>

<details>
<summary><strong>get: /cars/:id </strong></summary>

  - Rota para **buscar** carro pelo id
  - É disparado um erro caso o id não seja string, tenha menos de 24 caracteres ou não exista.
  - retorna status 200 e o carro encontrado em caso de sucesso
</details>

<details>
<summary><strong>put: /cars/:id </strong></summary>

   - Rota para **atualizar** carro pelo id
   - É disparado um erro caso o id não seja string, tenha menos de 24 caracteres ou não exista.
   - retorna status 200 e o carro atualizado
</details>

<details>
<summary><strong>delete: /cars/:id </strong></summary>

   - Rota para **excluir** carro pelo id
   - É disparado um erro caso o id não seja string, tenha menos de 24 caracteres ou não exista.
   - retorna status 204.
</details>
</details>
