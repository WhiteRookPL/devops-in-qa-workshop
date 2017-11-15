# *Slack* chat bot - `hubot` inside of `docker` container

## Purpose

<p align="center">
   <img src="https://github.com/WhiteRookPL/devops-in-qa-workshop/raw/master/docker-hubot-slack/docs/diagram.png" />
</p>

Having chat bot is one of the most entertaining thing, but it can be really useful and handy in various situations (e.g. extracting graphs and pasting them as screen shots into *IM* channels or *CI/CD* pipeline integrations).

## Usage on *Linux* 

1. Install `docker`.
2. Invoke `build_image.sh` script.
3. Invoke `launch.sh` script passing *Slack* integration token as a first argument.

## References

- [docker](https://www.docker.com)
- [Hubot](https://hubot.github.com/docs)
- [Slack chat bot integrations](https://slackapi.github.io/hubot-slack)
