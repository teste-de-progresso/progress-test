---
description: >-
  Este guia oferece instruções detalhadas para configurar o Progress-Test em um
  ambiente Windows.
---

# 🪟 Configurações para Windows



## Instalar  WSL

***

1. No PowerShell do Windows, digite o seguinte comando:
2.  Inicie o contêiner do Docker.

    ```bash
    docker-compose run --rm $args rails bash
    ```
3.  Crie o banco de dados.\


    ````
    ```bash
    docker-compose run --rm $args rails bash
    ```
    ````

````
```bash
docker-compose run --rm $args rails bash
```
````

```powershell
wsl --install
```

```
PRIMEIRO PASSO

Instalar o WSL no Windows

Abra o PowerShell do Windows e rode o seguinte comando:

1 - wsl --install

=====================================================================================================================
SEGUNDO PASSO

Baixar Docker Descktop e configurar integração entre o Docker Desktop e o WSL.

1 - Acessar o Docker Desktop e ir nas configurações

2 - Acessar a aba Resources e dentro dela WSL integration

3 - Marcar a integração e Ubuntu

=====================================================================================================================
TERCEIRO PASSO

No terminal WSL dentro do Visual Studio Code no deiretório raiz do projeto seguir o seguinte passo a passo:

1 - sudo docker build --build-arg UID=1000 -t progress-test .

2 - sudo docker-compose run --rm $args rails bash

3 - bundle install --gemfile /progress-test/Gemfile

4 - rails db:create
 
5 - rails db:migrate

5 - bundle exec rake environment "user:create_admin[seu.email@example.com, Seu nome]"

6 - rails db:seed

=====================================================================================================================
QUARTO PASSO

Configuração Google Auth =)

=====================================================================================================================
QUINTO PASSO

Rodar a aplicação

1 - docker-compose up
```
