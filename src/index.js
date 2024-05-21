import { Engine, AssetsManager, FollowCamera, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import { Models } from "./Models";
import {PlayerLevel1} from "./PlayerLevel1";
window.onload = () => {
    var startButton = document.getElementById("buttonStart");
    startButton.addEventListener("click", () => {
            launchGame();
        }
    );
};

/****************************Variables globales ************************************************* */

let engine, canvas, papa, camera;
/****************************Lancement de l'appli ************************************************* */
async function launchGame() {
    var backgroundSite = document.getElementById("backgroundGame");
    backgroundSite.style.display = "none";
    canvas = document.getElementById("renderCanvas");
    canvas.style.display = "block";
    engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    const scene = await createScene();
    //Inspector.Show(scene, {});

    engine.runRenderLoop(() => {
        scene.render();
    });
    
    

}

var createScene = async () => {
    //Creation de la scene 
    let scene = new Scene(engine);

    //Gestion de la physique
    const havokInstance = await HavokPhysics();
    const hk = new HavokPlugin(true, havokInstance);
    scene.enablePhysics(new Vector3(0, -9.81, 0), hk);

    //Creation de la caméra developpeur
    /*
    const camera = new FreeCamera("camera1", new Vector3(0, 12, -10), scene);
    camera.attachControl();
    */

    //Creation de la caméra 3rd person
    var camera = new FollowCamera("followCam", new Vector3(0, 60, 150), scene);
    
    
    var player2 = new PlayerLevel1(scene,engine,"player",'z',"s","q","d",0,15,-5);
    let playerMeshk = scene.getMeshByName("player");
    camera.lockedTarget = playerMeshk;

    //Musique 
    let assetsManager = new AssetsManager(scene);
    var music1Url = "PowderParadise.mp3";
    const music1Data = assetsManager.addBinaryFileTask("music1", music1Url);
    var music = new Sound("music1", music1Data.data, scene, undefined, { loop: true, autoplay: false, volume: 1 });

    //Creation du Light
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    /**************************************Gestion des Object 3D******************************************/
    var map = new Models(scene);
    map.importMontain();

    var skieur = new Models(scene);

    /**************************************Gestion du joueur******************************************/
  

    /***********************************fin de Gestion des Object 3D***************************************/
    return scene;
};
