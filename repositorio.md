---
description: >-
  Neste guia, você aprenderá como realizar um fork do repositório no GitHub, um
  processo essencial para colaborar no projeto.
---

# 📂 Repositório

## Faça Login no GitHub

***

1. Acesse [GitHub](https://github.com/).
2. Faça login na sua conta com seu nome de usuário e senha.

##

## Faça o Fork do Repositório

***

1. Na página do [repositório](https://github.com/teste-de-progresso/progress-test), clique no botão **Fork** no canto superior direito da tela.



## Clone o Repositório Forkado

***

1. Após o fork, você será redirecionado para a página do seu novo repositório (a cópia do original).
2. Clique no botão **Code** (ou **Código** se estiver em português) e copie o URL do repositório.
3. Abra o terminal ou prompt de comando no seu computador.
4. Navegue até o diretório onde você deseja clonar o repositório.
5.  Execute o seguinte comando para clonar o repositório forkado:

    ```bash
    git clone <URL do seu repositório forkado>
    ```

    Substitua `<URL do seu repositório forkado>` pelo URL que você copiou anteriormente.

##

## Configure o Repositório Remoto

***

1.  Navegue até o diretório do repositório clonado:

    ```bash
    cd <nome-do-repositório>
    ```
2.  Adicione o repositório original como um repositório remoto chamado `upstream` para que você possa buscar as mudanças mais recentes:

    ```bash
    git remote add upstream <URL do repositório original>
    ```

    Substitua `<URL do repositório original>` pelo URL do repositório que você fez o fork.

##

## Sincronize seu Fork com o Repositório Original

***

Para garantir que seu fork esteja atualizado com as mudanças mais recentes do repositório original:

1.  Busque as atualizações do repositório original:

    ```bash
    git fetch upstream
    ```
2.  Certifique-se de estar na branch `main`:

    ```bash
    git checkout main
    ```
3.  Mescle as atualizações do repositório original na sua branch `main`:

    ```bash
    git merge upstream/main
    ```

    Substitua `main` pelo nome da branch principal, se for diferente.

##

## Crie uma Branch para a Nova Funcionalidade ou Correção

***

No Gitflow, é uma boa prática criar uma nova branch para cada funcionalidade ou correção que você estiver trabalhando. Isso mantém o histórico de mudanças organizado e facilita a colaboração.

1.  Crie uma nova branch a partir da `main`:

    ```bash
    git checkout -b feature/nome-da-sua-branch
    ```

    Substitua `feature/nome-da-sua-branch` por um nome descritivo para a sua nova funcionalidade ou correção.

##

## Faça Modificações e Envie as Mudanças

***

1. Faça as modificações desejadas no código.
2.  Adicione e faça commit das suas mudanças:

    ```bash
    git add .
    git commit -m "Descrição das suas mudanças"
    ```
3.  Envie suas mudanças para o seu repositório forkado:

    ```bash
    git push origin feature/nome-da-sua-branch
    ```

##

## Crie um Pull Request

***

1. Volte para a página do seu repositório forkado no GitHub.
2. Clique no botão **Pull Request**.
3. Clique no botão **New Pull Request**.
4. Compare as mudanças entre a sua branch e a branch principal do repositório original.
5. Clique no botão **Create Pull Request**.
6. Adicione um título e uma descrição detalhada para o seu Pull Request, explicando as mudanças feitas.
7. Clique em **Create Pull Request** novamente para enviar suas mudanças.

##

## Mantenha Seu Fork Atualizado

***

Para manter seu fork sempre atualizado com as mudanças mais recentes do repositório original:

1.  Busque e mescle as atualizações regularmente:

    ```bash
    git fetch upstream
    git checkout main
    git merge upstream/main
    ```
2.  Se necessário, atualize suas branches de funcionalidade:

    ```bash
    git checkout feature/nome-da-sua-branch
    git merge main
    ```
