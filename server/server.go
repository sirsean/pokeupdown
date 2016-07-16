package server

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/sirsean/pokeupdown/status"
	"html/template"
	"log"
	"net/http"
)

func Serve() {
	router := mux.NewRouter()

	router.HandleFunc("/", index).Methods("GET")
	router.HandleFunc("/api/status", apiStatus).Methods("GET")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/src/github.com/sirsean/pokeupdown/static/")))

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":80", router))
}

var indexTemplate = template.Must(template.ParseFiles("/src/github.com/sirsean/pokeupdown/template/index.html"))

func index(w http.ResponseWriter, r *http.Request) {
	indexTemplate.Execute(w, nil)
}

type statusResponse struct {
	Durations []float64 `json:"durations"`
}

func apiStatus(w http.ResponseWriter, r *http.Request) {
	response := statusResponse{
		Durations: status.Seconds(),
	}

	w.Header().Set("Content-Type", "application/json")
	payload, _ := json.Marshal(response)
	w.Write(payload)
}
