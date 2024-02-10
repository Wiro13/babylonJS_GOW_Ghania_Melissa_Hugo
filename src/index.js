import { Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

let engine;
let canvas;
let papa;
window.onload = () => {
    canvas = document.getElementById("renderCanvas")
    engine = new Engine(canvas, true);
    let scene = createScene();
    engine.runRenderLoop(function () {
        papa.position.y +=0.05;
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

    // Our built-in 'sphere' shape.
    var sphere = MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.
    var ground = MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    papa = MeshBuilder.CreateCapsule("papa",scene); 
    papa.position = new Vector3(3,2,0);

    return scene;
};