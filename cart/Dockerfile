# Node.js base image
FROM node:20-alpine

# çalışma dizini
WORKDIR /app

# package.json ve lock dosyalarını kopyala
COPY package*.json ./

# bağımlılıkları yükle
RUN npm install

# kaynak kodları kopyala
COPY . .

# build al
RUN npm run build

# container içi port
EXPOSE 3000

# start komutu
CMD ["npm", "run", "start"]
