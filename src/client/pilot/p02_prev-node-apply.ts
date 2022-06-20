/*
    file : p02_prev-node-apply.ts
    title : 전달받은 `main.js` 파일을 분석하여 유사하게 구현
    desc : -
    link : - 

    
*/
import {Vector3} from 'three';
import {addScene, LoadedObj, loadObj2} from './helper/WOBJLoader';
import {
  createScene,
  createPointLight,
  createPerspectiveCamera,
  createWebGLRenderer,
  createOrbitControls,
  createResizeEvent,
  createStats,
} from './helper/WTemplate';
import {ProcessType} from './types/sysnova.types';

///////////////////////////////////////////////////////////////////
//
//  01. 기본 환경 구성
//
const scene = createScene(); // scene 추가
const light = createPointLight(); // light 추가
scene.add(light);

const camera = createPerspectiveCamera(); // camera 추가
const renderer = createWebGLRenderer(); // renderer 추가
const controls = createOrbitControls(camera, renderer); // controls 추가

createResizeEvent(camera, renderer, render); // 화면 resize event 추가

const stats = createStats(); // stats 패널 추가

///////////////////////////////////////////////////////////////////
//
//  02. 랜더링 설정
//

// animation 설정
// requestAnimationFrame에 의해 매 frame 단위로(60fps, 초당 60회) 호출됨
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
  stats.update();
}
animate();

// 랜더링 설정
// 화면을 그려주는 역할을 함
function render() {
  renderer.render(scene, camera);
}

///////////////////////////////////////////////////////////////////
//
//  03. 개체 로드
//  The X axis is red. The Y axis is green. The Z axis is blue.
//
loadObj2(
  [
    '3d/and/and.obj',
    '3d/computer/computer.obj',
    '3d/folder/folder.obj',
    '3d/harddisk/harddisk.obj',
    '3d/sawtooth/sawtooth.obj',
  ],
  loadComplete,
);

///////////////////////////////////////////////////////////////////
//
//  04. 개체 복제 및 포지셔닝
//
async function loadComplete(objects: LoadedObj[]) {
  //   for (let o of objects) {
  //     scene.add(o.object);
  //   }

  let harddisk = objects.filter(x => x.name == 'harddisk')[0].object;

  let h = harddisk.clone();
  h.position.set(0, 0, 0);
  scene.add(h);

  //   console.log(h);

  // load json
  let processJsonUrl = 'data/process.json';
  let _processJson = await fetch(processJsonUrl).then(res => res.json());
  const processJson = <ProcessType>_processJson;
  console.log(processJson.procNm);
}
