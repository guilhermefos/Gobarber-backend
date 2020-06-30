module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@repositories': './src/repositories',
        '@services': './src/services',
        '@middleware': './src/middleware',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}