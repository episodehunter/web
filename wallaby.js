module.exports = () => {
  return {
    files: ['tsconfig.json', 'src/**/*.ts?(x)', '!src/**/*.test.ts?(x)'],
    tests: ['src/**/*.test.ts?(x)'],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  }
}
