#!/usr/bin/env bash

sudo docker run -v "`pwd`/src/results":"/opt/ocai/results" -p 8080:8080 ocai-survey