import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // 🚫 Prohibir console.log
      'no-console': ['error', { allow: ['warn', 'error'] }],
      
      // 🚫 Prohibir variables y funciones en español
      'id-match': [
        'error',
        '^[a-zA-Z_$][a-zA-Z0-9_$]*$',
        {
          'properties': true,
          'onlyDeclarations': false,
          'ignoreDestructuring': false
        }
      ],
      
      // 🚫 Prohibir nombres de funciones en español
      'func-name-matching': 'off', // Deshabilitamos esta para usar nuestras reglas
      
      // ⚠️ Advertencia para nombres que podrían ser en español
      'id-blacklist': [
        'error',
        // Palabras comunes en español que no deberían usarse
        'usuario', 'contraseña', 'nombre', 'apellido',
        'edad', 'telefono', 'direccion', 'correo', 'fecha',
        'crear', 'obtener', 'actualizar', 'eliminar', 'borrar',
        'guardar', 'buscar', 'encontrar', 'validar', 'verificar'
      ]
    },
  },
])
