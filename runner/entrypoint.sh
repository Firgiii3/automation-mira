#!/bin/bash

./config.sh \
  --url https://github.com/USERNAME/REPO-KAMU \
  --token ${RUNNER_TOKEN} \
  --name "docker-local-runner" \
  --unattended \
  --replace

./run.sh