import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

/**
 * obj를 읽어들여 scene에 추가한다
 * @param mtlPath .mtl 파일 경로
 * @param objPath .obj 파일 경로
 * @param callback 로드 완료 이후 콜백 (object 정보가 반환 됨)
 */
export default function loadObj(mtlPath: string, objPath: string, callback: (group: THREE.Group) => void) {
  const mtlLoader = new MTLLoader();
  mtlLoader.load(
    mtlPath,
    materials => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        objPath,
        callback,
        xhr => {
          console.log('objLoader' + (xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        error => {
          console.log('objLoader An error happened', error);
        },
      );
    },
    xhr => {
      console.log('mtlLoader' + (xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    error => {
      console.log('mtlLoader An error happened', error);
    },
  );
}
