## Descrição
### Tarefas Plus 🤗
Este Projeto lembra muito um TodoList, mas com um alguns upgrades. O site com conta com autenticação google

https://tarefas-sh4kaa.vercel.app

## Funcionamento
Você cria uma tarefa, essa tarefa pode ser pública ou privada. Sendo possível compartilhar o link da tarefa com outras pessoas, fazer comentários nas tarefas que são públicas
Só é possivel usar após a autenticaçao, tarefas compartilhadas podem ser visualizadas, mas para comentar é preciso estar autenticado

## Conceito
Nesse projeto foi abordado o conceito SSR(server-side-rendering) e ISR(Incremental Static Regeneration). As requisições ao banco são feitas pelo server-side e a página home, onde é exibida a quantidade de posts e comentários, essa página é uma página estática utilizando o conceito de ISR.
O html é gerado pelo javascript uma única vez no intervalo de 60 segundos, contando à partir do acesso de um usuário ao site. Se outro usuário acessar o site dentro desse intervalo, não será feita uma nova requisição ao servidor, só após os 60 segundos. Todas essas funcionalidades são proporcionadas por meio do framework Next

## Instalação

Execute o em modo desenvolvedor:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Tecnologias utilizadas no projeto
- ReactJS
- NextJS
- Banco do Firebase / Firestorm

![react-svgrepo-com](https://github.com/Sh4kaa/tarefas/assets/27507717/40caf372-acaf-4273-90a0-ec5c65e90bfd)
![nextjs-fill-svgrepo-com](https://github.com/Sh4kaa/tarefas/assets/27507717/7d6cca1c-f4a8-4e23-9246-ef0afd6ab1f0)
![firebase-svgrepo-com](https://github.com/Sh4kaa/tarefas/assets/27507717/8a198883-ec0f-4bba-832e-10e84e05f25c)

## Prints

![image](https://github.com/Sh4kaa/tarefas/assets/27507717/e9703d3a-b6d4-4bae-85b2-c3f39143a66c)
![image](https://github.com/Sh4kaa/tarefas/assets/27507717/8916e3f9-2db2-41ed-ac92-b517896c342d)
![image](https://github.com/Sh4kaa/tarefas/assets/27507717/9f097947-63b7-4daa-82dc-f98f76d16621)



## Deploy on Vercel 😀

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
