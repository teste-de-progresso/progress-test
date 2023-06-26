# Requisitos
- Docker (Gerenciador de container)

[Instalando Docker no Windows](https://docs.docker.com/desktop/install/windows-install/)

# Setup
- Execute `./scripts/setup` para gerar a base do container, esse processo pode demorar um pouco pois será baixada todas as depêndencias do projeto, libs e banco de dados.
- Execute `docker-compose run --rm $args rails bash` para executar comandos você precisa entrar no console do container, agora você poderar por exemplo rodar as migrações de dados.
- Execute `rails db:migrate` para rodar as migrações no banco de dados.
- Execute `bundle exec rake environment "user:create_admin[sem.email@example.com, Seu nome]"` para criar seu usuário
- Execute `rails db:seed` para popular o banco com os assuntos, exios e categorias

# Levantar a aplicação
- Execute `docker-compose up`
