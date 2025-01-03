# Projeto Rede Social

<div align="center">
 <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
 <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

<p align="center">Rede Social desenvolvida com React e Express</p>

<div align="center">
 <img src="https://github.com/user-attachments/assets/6d78ceaa-2fdd-44f9-86c5-550b7eee55d7" width="70%" alt="Preview 1"/>
 <img src="https://github.com/user-attachments/assets/f2bc283e-64e5-458e-82e9-f8c22a8c8d60" width="70%" alt="Preview 2"/>
 <img src="https://github.com/user-attachments/assets/677a2b21-53e9-4c00-abd0-20f806dce909" width="70%" alt="Preview 3"/>
 <img src="https://github.com/user-attachments/assets/83c46da3-6beb-4ef3-ad61-662d3286d441" width="70%" alt="Preview 4"/>
</div>

---

## Requisitos

- **Docker**

---

## Como instalar e rodar o projeto

1. **Baixe o repositório**
   - Clone este repositório em sua máquina local.

2. **Criar algumas pastas**
   - Crie as seguintes pastas na pasta `/server`:
     - `/server/public/images/user/avatar`: Pasta onde os avatares dos usuários vão ficar armazenado.
     - `/server/public/images/user/banner`: Pasta onde os avatares dos banners vão ficar armazenado.

3. **Criação dos arquivos `.env`**
   - Crie dois arquivos `.env`, um para o servidor e outro para o cliente.

   - **Servidor (`/server/.env`):**
     ```env
     SECRET="gato" # Segredo usado no JWT
     PORT=8080 # Porta do servidor backend
     ```

   - **Cliente (`/client/.env`):**
     ```env
     VITE_baseURL="http://localhost:8080/api" # URL da API do servidor
     VITE_publicURL="http://localhost:8080" # URL para os arquivos estáticos no servidor
     ```

4. **Subindo o projeto com Docker**
   - Na raiz do projeto, execute o comando:
     ```bash
     docker-compose up
     ```

---
