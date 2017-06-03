# Testing *Ansible* roles with *Kitchen* + *InSpec* + *Vagrant*

## Purpose

## Usage 

1. Install *VirtualBox*.
2. Install `vagrant`.
3. Install `chefdk`.

## Linux

```bash
kitchen-inspec-vagrant $ chef exec gem install bundler
kitchen-inspec-vagrant $ chef exec bundle install
kitchen-inspec-vagrant $ kitchen test
```

### Windows

And now in order to test you need to invoke following commands:

```cmd
C:\devops-in-qa\kitchen-inspec-vagrant> chef exec gem install bundler
C:\devops-in-qa\kitchen-inspec-vagrant> chef exec bundle install
C:\devops-in-qa\kitchen-inspec-vagrant> kitchen test
```

## References

- [Ansible](http://docs.ansible.com)
- [Vagrant](https://www.vagrantup.com)
- [Kitchen](https://kitchen.ci)
- [InSpec](https://www.inspec.io)