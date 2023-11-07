# Requisitos

-   Docker (Gerenciador de container)
-   [Node.js](https://nodejs.org/en)

[Instalando Docker no Windows](https://docs.docker.com/desktop/install/windows-install/)

# Setup Linux

-   Execute `./scripts/setup` para gerar a base do container, esse processo pode demorar um pouco pois será baixada todas as depêndencias do projeto, libs e banco de dados.
-   Execute `docker-compose run --rm $args rails bash` para executar comandos você precisa entrar no console do container, agora você poderar por exemplo rodar as migrações de dados.
-   Execute `rails db:migrate` para rodar as migrações no banco de dados.
-   Execute `bundle exec rake environment "user:create_admin[seu.email@example.com, Seu nome]"` para criar seu usuário
-   Execute `rails db:seed` para popular o banco com os assuntos, exios e categorias

# Setup Windows

-   Execute `docker build --build-arg UID=1000 -t progress-test .` para gerar a base do container, esse processo pode demorar um pouco pois será baixada todas as depêndencias do projeto e libs.
-   Execute `docker-compose run --rm rails rails db:create` para criar o banco de dados. Também pode ser demorado.
-   Execute `docker-compose run --rm $args rails bash` para executar comandos você precisa entrar no console do container, agora você poderar por exemplo rodar as migrações de dados.
-   Execute `rails db:migrate` para rodar as migrações no banco de dados.
-   Execute `bundle exec rake environment "user:create_admin[seu.email@example.com, Seu nome]"` para criar seu usuário
-   Execute `rails db:seed` para popular o banco com os assuntos, exios e categorias

# Configurar o Google OAuth

[Tutorial oficial de como criar o ID do Cliente](https://support.google.com/workspacemigrate/answer/9222992?hl=pt)

-   Abra o [Google Cloud](https://cloud.google.com/?hl=pt-BR) e faça login (de preferência com o mesmo e-mail que foi utilizado na criação do usuário).
-   No topo, clique em "Console".
-   Se uma janela abrir pedindo para aceitar os termos de serviço, concorde com os termos e continue.
-   No menu da esquerda (se estiver escondido, clique nas três linhas horizontais do canto superior esquerdo), e clique em "APIs e serviços".
-   No menu da esquerda, clique em "Credenciais".
-   No topo da tela, clique em "CRIAR CREDENCIAIS".
-   Selecione "ID do cliente OAuth".
-   Configure a tela de permissão, caso não tenha uma.
    -   Clique em "CONFIGURAR TELA DE CONSENTIMENTO".
    -   Selecione o tipo "Externo".
    -   Clique em "CRIAR".
    -   Escolha um nome para o App (qualquer) e selecione seu e-mail nos campos de "E-mail para suporte do usuário" e "Dados de contato do desenvolvedor".
    -   Ignore os outros campos e clique em "SALVAR E CONTINUAR".
    -   Nas próximas telas, clique em "SALVAR E CONTINUAR", e na útltima, em "VOLTAR PARA O PAINEL".
    -   Volte para janela de credenciais e novamente crie uma credencial.
-   Selecione o tipo de aplicativo (Aplicativo da Web).
-   Escolha um nome
-   Adicione a URI `http://localhost:3000/users/auth/google_oauth2/callback` às "URIs de redirecionamento autorizadas".
-   Clique em criar.
-   Mantenha a janela aberta.
-   Copie o arquivo `.env.example` e renomeie para `.env`.
-   No novo arquivo, copie o "ID do cliente" da credencial e cole no campo `GOOGLE_OAUTH_CLIENT_ID`.
-   Copie a "Chave secreta do cliente" no campo `GOOGLE_OAUTH_CLIENT_SECRET`.
-   Salve.

OBSERVAÇÃO:
Essa etapa só precisa ser realizada uma vez. Em qualquer outra instância do projeto, o "ID do cliente" e a "Chave secreta do cliente" podem ser reutilizados.

# Levantar a aplicação

-   Execute `docker-compose up`

OBSERVAÇÃO:
Caso alguns elementos não carreguem corretamente, execute `yarn install` ou `npx yarn install` para baixar as dependências restantes.
