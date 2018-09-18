const webpack = require('webpack');
const path = require('path');

// variables
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabelMinify = require('babel-minify-webpack-plugin');
const packageJsonFile = require(path.join(__dirname, './package.json'));

const isExternal = (module) => {
  const context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1;
};

const plugins = (env) => {
  const myPlugins = [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJsonFile.version)
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: (module) => {
        return isExternal(module);
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: env === 'dev',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.ejs',
      favicon: 'assets/images/favicon.png',
      jsfilesource: env.frontendsource === 'prod' ? 'https://test.animallabs.co/bundle.js.gz' : '/bundle.js',
      jsvendorsource: env.frontendsource === 'prod' ? 'https://test.animallabs.co/vendor.bundle.js.gz' : '/vendor.bundle.js',
      inject: false,
    }),
  ];

  const prodPlugins = [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        }
      }
    }),
    new BabelMinify({}, {}),
    new CompressionPlugin({
      test: /\.js/,
      deleteOriginalAssets: true,
    })
  ];

  return env.configSelect === 'prod' ? myPlugins.concat(prodPlugins) : myPlugins;
};

const returnTsxLoaderOptions = (dev) => {
  if(dev === 'prod') {
    return [
       { loader: 'ts-loader'}
     ]
  } else {
    return [
       { loader: 'react-hot-loader/webpack' },
       { loader: 'ts-loader'}
     ]
  }
}

module.exports = env => {
  return {
    context: sourcePath,
    entry: {
      main: './index.ts',
    },
    output: {
      path: outPath,
      filename: 'bundle.js',
      publicPath: '/'
    },
    target: 'web',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        images: path.resolve(__dirname, 'src/assets/images/'),
        config$: path.resolve(__dirname, `config/${env.configSelect}.ts`),
        stores: path.resolve(__dirname, 'src/app/stores'),
        apiCalls$: path.resolve(__dirname, 'src/app/services/apiCalls.ts'),
        models: path.resolve(__dirname, 'src/app/models')
      }
    },
    module: {
      loaders: [
        // .tsx
        {
          test: /\.(tsx|ts)$/,
          use: returnTsxLoaderOptions(env),
        },
        {
          test: /\.js$/,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          loaders: "style-loader!css-loader!sass-loader?OutputStyle=expaned&" +
          'includePaths[]=' +
          (encodeURIComponent(
            path.resolve(process.cwd(), './node_modules')
          )) +
          '&includePaths[]=' +
          (encodeURIComponent(
              path.resolve(process.cwd(),
                './node_modules/grommet/node_modules'))
          )
        },

        // static assets
        {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
        {test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg"},
        {test: /\.html$/, use: 'html-loader'},
      ],
    },
    plugins: plugins(env),
    devServer: {
      contentBase: sourcePath,
      hot: true,
      disableHostCheck: true,
      stats: {
        warnings: false
      }
    },
    node: {
      // workaround for webpack-dev-server issue
      // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
      fs: 'empty',
      net: 'empty'
    }
  }
};
