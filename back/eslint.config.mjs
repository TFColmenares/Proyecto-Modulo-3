import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, '@stylistic': stylistic },
    extends: ['js/recommended'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    rules: {
      '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }], // Indentación de 2 espacios, casos de switch indentados
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true }], // Comillas simples, permite comillas dobles si es necesario escapar
      '@stylistic/semi': ['error', 'always'], // Siempre punto y coma al final de las sentencias
      '@stylistic/comma-dangle': ['error', 'always-multiline'], // Comas colgantes en multilínea (ej. en objetos, arrays)
      '@stylistic/array-bracket-spacing': ['error', 'never'], // Sin espacios dentro de los corchetes de los arrays
      '@stylistic/object-curly-spacing': ['error', 'always'], // Espacios dentro de las llaves de los objetos
      '@stylistic/block-spacing': ['error', 'always'], // Espacios dentro de los bloques de código (ej. `if () { return; }`)
      '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }], // Estilo de llaves One True Brace Style (1tbs), permite en una sola línea
      '@stylistic/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // Espacios alrededor de dos puntos en propiedades de objetos
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }], // Espacios alrededor de palabras clave (if, else, for)
      '@stylistic/space-before-blocks': ['error', 'always'], // Espacios antes de bloques de código
      '@stylistic/space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }], // Espacios antes de paréntesis de función
      '@stylistic/space-in-parens': ['error', 'never'], // Sin espacios dentro de los paréntesis
      '@stylistic/space-infix-ops': 'error', // Espacios alrededor de operadores infijos (ej. a + b)
      '@stylistic/space-unary-ops': ['error', { 'words': true, 'nonwords': false }], // Espacios alrededor de operadores unarios
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }], // Espacios alrededor de flechas en funciones flecha
      '@stylistic/computed-property-spacing': ['error', 'never'], // Sin espacios dentro de corchetes computados
      '@stylistic/dot-location': ['error', 'property'], // Ubicación del punto en llamadas de método (después del nombre del objeto)
      '@stylistic/eol-last': ['error', 'always'], // Asegura una nueva línea al final del archivo
      '@stylistic/no-trailing-spaces': 'error', // No permitir espacios al final de las líneas
      '@stylistic/no-whitespace-before-property': 'error', // No permitir espacios antes de propiedades de objeto
      '@stylistic/rest-spread-spacing': ['error', 'never'], // Sin espacios en operadores rest/spread
      '@stylistic/template-curly-spacing': ['error', 'never'], // Sin espacios dentro de template literals
      '@stylistic/type-annotation-spacing': 'error', // Espacios alrededor de las anotaciones de tipo (TypeScript)
      '@stylistic/member-delimiter-style': ['error', { // Estilo de delimitadores de miembros en interfaces/tipos
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
        'multilineDetection': 'brackets',
      }],

      // Desactivar 'prefer-const' (si aún la quieres desactivada, como mencionaste)
      'prefer-const': 'off',

      // Reglas de TypeScript-ESLint
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }], // Variables no usadas (ignora las que empiezan con _)
      '@typescript-eslint/no-explicit-any': 'warn', // Advertir sobre el uso de 'any'
      '@typescript-eslint/no-empty-interface': 'off', // Permitir interfaces vacías si es necesario
    },
  },
]);
