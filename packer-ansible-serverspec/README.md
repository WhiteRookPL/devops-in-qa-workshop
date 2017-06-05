# Testing *Ansible* baked *AWS AMI* by *Packer* by *Serverspec*

## Purpose

## Usage on *Linux*

1. Install *packer*.
2. Install *Ansible*.
3. Create *AWS* account and create there *CloudFormation* stack based on file from [here](cloud-formation/iam-for-packer.yml).
4. Install `aws-cli` and configure keys exported from that stack in that tool.
5. Invoke `build_ami.sh` and wait for *AMI* produced by that tool.

## References

- [Ansible](http://docs.ansible.com)
- [Packer](https://www.packer.io/docs/builders/amazon-ebs.html)
- [Serverspec](http://serverspec.org)