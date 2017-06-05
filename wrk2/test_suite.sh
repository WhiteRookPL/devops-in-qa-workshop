#!/bin/bash

./wrk2/wrk -t 16 -c 800 -d 10m -R 500 --latency -s generator.lua "http://localhost:9002" 2>&1 | tee ./results/s1_16t_800c_10md_r0500.out