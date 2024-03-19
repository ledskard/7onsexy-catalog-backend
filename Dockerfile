# Etapa de compilação: Use a versão mais nova LTS do Node.js para a imagem de compilação
FROM node:18 as builder

# Crie o diretório de trabalho para armazenar os arquivos de código fonte
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale todas as dependências necessárias para o build
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Etapa de produção: Use a versão mais nova LTS do Node.js para a imagem final para manter o tamanho pequeno
FROM node:18

# Crie o diretório de trabalho para armazenar os arquivos da aplicação construída
WORKDIR /usr/src/app

# Copie somente as dependências de produção para reduzir o tamanho da imagem
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Copie os arquivos compilados da etapa de compilação para o diretório de trabalho
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./

# A porta que a aplicação usa
EXPOSE 8080

# Comando para executar a aplicação
CMD [ "node", "dist/app.js" ]
