import next from 'eslint-config-next/core-web-vitals';

const config = [
  ...next,
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },
];

export default config;
