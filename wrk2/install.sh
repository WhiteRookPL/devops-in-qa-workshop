#!/usr/bin/env bash

sudo yum install openssl-devel git

cd /tmp
git clone https://github.com/giltene/wrk2.git

cd /wrk2
make