---
description: >-
  Este guia oferece instruções detalhadas para configurar o Progress-Test em um
  ambiente Windows.
---

# 🪟 Configurações para Windows

{% hint style="success" %}
Para uma melhor experiência de desenvolvimento, recomenda-se a instalação do [**Visual Studio Code**](https://code.visualstudio.com/download)**.**
{% endhint %}

## Instalar  WSL

1. No **PowerShell** do Windows, digite o seguinte comando:

```powershell
wsl --install
```

{% hint style="info" %}
Para mais informações, acesse a [Documentação Oficial](https://learn.microsoft.com/pt-br/windows/wsl/install).
{% endhint %}



***

## Instalar Docker Desktop no Windows

{% hint style="info" %}
Siga a [Documentação Oficial](https://docs.docker.com/desktop/install/windows-install/) para saber como instalar o Docker no Windows.
{% endhint %}



***

## Configurar Integração entre o Docker e WSL

1. Acesse as **configurações** **do Docker**.
2. Na aba **Resources**, selecione **WSL Integration**.
3. Marque a integração e **Ubuntu**.\


***

## Configurar Docker

Siga os passos abaixo para configurar a aplicação:

1. Abra o `Terminal` do projeto.
2. Execute o seguinte comando para gerar a base do contêiner:

```bash
sudo docker build --build-arg UID=1000 -t progress-test .
```

{% hint style="warning" %}
**E**ste processo pode levar algum tempo, pois todas as dependências do projeto, bibliotecas e banco de dados serão baixadas.
{% endhint %}

3. Inicie o contêiner do **Docker**.

```bash
docker-compose run --rm $args rails bash
```

4. Crie o banco de dados.

```bash
rails db:create
```

5. Realize as migrações no banco de dados.

```bash
rails db:migrate
```

6. Crie seu usuário.

```bash
bundle exec rake environment "user:create_admin[seu.email@example.com, Seu nome]"
```

7. Popule o banco de dados com os assuntos, exercícios e categorias.

```bash
rails db:seed
```



***

## Configurar Google OAuth

Crie o ID do Cliente OAuth necessário para autenticação com o Google em seu projeto. Este ID do Cliente é essencial para permitir que os usuários façam login usando suas contas do Google.\


***

### Acessar o Console do Google Cloud

1. Abra o [Google Cloud](https://cloud.google.com/?hl=pt-BR) e faça login, utilizando preferencialmente o mesmo e-mail utilizado na criação do usuário.
2. No topo da página, clique em **Console**.
3. Se uma janela abrir pedindo para aceitar os termos de serviço, concorde com os termos e prossiga.\


***

### Acessar as Configurações de Credenciais

1. No menu da esquerda (se estiver escondido, clique nas três linhas horizontais do canto superior esquerdo), selecione **APIs e serviços**.
2. Selecione **Credenciais**.\


***

### Criar um Projeto e a Credencial

1. No canto direito, crie um projeto.
2. No topo da tela, clique em **Criar Credenciais**.
3. Selecione **ID do cliente OAuth**.\


***

### Configurar a Tela de Permissão

1. Clique em **Configurar Tela de Consentimento**.
2. Selecione o tipo **Externo**.
3. Preencha os campos necessários, incluindo o nome do aplicativo e seus detalhes de contato.
4. Ignore os campos opcionais e clique em **Salvar e Continuar**.
5. Nas próximas telas, clique em **Salvar e Continuar** e, na última, em **Voltar para o painel**.\


***

### Criar a Credencial

1. Volte para a janela de credenciais e crie uma nova credencial.
2. Selecione o tipo de aplicativo como **Aplicativo da Web**.
3. Escolha um nome para a credencial.
4. Adicione a URI http://localhost:3000/users/auth/google\_oauth2/callback às **URIs de redirecionamento autorizadas**.
5. Clique em **Criar**.\


***

### Configurar o Arquivo de Ambiente

1. Na pasta do projeto, renomeie o arquivo `.env.example` para `.env`.
2. No novo arquivo, cole o **ID do cliente** da credencial no campo `GOOGLE_OAUTH_CLIENT_ID`.
3. Cole a **Chave secreta do cliente** no campo `GOOGLE_OAUTH_CLIENT_SECRET`.
4. Salve as alterações.\


