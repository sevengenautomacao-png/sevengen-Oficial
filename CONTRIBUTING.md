# Como publicar no GitHub

Este guia irá ajudá-lo a publicar o código do seu projeto em um repositório no GitHub.

## Passos

Siga estes passos no terminal, dentro do diretório do seu projeto:

### 1. Crie um novo repositório no GitHub

Acesse [github.com/new](https://github.com/new) e crie um novo repositório. Não o inicialize com um `README` ou arquivo `.gitignore`, pois o seu projeto já os possui.

### 2. Inicialize o Git no seu projeto local

Se você ainda não tem um repositório Git iniciado, execute o comando abaixo. Se você já tem, pode pular para o próximo passo.

```bash
git init -b main
```

### 3. Adicione todos os arquivos ao Git

Este comando adiciona todos os arquivos do projeto para serem monitorados pelo Git.

```bash
git add .
```

### 4. Faça o commit inicial

"Commitar" os arquivos salva o estado atual deles no histórico do Git.

```bash

```

### 5. Conecte seu repositório local ao GitHub

Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados do GitHub.

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

### 6. Envie seu código para o GitHub

Este comando envia os arquivos do seu computador para o repositório no GitHub.

```bash
git push -u origin main
```

Após seguir esses passos, seu código estará disponível no seu repositório do GitHub e você poderá continuar a trabalhar, enviando novas alterações conforme avança no desenvolvimento.
