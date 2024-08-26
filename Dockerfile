# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY backend/* ./

# Instale as dependências
RUN yarn install

# Copie todo o código da aplicação para o diretório de trabalho
# COPY backend/* ./

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3001

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["yarn", "dev"]
