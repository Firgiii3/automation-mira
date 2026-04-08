#!/bin/bash

./config.sh \
  --url https://github.com/Firgiii3/automation-mira \
  --token ${RUNNER_TOKEN} \
  --name "docker-local-runner" \
  --labels "self-hosted,local-docker" \
  --unattended \
  --replace

./run.sh