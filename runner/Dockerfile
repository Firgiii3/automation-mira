FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm \
    docker.io

WORKDIR /runner

# Download GitHub Actions runner
RUN curl -o actions-runner-linux-x64.tar.gz -L \
    https://github.com/actions/runner/releases/download/v2.317.0/actions-runner-linux-x64-2.317.0.tar.gz \
    && tar xzf actions-runner-linux-x64.tar.gz \
    && rm actions-runner-linux-x64.tar.gz

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]