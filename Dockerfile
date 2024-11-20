FROM node:20-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV BUILD_PRECOMPRESS="false"
ENV BUILD_TRAILING_SLASH="true"
RUN corepack enable

WORKDIR /build/
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store  \
    --mount=type=cache,id=pnpm-modules,target=/build/node_modules \
    pnpm install --frozen-lockfile \
    && pnpm build

FROM nginx:alpine-slim
RUN rm /etc/nginx/conf.d/default.conf
COPY container/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/build/ /var/www/html/
RUN chown -R nginx:nginx /var/www/html/
