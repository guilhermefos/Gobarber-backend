# Recuperacão de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com as instrucões de recuperacão de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios em producão;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negocio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualizacão do perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**Regras de Negocio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificaão sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificacões não lidas;


**Requisitos Não Funcionais**

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificacões do prestador devem ser armazenadas no MongoDB;
- As notificacões do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negocio**

- A notificacão deve ter um status de lida ou não lida

# Agendamento de servicos

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de servico cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;
  
**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;


**Regras de Negocio**

- Cada agendamento deve durar 1h exatamento;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, ùltimo às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar servicos consigo mesmo;