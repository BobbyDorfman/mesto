// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
            publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    devServer: { // С какой-то версии в webpack свойство contentBase переименовали в static, 
                // но забыли указать в официальной документации
      static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8097, // порт, чтобы открывать сайт по адресу localhost:8099, но можно поменять порт
      // Мой ip адрес http://192.168.3.1/ + 8099 = http://192.168.3.1/8097
      open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
        // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            // добавьте ещё одно правило:
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                // добавьте объект options
                options: { importLoaders: 1 }
                },
                // Добавьте postcss-loader
                'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // использовали плагин
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
};

// module.exports — это синтаксис экспорта в Node.js
// указали первое место, куда заглянет webpack, — файл index.js в папке src 
// указали в какой файл будет собираться весь js и дали ему имя 
// переписали точку выхода, используя утилиту path