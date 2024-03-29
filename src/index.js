import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { Models } from "./Models";

import meshUrl from "../assets/models/skier_lowpoly.glb";
import mountainUrl from "../assets/models/snowy_slope.glb";
import { Player } from "./Player";


let engine, canvas, papa, camera;

window.onload = async () => {
    canvas = document.getElementById("renderCanvas");
    engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    const scene = await createScene();

    Inspector.Show(scene, {});

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

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
    scene.enablePhysics(new Vector3(0, -9.81, 0), hk);

    

    //Creation de la caméra developpeur
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    
    //Creation du Light
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    /**************************************Gestion du joueur******************************************/
    var player = new Player(scene);
    




   
    /**************************************Gestion des Object 3D******************************************/
    var ground = new Models(scene);
    ground.ground();
    
    var map = new Models(scene);
    //map.importMontain();

    var skieur = new Models(scene);
    //skieur.skieur();
    /***********************************fin de Gestion des Object 3D***************************************/
   
    return scene;
};






































// Function to handle arrow key presses
function handleKeyDown(event) {
    const speed = 0.1; // Adjust the speed as needed

    switch (event.key) {
        case "ArrowUp":
            papa.position.z += speed;
            break;
        case "ArrowDown":
            papa.position.z -= speed;
            break;
        case "ArrowLeft":
            papa.position.x -= speed;
            updateRotation();
            break;
        case "ArrowRight":
            papa.position.x += speed;
            updateRotation();
            break;
        case " ":
            papa.position.y += 2;
            break;
    }
}

// Function to handle arrow key releases (optional)
function handleKeyUp(event) {
    // You can add logic here if needed
}

// Function to update the rotation of the sphere to face the movement direction
function updateRotation() {
    // Calculate the angle between the movement direction and the positive z-axis
    const angle = Math.atan2(papa.position.x, papa.position.z);

    // Set the sphere's rotation accordingly
    papa.rotation.y = angle;
}

