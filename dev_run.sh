./compile.sh
docker build -t pokeupdown .
docker stop pokeupdown
docker rm pokeupdown
docker rmi $(docker images -q -f dangling=true)
docker run \
    -p 2101:80 \
    --name pokeupdown \
    -d \
    pokeupdown
docker logs -f --tail=20 pokeupdown
