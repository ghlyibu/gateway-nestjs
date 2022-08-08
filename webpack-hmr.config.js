/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * NestJS 的 dev 模式是将 TS 代码编译成 JS 再启动，这样每次我们修改代码都会重复经历一次编译的过程，在项目开发初期，
 业务模块体量不大的情况下，性能开销并不会有很大的影响，但是在业务模块增加到一定数量时，每一次更新代码导致的重新编译就会异常痛苦。
 为了避免这个情况，NestJS 也提供了热重载的功能，借助 Webpack 的 HMR，使得每次更新只需要替换更新的内容，减少编译的时间与过程。
 */

const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/.js$/, /.d.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }),
    ],
  };
};
