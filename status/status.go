package status

import (
	"log"
	"net/http"
	"sync"
	"time"
)

const MAX_DURATIONS = 100

type lockingStore struct {
	sync.RWMutex
	last      time.Time
	durations []time.Duration
}

func (s *lockingStore) AddDuration(d time.Duration) {
	s.Lock()
	defer s.Unlock()
	s.durations = append([]time.Duration{d}, s.durations...)
	if len(s.durations) > MAX_DURATIONS {
		s.durations = s.durations[0:MAX_DURATIONS]
	}
	s.last = time.Now()
}

var store lockingStore = lockingStore{}

func Check() {
	d, _ := httpStatus()
	log.Println(d)
	store.AddDuration(d)
}

func Last() time.Time {
	store.RLock()
	defer store.RUnlock()
	return store.last
}

func Seconds() []float64 {
	store.RLock()
	defer store.RUnlock()
	seconds := make([]float64, len(store.durations))
	for i, d := range store.durations {
		seconds[i] = d.Seconds()
	}
	return seconds
}

func AverageDuration() float64 {
	store.RLock()
	defer store.RUnlock()
	totalSeconds := 0.0
	for _, d := range store.durations {
		totalSeconds += d.Seconds()
	}
	return totalSeconds / float64(len(store.durations))
}

func httpStatus() (time.Duration, error) {
	start := time.Now()
	resp, err := http.Get("https://pgorelease.nianticlabs.com/plfe/")
	d := time.Since(start)
	if err == nil {
		resp.Body.Close()
	}
	return d, err
}
