
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    //webpack の出力オプションを指定します
    // 'production' か 'development' を指定
    // minifyしたいなら'production'
    mode: 'development',

    // 出力の設定
    output: {
        // 出力するファイル名
        filename: 'main.js',
        // 出力先のパス（v2系以降は絶対パスを指定する必要がある）
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
        {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|css)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップ
                            sourceMap: true,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // ソースマップ
                            sourceMap: true,
                        }
                    }

                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [new VueLoaderPlugin()],

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        contentBase: 'dist',
        open: true
    }
}