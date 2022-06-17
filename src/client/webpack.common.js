const path = require('path');
const {entry} = require('../../.entry.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

let template = getHtmlName(entry);

/**
 * 입력받은 entry 정보 기준으로 template html 파일 정보를 넘겨준다.
 * ts파일명과 일치하는 html이 존재하지 않는 경우 해당 폴더 내 default.html을 반환한다
 * @param {string} entry
 * @returns string
 */
function getHtmlName(entry) {
  let entries = entry.split('/');
  let fullname = entries.pop();
  let prefix = entries.join('/');
  let names = fullname.split('.');
  names.pop();

  let isFileExists = fs.existsSync(`${__dirname}/scripts/${names.join('.')}.html`);

  if (isFileExists) {
    return prefix + `/${names.join('.')}.html`;
  }
  return prefix + '/default.html';
}

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist/client'),
  },
  plugins: [
    // new FaviconsWebpackPlugin('./src/client/favicon.png'),

    // CopyWebpackPlugin 를 사용하는 대신 dist/client 폴더에 해당 자원을 배치하는 것으로 처리
    // 매번 복사하는 것도 시간 걸림
    // new CopyWebpackPlugin({
    //   patterns: [{from: 'src/assets', to: '.'}],
    // }),
    new HtmlWebpackPlugin({
      favicon: './src/client/favicon.png',
      filename: 'index.html',
      inject: false,
      template,
    }),
  ],
};
