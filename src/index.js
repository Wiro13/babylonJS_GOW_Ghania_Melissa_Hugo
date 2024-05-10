import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { Models } from "./Models";

import mountainUrl from "../assets/models/snowy_slope.glb";
import { Player } from "./Player";
import { CharacterController } from "./CharacterController";

window.onload = () => {
    var startButton = document.getElementById("startButton");
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
    Inspector.Show(scene, {});

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
    scene.enablePhysics(new Vector3(0, -5, 0), hk);

    //Creation de la caméra developpeur
    //const camera = new FreeCamera("camera1", new Vector3(-18, 10, 0), scene);
    //camera.setTarget(Vector3.Zero());
    //camera.attachControl(canvas, true);

    var camera = new FollowCamera("followCam", new Vector3(0, 10, -20), scene);
    camera.radius = 6;
    camera.heightOffset = 2.5;
    camera.rotationOffset = 90;
    camera.cameraAcceleration = 0.05;
    camera.maxCameraSpeed = 10;
    
    //musique 
    const music = new Sound("Music", "music.wav", scene, function () {
        // Sound has been downloaded & decoded
        music.play();
    });
    //Creation du Light
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    /**************************************Gestion du joueur******************************************/
    var player = new Player(scene);

    let playerMesh = scene.getMeshByName("player");
    camera.lockedTarget = playerMesh;
    /**************************************Gestion des Object 3D******************************************/
    var map = new Models(scene);
    map.importMontain();

    var skieur = new Models(scene);


    /***********************************fin de Gestion des Object 3D***************************************/
    return scene;
};
