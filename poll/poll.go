package poll

import (
	"github.com/sirsean/pokeupdown/status"
	"time"
)

func Start() {
	for {
		status.Check()
		time.Sleep(2 * time.Second)
	}
}
