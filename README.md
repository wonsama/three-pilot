# three-pilot

## 설치

> windows 의 경우 [git](https://git-scm.com/) 을 설치하여 `git-bash` 와 같은 terminal을 활용하여 작업을 진행하는 것을 추천함
> nodejs 가 설치 되어 있다는 가정 하에 진행

```sh
# degit 이 설치 되지 않은 경우
npm i -g degit
# degit [클론받을 프로젝트 url] [다운받을 디렉토리명]
degit https://github.com/wonsama/three-pilot  three-pilot
cd three-pilot
npm i
cp .entry.json.sample .entry.json
```

이후 `.entry.json` 파일의 `entry` 정보를 수정 후, 프로젝트를 실행한다 (아래 `실행` 참조)

## 작업 파일(.ts) 만들기

- ts 파일은 `src/client/scripts` 하위에 `.ts` 파일을 구성하여 작성한다
- `default.html` 파일과 다른 구성을 작성하고자 하는 경우 `.ts` 파일과 동일한 파일명의 `.html` 파일을 만들어준다. (해당 html 템플릿으로 동작함)

## 실행 설정

- 최초 `.entry.json` 파일은 없으니 `.entry.json.sample` 을 참조하여 `.entry.json` 파일을 생성한다
- 실행파일을 매번 바꾸기도 귀찮으니 `.entry.json` 을 수정하여 실행하고자 하는 파일을(`entry point(진입점)`) 지정할 수 있도록 함.
- 기본적으로 해당 `ts` 파일명과 동일한 `html` 을 로드 하며, 해당 `html` 이 존재하지 않는 경우 해당 폴더 내 `default.html` 을 로드한다

> .entry.json 예시

```json
{
  "entry": "./src/client/study/s03_scene-camera-renderer.ts"
}
```

## 실행

- 실행 전 `.entry.json` 파일의 실행 경로를 변경
- 개발모드 - `npm run dev`

## 주요 파일 설명

- src/client/tsconfig.json
  - 타입스크립트 설정정보
- src/client/webpack.common.js
  - 웹팩 공통 설정 정보
- src/client/webpack.dev.js
  - 웹팩 개발(dev) 설정 정보, 공통(common) 설정 정보 포함
- package.json
  - 기본 의존성 정보 포함
  - scripts 에 기동 설정을 포함
    - dev : webpack.dev.js 설정 정보를 로드하여 webpack 으로 서버를 구동

## 참조 - nodejs 의존성

```sh
# nodejs 사전 설치 필요 https://nodejs.org/
nodejs

# npm 업그레이드
npm i -g npm

# npm 을 통한 typescript 글로벌 설치 (tsc 설치를 위함)
npm i -g typescript

# 프로젝트 폴더 생성
mkdir three-pilot
cd three-pilot

# threejs 라이브러리 설치 (npm or yarn)
npm i three --include=dev
npm i @types/three --include=dev

# dat 라이브러리 설치
npm i dat.gui @types/dat.gui --include=dev

# webpack 라이브러리 추가
npm i webpack webpack-cli webpack-dev-server webpack-merge ts-loader --include=dev

# webpack 기타 라이브러리 추가
npm i favicons favicons-webpack-plugin html-webpack-plugin --include=dev

# typescript 라이브러리 추가
npm i typescript --include=dev
```

## 참조 - 기본 플러그인 설치 (옵션)

- prettier : 화면 포맷팅을 맞춰줌 ( .prettierrc )

## 참조링크

- [npmjs - html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [github - favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)
- [yamoo9 - webpack : 웹팩 러닝 가이드](https://yamoo9.gitbook.io/webpack/)
- [sbcode - threejs](https://sbcode.net/threejs)
- [webpack - copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)

## 문제해결

- [stackoverflow - webpack-config-how-to-just-copy-the-index-html-to-the-dist-folder](https://stackoverflow.com/questions/32155154/webpack-config-how-to-just-copy-the-index-html-to-the-dist-folder) : html-webpack-plugin 설치하여 사용
- [stackoverflow - all-my-code-runs-twice-when-compiled-by-webpack](https://stackoverflow.com/questions/37081559/all-my-code-runs-twice-when-compiled-by-webpack) : 웹팩 빌드가 2번 되어 들어가는 경우, html-webpack-plugin 내 `inject : false` 설정을 추가한다
- [webpack plugin을 이용한 favicon, manifest 추가 방법](https://yujo11.github.io/webpack/webpack%20favicon,%20manifest.json%20%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0/)
- [how-to-polyfill-node-core-modules-in-webpack-5](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5)

## TODO

- [threejs - WARNING: Multiple instances of Three.js being imported. (?)](https://discourse.threejs.org/t/warning-multiple-instances-of-three-js-being-imported/24191) : webpack 문제 같은데 시간을 두고 확인 해봐야 될듯
