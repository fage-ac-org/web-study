# 多阶段构建，减小最终镜像体积
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# 生产环境镜像，仅包含静态文件和nginx
FROM nginx:1.27-alpine

# 拷贝前端构建产物到nginx目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 覆盖默认配置，启用单页应用路由回退
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]