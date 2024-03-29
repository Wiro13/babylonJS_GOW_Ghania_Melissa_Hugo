import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { Models } from "./Models";

import meshUrl from "../assets/models/skier_lowpoly.glb";
import mountainUrl from "../assets/models/snowy_slope.glb";


let engine, canvas, papa, camera;

window.onload = async () => {
    canvas = document.getElementById("renderCanvas");
    engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    const scene = await createScene();

    Inspector.Show(scene, {});

    // Event listeners for arrow key presses
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    engine.runRenderLoop(() => {
        // Update camera and sphere rotation
        //camera.target = papa.position.clone();
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });

}

var createScene = async () => {
    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    // Use FollowCamera instead of FreeCamera
    // camera = new FollowCamera("followCamera", new Vector3(0, 5, -10), scene);

    // // Set the camera position behind the sphere
    // camera.radius = 10;
    // camera.heightOffset = 2; // Adjust the height to position it slightly above the sphere
    // camera.rotationOffset = 180; // Rotate the camera to face the back of the sphere

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

   




    const havokInstance = await HavokPhysics();
    const hk = new HavokPlugin(true, havokInstance);
    scene.enablePhysics(new Vector3(0, -9.8, 0), hk);

    papa = MeshBuilder.CreateCapsule("papa",scene);
    papa.position = new Vector3(0,5,0);

    
    
    const papaAggregate = new PhysicsAggregate(papa, PhysicsShapeType.CAPSULE, { mass: 1, restitution: 0.75 }, scene);
    
    /**************************************Gestion des Object 3D******************************************/
    var ground = new Models(scene);
    ground.ground();
    
    var map = new Models(scene);
    //map.importMontain();

    var skieur = new Models(scene);
    //skieur.skieur();
   
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

