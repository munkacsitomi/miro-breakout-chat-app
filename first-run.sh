docker pull mongo:latest

cd backend
npm i
wait

cd ../frontend
npm i
wait

cd ..
docker-compose up -d