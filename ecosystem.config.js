module.exports = {
    apps: [
      {
        name: 'chat_server',
        script: './dist/index.js',
        instances: 'max',  // Auto-detect the number of CPU cores
        exec_mode: 'cluster',  // Use cluster mode for better performance
        watch: false,  // Disable watching in production (can be enabled if needed)
        env: {
            NODE_ENV: "production",
            PORT: 3500
          },
        },
        {
            name: "chat_server_dev",
            script: "server/index.ts", // Development script using ts-node
            watch: ["server"], // Enable watching for changes in the source code
            interpreter: "ts-node", // Use ts-node for TypeScript execution
            env: {
              NODE_ENV: "development",
              PORT: 3500
            },
        }
    ],
  };
  