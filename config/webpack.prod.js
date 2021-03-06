const helpers = require('./helpers');
const config = require('./webpack.common');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { AotPlugin } = require('@ngtools/webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = "production";
const COMMON_STYLE = helpers.root('src/styles/common.scss');

module.exports = webpackMerge(config({ env: ENV }), {
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[id].[chunkhash].chunk.js',
    },
    module: {
        rules: [
            { test: /\.ts$/, use: ['@ngtools/webpack'] },
            {
                test: /\.(s[ac]|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1&url=false', 'postcss-loader', 'sass-loader']
                }),
                include: [COMMON_STYLE]
            }
        ]
    },
    plugins: [
        new CleanPlugin(['dist'], { root: helpers.root() }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            mangle: { screw_ie8: true },
            compress: { screw_ie8: true, warnings: false },
            sourceMap: false
        }),
        new SuppressExtractedTextChunksWebpackPlugin(),
        new AotPlugin({
            tsConfigPath: './tsconfig.json',
            mainPath: './src/main.ts',
            skipCodeGeneration: false
        }),
    ]
});