# three-pilot

## nodejs 의존성 설치

```sh
# nodejs 사전 설치 필요 https://nodejs.org/
nodejs

# npm 업그레이드
npm install -g npm

# npm 을 통한 typescript 글로벌 설치 (tsc 설치를 위함)
npm install -g typescript

# 프로젝트 폴더 생성
mkdir three-pilot
cd three-pilot

# threejs 라이브러리 설치 (npm or yarn)
npm install three --include=dev
npm install @types/three --include=dev

# webpack 라이브러리 추가
npm install webpack webpack-cli webpack-dev-server webpack-merge ts-loader --include=dev

# typescript 라이브러리 추가
npm install typescript --include=dev
```

## 기본 플러그인 설치 (옵션)

- prettier : 화면 포맷팅을 맞춰줌 ( .prettierrc )

## 주요 파일 설명

- dist/client/index.html
  - 번들링된 bundle.js 을 (client.ts 트랜슬레이션 한 결과) 로드 후 로컬 서버를 구동하기 위함
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

## 실행

개발모드 - `npm run dev`
