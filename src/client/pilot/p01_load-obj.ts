/*
    file : p01_load-obj.ts
    title : obj 개체를 로드하여 화면에 표기한다 
    desc : -
    link : https://sbcode.net/threejs/loaders-obj/

    Wavefront OBJ 형식으로 저장된 3d 모델을 로드하는 데 사용됩니다. 
    OBJ 형식으로 모델을 생성할 수 있는 DCC(디지털 콘텐츠 생성) 도구가 많이 있습니다. 
    Threejs에서 OBJ를 가져올 때 기본 재질은 흰색 MeshPhongMaterial이므로 장면에 하나 이상의 조명이 필요합니다.

    => obj는 MeshPhongMaterial 로 로드되며, 1개 이상의 light가 필요로 함

    MTL은 OBJ 파일에서 사용하는 재료 정보입니다. 
    색상, 반사광, 이미시브, 알파, 부드러움, 이미지 맵 및 좌표를 설정할 수 있습니다. 
    기본적으로 MeshPhongMaterial이므로 meshPhongMaterial에 영향을 주는 속성만 설정할 수 있습니다. 
    Blender를 사용하여 OBJ 및 MTL을 생성하면 변경할 수 있습니다.
*/
import * as THREE from 'three';

import loadObj from './helper/WOBJLoader';
import {
  createScene,
  createPointLight,
  createPerspectiveCamera,
  createWebGLRenderer,
  createOrbitControls,
  createResizeEvent,
  createStats,
} from './helper/WTemplate';

///////////////////////////////////////////////////////////////////
//
//  01. 기본 항목 추가 처리
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
//  02. 기본 동작처리 설정
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
//  비동기로 개체를 로드 후 위치를 잡아준다
//  The X axis is red. The Y axis is green. The Z axis is blue.
//

loadObj('3d/chun/chun.mtl', '3d/chun/chun.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.01;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  object.rotation.set(-1.5, 0, -3.2);
  scene.add(object);
});
loadObj('3d/and/and.mtl', '3d/and/and.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.2;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  scene.add(object);
});
loadObj('3d/computer/computer.mtl', '3d/computer/computer.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.2;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  scene.add(object);
});
loadObj('3d/folder/folder.mtl', '3d/folder/folder.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.2;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  scene.add(object);
});
loadObj('3d/harddisk/harddisk.mtl', '3d/harddisk/harddisk.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.2;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  scene.add(object);
});
loadObj('3d/sawtooth/sawtooth.mtl', '3d/sawtooth/sawtooth.obj', (object: THREE.Group) => {
  let pos = new THREE.Vector3(0, 0, 0);
  let scale = 0.2;
  object.position.set(pos.x, pos.y, pos.z);
  object.scale.set(scale, scale, scale);
  scene.add(object);
});
