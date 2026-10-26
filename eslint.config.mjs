import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const vaultMessage = 'The private vault never enters the site build'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/docs/**', '@/docs/*'], message: vaultMessage },
            { group: ['**/UserPastedData/**', '@/UserPastedData/*'], message: vaultMessage },
          ],
        },
      ],
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'docs/**', 'UserPastedData/**', 'next-env.d.ts'] },
]

export default config
