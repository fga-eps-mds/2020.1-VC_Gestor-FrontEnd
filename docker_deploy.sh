docker stop vcg_front-end
docker rm vcg_front-end
docker run --name=vcg_front-end --restart unless-stopped -d -p 3001:3000 --network="ubuntu_backend" --ip="172.25.0.5" $1
docker cp apiUser.js vcg_front-end:/app/src/services/apiUser.js
docker cp apiNoticias.js vcg_front-end:/app/src/services/apiNoticias.js
docker cp apiBeneficio.js vcg_front-end:/app/src/services/apiBeneficio.js
docker cp apiPostagem.js vcg_front-end:/app/src/services/apiPostagem.js
docker system prune -a -f