const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const remotes = (isServer, fileName, url) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    [fileName]: `${fileName}@${url}/_next/static/${location}/remoteEntry.js`,
  };
};

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host_next",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          ...remotes(isServer, "remote_next", "http://localhost:3001"),
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};
