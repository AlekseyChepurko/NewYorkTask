const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const initConfig = require('./common.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function (options) {
    const config = initConfig(options);

    const plugins = [
        ...config.plugins,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DefinePlugin({
        }),
        new ExtractTextPlugin('workbench-[hash].css'),

    ];

    const rules = [
        ...config.rules,
        {
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?importLoader=1&modules&localIdentName=[local]!postcss-loader!sass-loader!import-glob-loader',
            }),
        },
    ];

    return { rules, plugins };
};
