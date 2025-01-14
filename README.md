# freelancer-service-manager-web
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Este projeto consiste em 1 de 3 módulos(web, negócios e chatbot) de um sistema para agendamentos de trabalhos oferecidos por prestadores de serviço autônomos.

Foram desenvolvidas oito páginas, cada uma com seus respectivos componentes, para atender aos casos de uso definidos. O fluxo de cadastro foi dividido em três etapas: inicialmente, o
prestador realiza o cadastro, seguido pelo cadastro do serviço e, por último, o cadastro do bot.
Nesse sentido, a partir das telas de cadastro e login, as demais páginas são configuradas como
privadas, exigindo que o usuário esteja autenticado para acessá-las.

Quando um usuário faz login, o servidor gera um token que contém informações relevantes
sobre a sessão, como o identificador do usuário. Esse token é armazenado no próprio navegador
e enviado no cabeçalho das requisições, permitindo que o servidor verifique a autenticidade
do usuário.

Após o cadastro do bot, o prestador é redirecionado para a página principal, que renderiza
o calendário do mesmo. A partir da página principal, o prestador pode navegar para outras
três páginas por meio do menu lateral: a página de dashboard, a página de edição de dados
cadastrais e a página de mensagens recebidas.

## Tecnologias utilizadas
- React
- Typescript
- CSS / TailwindCSS
## Exemplos
- Página onde prestadores podem cadastram um novo bot
- <img src="https://github.com/user-attachments/assets/06501e20-6a2a-4590-b471-15cb2324eae9" alt="resultados-web-cadastro4" width="700"/>
- <img src="https://github.com/user-attachments/assets/5be3157e-d365-4ce9-9072-4579c38b425d" alt="resultados-web-cadastro5" width="700"/>

- Dashboard
- <img src="https://github.com/user-attachments/assets/9fe8b098-9a8e-4b9b-ad2a-e34c7aef1a32" alt="resultados-web-cadastro6" width="700"/>

- Calendário
- <img src="https://github.com/user-attachments/assets/4c6ebacd-5ed7-4299-b603-a58627ee6617" alt="resultados-web-cadastro6" width="700"/>

- Chat
- <img src="https://github.com/user-attachments/assets/878f7bd7-5372-4585-b856-7b5a1570dd09" alt="resultados-web-cadastro6" width="700"/>
