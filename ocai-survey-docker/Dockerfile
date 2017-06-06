FROM google/nodejs

RUN mkdir /opt/ocai
RUN mkdir /opt/ocai/results

ADD src/ /opt/ocai

WORKDIR /opt/ocai

RUN npm install

CMD ["npm", "start"]