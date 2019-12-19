module.exports = {
  apps: [
    {
      name: 'treecade',
      script: 'dist/index.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: true,
      exec_mode: 'fork',
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'src', 'debug.log', 'test'],
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        NO_TERM: '1',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
