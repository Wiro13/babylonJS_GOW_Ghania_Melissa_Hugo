import { Engine, ArcFollowCamera, ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

import meshUrl from "../assets/models/skier_lowpoly.glb";
import mountainUrl from "../assets/models/snowy_slope.glb";
import skierUrl from "../assets/models/skier_lowpoly.glb";

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
        camera.target = papa.position.clone();
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
}

var url = "https://bjs-playground.s3.amazonaws.com/cc_playground.js";
var s = document.createElement("script");
s.type = "text/javascript";
s.src = url;
document.head.appendChild(s);

var delayCreateScene = function() {
    var scene = new Scene(engine);
    // camera 1
    var camera1 = new ArcRotateCamera("camera1",  3 * Math.PI / 8, 3 * Math.PI / 8, 15, new Vector3(0, 2, 0), scene);
    camera1.attachControl(canvas, true);

    // lights
    var light1 = new HemisphericLight("light1", new Vector3(1, 0.5, 0), scene);
    light1.intensity = 0.7;
    var light2 = new HemisphericLight("light2", new Vector3(-1, -0.5, 0), scene);
    light2.intensity = 0.2;

    //havok
    var hk = new HavokPlugin();
    scene.enablePhysics(new Vector3(0, -10, 0), hk);
    var physicsEngine = scene.getPhysicsEngine();
    
    //ground
    var ground = MeshBuilder.CreateGround("MYground", {width: 50, height: 50}, this.scene);
    ground.isPickable = true;
    ground.receiveShadows = true;
    ground.checkCollisions = true;
    var groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new Texture("textures/ground.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new Color3(0, 0, 0);
    ground.position.y = -2.05;
    ground.material = groundMaterial;

    const groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, this.scene);

    //static box for reference 
    var box = MeshBuilder.CreateBox("Box", {width:2, height:2}, scene, true);
    box.material = new StandardMaterial("", scene);
    box.position.x+=3
    box.position.y=-1.5
    box.checkCollisions = true;

    let myBabylon = new StartBabylon(scene, camera1);
    myloadPlayer(camera1); //loads physics when done
    return scene;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function StartBabylon(scene, camera1) {
    this.debug = true;
    this.mlog = {};
    this.mlog.log = function (msg, data){
            console.log(msg, data);
    }
    this.player_glb = 'baria.feb1.23.glb';
    this.scene = scene;
    this.engine;
    this.canvas;
    this.camera = camera1;
    this.light_hemi;
    this.light_dir;
    this.player;
    this.players = {};
    this.agMaps = {};
    this.cc;
    this.playerCCs = {}; //for storing non-SELF player character controllers
    this.mytest = 'hello world';
    this.playerId = ''; //ID syncs to the ID generated in playerSync.js on firebase connection via event below
    this.playerName = '';
    this.playerAvatar = '';
    this.actionMap; //stores animation group settings / info
    this.charDropHeight = 4; //y pos where character enters scene, should be higher than max ground height

}

Startprototype.loadPlayer = function() {
    this.mlog.log('StartBabylon-loadPlayer', {'this.scene':this.scene}, 1);

    SceneLoader.ImportMesh(
        "",
        "https://bjs-playground.s3.amazonaws.com/",
        this.player_glb,
        this.scene,
        (meshes, particleSystems, skeletons, animationGroups) => {
        this.mlog.log('StartBabylon-loadPlayer', {'meshes':meshes,'animationGroups':animationGroups}, 6);
        var player = meshes[0];
        this.player = player; //store reference in object
        player.name = "player1";
        player.id = "player1";
        player.position = new Vector3(1, this.charDropHeight, 1);
        player.checkCollisions = true;
        player.ellipsoid = new Vector3(0.5, 1, 0.5);
        player.ellipsoidOffset = new Vector3(0, 1, 0);
        player.scaling.scaleInPlace(0.4);
        player.rotation = player.rotationQuaternion.toEulerAngles();
        player.rotationQuaternion = null;
        //rotate the camera behind the player
        //.glbs are RHS
        player.rotation.y = Math.PI / 4;
        var alpha = (3 * Math.PI) / 2 - player.rotation.y;
        var beta = 1.25;
        var target = new Vector3(player.position.x, player.position.y + 1.5, player.position.z);
        //reset the camera pos and target 
        //this.camera.setPosition(new Vector3(alpha, beta, -2));
        this.camera.setPosition(new Vector3(-3, 1.2, -.02));
        // this.camera.setTarget(target);
        this.camera.fov = 1.3

        //standard camera setting
        this.camera.wheelPrecision = 15;
        this.camera.checkCollisions = false;

        //how close can the camera come to player
        this.camera.lowerRadiusLimit = 2;
        //how far can the camera go from the player
        this.camera.upperRadiusLimit = 20;

        //make sure the keyboard keys controlling camera are different from those controlling player
        //here we will not use any keyboard keys to control camera
        this.camera.keysLeft = [];
        this.camera.keysRight = [];
        this.camera.keysUp = [];
        this.camera.keysDown = [];
        // provide all your animation groups as a map to the character controller
        // the map should have
        // key = the name of the character controller  animation
        // and
        // value = the AnimationGroup corresponding to that animation.
        // In our example the name of the AnimationGroup is the same as the name of name of the character controller  animation
        // so the following will work.
        var agMap = {};
        var allAGs = animationGroups;
        for (let i = 0; i < allAGs.length; i++) {
            agMap[allAGs[i].name] = allAGs[i];
        }

        allAGs[0].stop();
        let faceForward = true;
        this.emitter = null;
        let cc = new CharacterController(player, this.camera, this.scene, agMap, faceForward, this.emitter);
                cc.setMode(0); //0 is the best mode - allows camera tunring beloe
        cc.setTurningOff(true); //true, allows char to turn with the camera, but causes a problem with jump

        // cc.setFaceForward(true);
        cc.setTurnSpeed(45);
        //below makes the controller point the camera at the player head which is approx
        //1.5m above the player origin
        cc.setCameraTarget(new Vector3(0, 1.5, 0));

        //if the camera comes close to the player we want to enter first person mode.
        cc.setNoFirstPerson(false);
        //the height of steps which the player can climb
        cc.setStepOffset(0.4);
        //the minimum and maximum slope the player can go up
        //between the two the player will start sliding down if it stops
        cc.setSlopeLimit(30, 60);

        //tell controller
        // - which animation range/ animation group should be used for which player animation
        // - rate at which to play that animation range
        // - wether the animation range should be looped
        //use this if name, rate or looping is different from default
        //set a parm to null if you donot want to change that
        cc.setIdleAnim(agMap["idle"], 1, true);
        cc.setTurnLeftAnim(agMap["turnLeft"], 0.5, false);
        cc.setTurnRightAnim(agMap["turnRight"], 0.5, false);
        cc.setWalkAnim(agMap["walk"], 1, true);
        cc.setWalkBackAnim(agMap["walk"], 0.5, true);
        cc.setIdleJumpAnim(agMap["jump"], 0.5, false);
        cc.setRunJumpAnim(agMap["runJump"], 0.6, false);
        cc.setFallAnim(agMap["fall"], 2, true);
        cc.setStrafeLeftAnim(agMap["walk"], 1, true);
        cc.setStrafeRightAnim(agMap["walk"], 1, true);
        cc.setRunAnim(agMap["run"], 1, true);
        cc.setSlideBackAnim(agMap["slideDown"], 1, false);
        cc.setDeathAnim(agMap["death"], 1, false);
        cc.setSwingRightAnim(agMap["swingRight"], 1, false);
        cc.setPointAnim(agMap["point"], 1, false);

        cc.setJumpSpeed(6);
        cc.setGravity(12);
        cc.setName(player.name);
        cc.setSwingRightKey("f");
        cc.setPointKey("p");

        //store this actionmap in an object property so that it can be accessed by other NON SELF characters
        //assuming each character will have the same set of actions - no more
        // this.actionMap = cc.getActionMap();
        // this.mlog.log('StartBabylon-loadPlayer setting action map', {'this.actionMap':this.actionMap}, 6);

        //set how smmothly should we transition from one animation to another
        cc.enableBlending(0.05);
        cc.setCameraElasticity(false);
        cc.start();

        this.cc = cc;
        this.loadPhysics();

        }
    )
}

Startprototype.loadPhysics = function (){

    //sphere to kick around
    var sphere;
    sphere = MeshBuilder.CreateSphere("sphere", {size: .5}, this.scene);
    var sphereAgg; 
    sphereAgg = new PhysicsAggregate(sphere, PhysicsShapeType.MESH, { mass: .01, friction: 0.08, restitution: 0.9 }, this.scene);
    sphere.position.x = 3;
    sphere.position.z = 3;
    sphere.position.y = 12;
    const rockMaterial = new StandardMaterial("rock");
    rockMaterial.diffuseTexture = new Texture("textures/rock.png");
    sphere.material = rockMaterial;
    sphere.checkCollisions = true;

    let player_physics_capsule;
    //create box mesh 
    player_physics_capsule = MeshBuilder.CreateCapsule("player_physics_capsule_mesh", {radius: .5, height:2}, this.scene);
    player_physics_capsule.visibility = 0;
    var playerPhysicsRoot = new MeshBuilder.CreateCapsule("player_physics_capsule_physics_root", {radius: .5, height:2}, this.scene);
        playerPhysicsRoot.addChild(player_physics_capsule);
        playerPhysicsRoot.visibility = 0;
        playerPhysicsRoot.isPickable = false;

    var capsuleAggregate;
    capsuleAggregate = new PhysicsAggregate(playerPhysicsRoot, PhysicsShapeType.CAPSULE, { mass: 1}, this.scene);
        capsuleAggregate.setCollisionCallbackEnabled = true;
        capsuleAggregate.body.setCollisionCallbackEnabled(true);
        capsuleAggregate.body.setMotionType(PhysicsMotionType.STATIC);
        capsuleAggregate.body.disablePreStep = false;

        capsuleAggregate.body.setMassProperties({
            mass: 100,
                inertia: new Vector3(0,0,0),
                centerOfMass: new Vector3(0,0,0)
        });

    this.viewer = new Debug.PhysicsViewer(this.scene);

    this.scene.registerBeforeRender(()=> {
        playerPhysicsRoot.position = new Vector3(this.player.position.x, this.player.position.y+.7, this.player.position.z);
        capsuleAggregate.position = playerPhysicsRoot.position;
        for (let mesh of this.scene.meshes) {
            if (mesh.physicsBody) {
                this.viewer.showBody(mesh.physicsBody);
            }
        }

    });

    }

        window.initFunction = async function() {
            
            globalThis.HK = await HavokPhysics();
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = delayCreateScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});