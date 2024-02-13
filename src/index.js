import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

import meshUrl from "../assets/models/skier_lowpoly.glb";
import mountainUrl from "../assets/models/snowy_slope.glb";
import skierUrl from "../assets/models/skier_lowpoly.glb";

let engine, canvas;

window.onload = async () => {
    let canvas = document.getElementById("renderCanvas");
    let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    
    const scene = await createScene();
    
    Inspector.Show(scene, {});

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
};

const createScene = async () => {
    const scene = new Scene(engine);

    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.x = 10

    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);

    const havokInstance = await HavokPhysics();
    const hk = new HavokPlugin(true, havokInstance);
    scene.enablePhysics(new Vector3(0, -9.8, 0), hk);

    const sphereAggregate = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 1, restitution: 0.75 }, scene);
    const groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);

    // Importation et application de la physique au mesh de montagne
    SceneLoader.ImportMesh("", "", mountainUrl, scene, function (newMeshes) {
        const mountain = newMeshes[0];
        mountain.name = "mountain";
        // Création d'un agrégat physique pour la montagne
        // const mountainAggregate = new PhysicsAggregate(mountain, PhysicsShapeType.MESH, { mass: 0, restitution: 0.75 }, scene);
        
        // Mise à jour de la cible de la caméra
        camera.target = mountain;
    });

    // Importation et application de la physique au mesh de montagne

    SceneLoader.ImportMeshAsync("", "", skierUrl,).then((result) => {
        // Create a collider box
        var colliderBox = MeshBuilder.CreateBox("collider", {width: 1, height: 0.5, depth: 1.5});
        colliderBox.material = new StandardMaterial("colliderBoxMat");
        colliderBox.isVisible = false;
        result.meshes[0].parent = colliderBox;

        colliderBox.position.y = 2;
        new PhysicsAggregate(colliderBox, PhysicsShapeType.CONVEX_HULL, { mass: 1, restitution: 0 }, scene);
    });

    return scene;
};
