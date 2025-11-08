# Vue Demo Project

这是一个基于Vue 3、TypeScript和Vite的前端项目示例。

## 项目特点

- 使用Vue 3 Composition API
- TypeScript支持
- Vite构建工具
- Element Plus UI组件库
- Pinia状态管理
- Vue Router路由管理
- Axios网络请求库
- Sass样式预处理器

## 开发规范

### Git提交规范

本项目使用commitlint规范Git提交信息，提交格式遵循[Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 提交类型(type)

- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响代码运行）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回退提交
- **build**: 构建系统或外部依赖的变动

#### 示例

```
feat: 添加用户登录功能
fix: 修复登录页面样式问题
docs: 更新README文档
```

### 代码规范

本项目使用以下工具保证代码质量：

- **Oxlint**: JavaScript/TypeScript代码检查工具
- **Prettier**: 代码格式化工具
- **Husky**: Git钩子工具
- **lint-staged**: 对暂存区文件进行检查和格式化

### 自动化检查

在每次Git提交时，会自动执行以下检查：

1. 使用lint-staged对暂存区的文件进行代码检查和格式化
2. 使用commitlint检查提交信息是否符合规范

## 项目结构

```
src/
├── api/            # API接口封装
├── assets/         # 静态资源
├── components/     # 公共组件
├── router/         # 路由配置
├── stores/         # 状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数
├── views/          # 页面视图
├── App.vue         # 根组件
└── main.ts         # 入口文件
```

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产环境代码
npm run build

# 预览生产环境构建
npm run preview

# 代码检查
npm run lint

# 修复代码问题
npm run lint:fix

# 格式化所有文件
npm run prettier

# 检查最近一次提交信息
npm run commitlint
```

## 环境配置

项目使用`.env`文件进行环境配置：

- `.env`: 默认环境配置
- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

## 部署

项目支持Docker部署，使用Nginx作为Web服务器。
