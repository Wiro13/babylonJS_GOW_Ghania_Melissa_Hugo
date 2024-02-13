import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

import meshUrl from "../assets/models/skier_lowpoly.glb"
import mountainUrl from "../assets/models/snowy_slope.glb"

let engine;
let canvas;
let papa;
window.onload = () => {
    canvas = document.getElementById("renderCanvas")
    engine = new Engine(canvas, true);
    let scene = createScene();

    Inspector.Show(scene, {});

    engine.runRenderLoop(function () {
        papa.position.y +=0.01;
        scene.render();

    });
    window.addEventListener("resize", function () {
        engine.resize();
    });

}


var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    //var ground = MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    papa = MeshBuilder.CreateCapsule("papa",scene); 
    papa.position = new Vector3(3,2,0);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    SceneLoader.ImportMesh("", "", meshUrl, scene, function (newMeshes) {
        newMeshes[0].name = "Player";
        newMeshes[0].scaling = new Vector3(1, 1, 1);
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
    });

    SceneLoader.ImportMesh("", "", mountainUrl, scene, function (newMeshes) {
        newMeshes[0].name = "mountain";
        //newMeshes[0].scaling = new Vector3(1, 1, 1);
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
    });

    return scene;
};