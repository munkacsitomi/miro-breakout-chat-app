cd backend
rm -rf node_modules
rm -rf package-lock.json
npm i
wait

cd ../frontend
rm -rf node_modules
rm -rf package-lock.json
npm i
wait

cd ..
docker-compose up