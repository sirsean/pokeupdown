package main

import (
	"github.com/sirsean/pokeupdown/poll"
	"github.com/sirsean/pokeupdown/server"
	"log"
)

func main() {
	log.Println("starting pokeupdown")

	go poll.Start()

	server.Serve()
}
