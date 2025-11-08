// commitlint.config.js
// 这是commitlint的配置文件，用于规范Git提交信息
// 使用 conventional-changelog-angular 规则集，该规则集基于Angular团队的提交规范

// 导入官方推荐的规则集
import conventional from '@commitlint/config-conventional'

// 导出配置对象
export default {
  // 继承官方推荐的规则集
  extends: ['@commitlint/config-conventional'],

  // 自定义规则
  rules: {
    // 配置提交类型枚举，只允许以下几种类型
    'type-enum': [
      2, // 级别：0=禁用 1=警告 2=错误
      'always', // 应用时机：always=总是应用 never=从不应用
      [
        'build', // 构建系统相关更改
        'ci', // CI配置相关更改
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // 修复bug
        'perf', // 性能优化
        'refactor', // 代码重构
        'revert', // 回滚提交
        'style', // 代码格式调整（不影响代码运行的变动）
        'test' // 测试相关更改
      ]
    ],

    // 提交类型必须使用小写
    'type-case': [2, 'always', 'lower-case'],

    // 提交类型不能为空
    'type-empty': [2, 'never'],

    // 提交范围不能为空（可选）
    'scope-empty': [1, 'never'],

    // 提交主题不能为空
    'subject-empty': [2, 'never'],

    // 提交主题必须以英文句号结尾（禁止）
    'subject-full-stop': [2, 'never', '.'],

    // 提交主题首字母不能大写
    'subject-case': [2, 'always', 'lower-case']
  }
}
