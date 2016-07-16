# Poké Up/Down

Determine whether the Pokemon Go servers are currently online.

It runs in Docker.

# Build

Install some Node stuff:

```
npm install -g browserify
npm install
```

Compile the Javascript:

```
./compile.sh
```

Build the Docker image:

```
docker build -t pokeupdown .
```

# Run

```
./dev_run.sh
```

# Use

Then you can access it at http://192.168.99.100:2101
