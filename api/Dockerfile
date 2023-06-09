########## BUILDER ##########

FROM python:3.10-slim AS builder

RUN apt-get update \
	&& apt-get -y install \
		gcc \
		g++ \
		libpq-dev  && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists*

RUN useradd -rm -d /home/pcapi -u 1000 pcapi

USER pcapi

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt ./

ENV PATH=$PATH:/home/pcapi/.local/bin

RUN pip install --no-cache-dir --user \
	--requirement ./requirements.txt

########## SOURCES ##########

FROM python:3.10-slim AS sources

RUN mkdir -p /tmp/src

WORKDIR /tmp/src

COPY . .

RUN rm -rf tests/ pyproject.toml

######### LIB ##########

FROM python:3.10-slim AS lib

RUN useradd -rm -d /home/pcapi -u 1000 pcapi

ENV PATH=$PATH:/home/pcapi/.local/bin

RUN apt-get update \
	&& apt-get --no-install-recommends -y install \
		libglib2.0-0 \
		libpango-1.0-0 \
		libpangoft2-1.0-0 \
		libpq5 \
		libxmlsec1-openssl \
		xmlsec1 && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists*

COPY --from=builder /home/pcapi/.local /home/pcapi/.local

WORKDIR /usr/src/app

COPY --from=sources /tmp/src .

RUN chown -R pcapi:pcapi .

USER pcapi

######### DEV ##########

FROM lib AS api-flask

USER root

RUN apt-get update && \
    apt-get --no-install-recommends -y install postgresql-client  && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists*

USER pcapi

RUN pip install --no-cache-dir --user -e .

######### PRODUCTION #########

FROM lib AS pcapi

WORKDIR /usr/src/app

RUN pip install \
		--no-cache-dir \
		--editable .

ENTRYPOINT exec ./entrypoint.sh

######### CONSOLE #########

FROM pcapi AS pcapi-console

USER root

RUN apt update && \
    apt install --no-install-recommends -y curl less gnupg2 && \
    curl -s https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /etc/apt/trusted.gpg.d/pgsql.gpg && \
    echo "deb [signed-by=/etc/apt/trusted.gpg.d/pgsql.gpg] http://apt.postgresql.org/pub/repos/apt/ `. /etc/os-release && \
    echo $VERSION_CODENAME`-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    apt update && \
    apt --no-install-recommends -y install postgresql-client-12 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists*

USER pcapi

######### TESTS #########

FROM pcapi-console AS pcapi-tests

USER root

RUN apt-get update && \
    apt-get install -y git --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists*

COPY --chown=pcapi:pcapi tests/ tests
COPY --chown=pcapi:pcapi pyproject.toml .

USER pcapi
