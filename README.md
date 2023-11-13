# App

# Requisitos Funcionais

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível contar o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o hisórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

# Regras de Negócio

- [X] O usuário não pode cadastrar com um email duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado 20min após ter sido criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

# Requisitos Não Funcionais

- [X] A senha do usuário deve estar criptografada;
- [] Os dados da aplicação da aplicação precisam estar persisitdos em um banco PostgreSQL;
- [] Todas as listas de dados devem estar paginados com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token)

