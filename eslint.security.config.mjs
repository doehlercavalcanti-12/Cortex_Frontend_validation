import baseConfig from './eslint.config.mjs';
import securityPlugin from 'eslint-plugin-security';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      security: securityPlugin
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      'security/detect-object-injection': 'off'
    }
  }
];
