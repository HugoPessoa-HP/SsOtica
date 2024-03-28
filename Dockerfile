FROM node

WORKDIR /app

COPY package-lock.json package.json 

COPY . . /app/

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3003 

CMD ["npm", "run", "start"]