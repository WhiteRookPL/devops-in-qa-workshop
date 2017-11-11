# Testing *Ansible* roles with *Kitchen* + *InSpec* + *Vagrant*

## Purpose

*InSpec* is a compliance and validation tool that can be used as a test framework too. Main purpose is related with security audits, but it can be used as a replacement for `serverspec`.

## Usage

1. Install *VirtualBox*.
2. Install `vagrant`.
3. Install `bundler`.

## Linux

```bash
kitchen-inspec-vagrant $ gem install bundler
kitchen-inspec-vagrant $ bundle install
kitchen-inspec-vagrant $ bundle exec kitchen test
```

### Windows

And now in order to test you need to invoke following commands:

```cmd
C:\devops-in-qa\kitchen-inspec-vagrant> gem install bundler
C:\devops-in-qa\kitchen-inspec-vagrant> bundle install
C:\devops-in-qa\kitchen-inspec-vagrant> bundle exec kitchen test
```

## References

- [Ansible](http://docs.ansible.com)
- [Vagrant](https://www.vagrantup.com)
- [Kitchen](https://kitchen.ci)
- [InSpec](https://www.inspec.io)