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

/**
 * 읽어들인 개체 정보
 */
export type LoadedObj = {
  name: string;
  object: THREE.Group;
};

/**
 * obj를 읽어들여 scene에 추가한다. (mtl 은 동일 폴더, 동일 파일명으로 존재한다 가정)
 * @param objPaths 읽어들일 obj 목록 정보
 * @param callback 모든 개체를 다 로드하면 반환되는 콜백
 */
export function loadObj2(objPaths: string[], callback: (objects: LoadedObj[]) => void) {
  let objs: LoadedObj[] = [];
  for (let objPath of objPaths) {
    let names = getNames(objPath);
    let mtlPath = `${names.foldername}/${names.basename}.mtl`;
    loadObj(mtlPath, objPath, (object: THREE.Group) => {
      objs.push({name: names.basename, object});
      if (objPaths.length == objs.length) {
        callback(objs);
      }
    });
  }
}

/**
 * scene 에 읽어들인 개체를(object) 삽입한다
 * @param scene scene
 * @param object 읽어들인 object
 * @param pos 개체 위치 정보 (Vector3, default Vector3(0,0,0) )
 * @param scale 개체 크기 정보
 */
export function addScene(scene: THREE.Scene, object: THREE.Group, pos?: THREE.Vector3, scale: number = 0.2) {
  if (pos != undefined) {
    object.position.set(pos.x, pos.y, pos.z);
  } else {
    pos = new THREE.Vector3(0, 0, 0);
    object.position.set(pos.x, pos.y, pos.z);
  }
  object.scale.set(scale, scale, scale);
  scene.add(object);
}

/**
 * 파일의 기본 경로 정보를 추출
 * @param entry 읽어들일 파일 정보
 * @returns 분해된 파일 정보
 */
function getNames(entry: string) {
  let entries = entry.split('/');
  let filename = entries.pop()!;
  let foldername = entries.join('/');
  let names = filename.split('.');
  let extname = names.pop()!;
  let basename = names.join('.');

  // entry : /wow/loc/main.core.js
  return {
    filename, // main.core.js
    foldername, // /wow/loc
    extname, // .js
    basename, // main.core
  };
}
