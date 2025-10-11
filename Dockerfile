# 多阶段构建，减小最终镜像体积
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# 生产环境镜像，仅包含静态文件和nginx
FROM nginx:1.27-alpine

# 删除默认配置，复制自定义nginx配置（如有需要可自定义）
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝前端构建产物到nginx目录
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]