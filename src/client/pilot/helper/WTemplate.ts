import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

const DEF_AXIS_SIZE: number = 5;

const DEF_LIGHT_POSITION: THREE.Vector3 = new THREE.Vector3(2.5, 7.5, 15);

const DEF_CAMERA_POSITION: THREE.Vector3 = new THREE.Vector3(0, 0, 3);
const DEF_CAMERA_FOV: number = 75;
const DEF_CAMERA_ASPECT: number = window.innerWidth / window.innerHeight;
const DEF_CAMERA_NEAR: number = 0.1;
const DEF_CAMERA_FAR: number = 1000;

/**
 * Scene 을 생성한다
 * @param useAxisHelper AxisHelper(3축 격자) 생성여부
 * @returns Scene
 */
export function createScene(useAxisHelper: boolean = true): THREE.Scene {
  const scene = new THREE.Scene();
  // An axis object to visualize the 3 axes in a simple way.
  // The X axis is red. The Y axis is green. The Z axis is blue.
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  if (useAxisHelper) scene.add(new THREE.AxesHelper(DEF_AXIS_SIZE));

  return scene;
}

/**
 * PointLight 를 생성한다
 * @param position 조명 위치
 * @returns PointLight
 */
export function createPointLight(position: THREE.Vector3 = DEF_LIGHT_POSITION): THREE.PointLight {
  const light = new THREE.PointLight();
  light.position.set(position.x, position.y, position.z);
  return light;
}

/**
 * PerspectiveCamera 를 생성한다
 * @param fov 카메라 위치정보
 * @param aspect 카메라 위치정보
 * @param near 카메라 위치정보
 * @param far 카메라 위치정보
 * @param position 카메라 위치정보
 */
export function createPerspectiveCamera(
  fov = DEF_CAMERA_FOV,
  aspect = DEF_CAMERA_ASPECT,
  near = DEF_CAMERA_NEAR,
  far = DEF_CAMERA_FAR,
  position: THREE.Vector3 = DEF_CAMERA_POSITION,
) {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(position.x, position.y, position.z);

  return camera;
}

/**
 * renderer 를 생성한다.
 * 생성 후 body 에 dom 자동삽입 처리
 * @returns WebGLRenderer
 */
export function createWebGLRenderer() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

/**
 * controls 을 생성한다. (마우스 조작을 가능하게 함)
 * @returns OrbitControls
 */
export function createOrbitControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  return controls;
}

/**
 * 리사이즈 이벤트를 등록한다.
 * camera 정보 업데이트 및 renderer 크기 정보 업데이트 이후 랜더링을 재 수행한다(callbackRender)
 * @param camera PerspectiveCamera
 * @param renderer WebGLRenderer
 * @param callbackRender 재 랜더링 처리
 */
export function createResizeEvent(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  callbackRender: Function,
) {
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    callbackRender();
  }
}

/**
 * body 에 stats 정보를 추가한다 (fps, memory 등)
 */
export function createStats() {
  const stats = Stats();
  document.body.appendChild(stats.dom);

  return stats;
}
