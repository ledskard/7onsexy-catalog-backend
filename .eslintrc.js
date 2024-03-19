module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  root: true,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    '@typescript-eslint/eslint-plugin'
  ],
  rules: {
    // Prettier rules
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'none', printWidth: 100 }],

    // Jest rules
    'jest/no-standalone-expect': 'off',
    'jest/no-try-expect': 'warn',
    'jest/expect-expect': 'off',

    // Typescript rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '_'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      {
        allowArgumentsExplicitlyTypedAsAny: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { variables: false, functions: false, classes: false }
    ],

    // General rules
    'no-unused-vars': 'off',
    camelcase: ['off'],
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    indent: 'off',
    'max-len': 'off',
    'comma-dangle': 'off',
    'no-throw-literal': 'off',
    'no-prototype-builtins': 'off',
    'no-new': 'off',
    'no-restricted-syntax': 'off',
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-useless-constructor': 'off',
    'no-underscore-dangle': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'dot-notation': 'off',

    // Import Helpers plugin
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['module', '/^@server/shared/', '/^@/', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ]
  },
  overrides: [
    {
      // Enable the rule specifically for TypeScript files
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn'
      }
    }
  ]
};
