FROM node:18

RUN apt-get update && apt-get install -y \
    git \
    zsh \
    wget \
    curl

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc