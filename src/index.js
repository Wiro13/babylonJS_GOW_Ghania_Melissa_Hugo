import { Engine, FollowCamera, HemisphericLight, MeshBuilder, Scene, Vector3, StandardMaterial, Color3 } from "@babylonjs/core";

let engine;
let canvas;
let papa;
let camera;
let scene;

window.onload = () => {
    canvas = document.getElementById("renderCanvas");
    engine = new Engine(canvas, true);
    scene = createScene();

    // Event listeners for arrow key presses
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    engine.runRenderLoop(function () {
        // Update camera and sphere rotation
        camera.target = papa.position.clone();
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}

var createScene = function () {
    var scene = new Scene(engine);

    // Use FollowCamera instead of FreeCamera
    camera = new FollowCamera("followCamera", new Vector3(0, 5, -10), scene);

    // Set the camera position behind the sphere
    camera.radius = 10;
    camera.heightOffset = 2; // Adjust the height to position it slightly above the sphere
    camera.rotationOffset = 180; // Rotate the camera to face the back of the sphere

    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    var ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    var snowMaterial = new StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = new Color3(0.8, 0.8, 1); // Light blue color
    snowMaterial.specularColor = new Color3(0, 0, 0);
    ground.material = snowMaterial;

    papa = MeshBuilder.CreateCapsule("papa", scene);
    papa.position = new Vector3(3, 2, 0);

    camera.lockedTarget = papa;

    return scene;
};

// Function to handle arrow key presses
function handleKeyDown(event) {
    const speed = 0.2; // Adjust the speed as needed

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