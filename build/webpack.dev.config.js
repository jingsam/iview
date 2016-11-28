/**
 * 本地预览
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var less = require('postcss-less-engine');
var autoprefixer = require('autoprefixer');
var clean = require('postcss-clean');

module.exports = {
    // 入口
    entry: {
        main: './test/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../test/dist'),
        publicPath: '/test/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    // 加载器
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader')
        },  {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader?parser=less')
        },  {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader?parser=scss')
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    postcss: function () {
        return [less, autoprefixer, clean];
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader'),
            less: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!less-loader'),
            postcss: {
                plugins: [
                    less,
                    autoprefixer,
                    clean
                ],
                options: {
                    parser: less.parser
                }
            }
        }
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        alias: {
            iview: '../../src/index'
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks : true}),           // 提取CSS
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')    // 提取第三方库
    ]
};
