FROM debian:latest

MAINTAINER Sean Schulte

RUN apt-get update --yes # 2016-07-16
RUN apt-get dist-upgrade --yes

RUN apt-get install --yes \
    curl \
    git

RUN curl -O https://storage.googleapis.com/golang/go1.6.2.linux-amd64.tar.gz

RUN tar -C /usr/local -xzf go1.6.2.linux-amd64.tar.gz

ENV PATH $PATH:/usr/local/go/bin

ENV GOPATH /

ADD . /src/github.com/sirsean/pokeupdown
WORKDIR /src/github.com/sirsean/pokeupdown

RUN go version

RUN go get ./...

RUN go build

ENTRYPOINT ["./pokeupdown"]
