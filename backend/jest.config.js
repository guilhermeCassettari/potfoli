module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/migrations/'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Coleta cobertura de todos os arquivos .ts e .tsx dentro de src
    '!src/**/*.d.ts', // Exclui arquivos de definição de tipos
    '!src/**/index.ts', // Opcional: exclui arquivos index.ts, se não precisar de cobertura para eles
    '!src/config/*.ts',
  ],
};
