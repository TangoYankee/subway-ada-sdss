module.exports = {
  apps: [
    {
      name: 'next',
      cwd: '/home/<USERNAME>/<PROJECT-FOLDER>',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',

      },
    },
  ],
};
 
