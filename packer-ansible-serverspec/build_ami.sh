#!/usr/bin/env bash

AWS_PROFILE="private-packer" packer build -var "aws_region=eu-central-1" -var "source_ami=ami-fa2df395" builder.json
