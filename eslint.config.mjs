import nextConfig from 'eslint-config-next'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'src/data/generated/**'],
  },
  ...nextConfig,
  eslintConfigPrettier,
]
