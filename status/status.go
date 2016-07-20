package status

import (
	"fmt"
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
	d, err := httpStatus()
	log.Println(d, err)
	// if there was an error, we don't want to say "they're up" even though the error happened fast
	if err != nil {
		d += 10 * time.Second
	}
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
	if !isStatusOkay(resp.StatusCode) {
		err = fmt.Errorf("unsuccessful status code: %v", resp.StatusCode)
	}
	return d, err
}

func isStatusOkay(code int) bool {
	return (code >= 200) && (code < 300)
}
