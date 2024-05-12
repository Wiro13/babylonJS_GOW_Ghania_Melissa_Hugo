import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { Models } from "./Models";

import mountainUrl from "../assets/models/snowy_slope.glb";
import { Player } from "./Player";
import { CharacterController } from "./CharacterController";

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
    
    window.addEventListener("resize", () => {
        engine.resize();
    });

}

var createScene = async () => {
    //Creation de la scene 
    let scene = new Scene(engine);

    //Gestion de la physique
    const havokInstance = await HavokPhysics();
    const hk = new HavokPlugin(true, havokInstance);
    scene.enablePhysics(new Vector3(0, -0.2, 0), hk);

    //Creation de la caméra developpeur
    const camera = new FreeCamera("camera1", new Vector3(-3, 12, -3), scene);
    camera.attachControl();
/*
    //Creation de la caméra 3rd person
    var camera = new FollowCamera("followCam", new Vector3(0, 10, -20), scene);
    camera.radius = 1;
    camera.heightOffset = 0.7;
    camera.rotationOffset = 90;
    camera.cameraAcceleration = 0.05;
    camera.maxCameraSpeed = 10;*/

    let playerMeshk = scene.getMeshByName("player");
    var player2 = new PlayerLevel1(scene,engine,"player",'z',"s","q","d",0,15,0);
    camera.lockedTarget = playerMeshk;


    //Musique 
    const music = new Sound("Music", "music.wav", scene, function () {
        music.play();
    });

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
