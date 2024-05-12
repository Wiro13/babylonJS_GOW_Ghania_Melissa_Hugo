
import CharacterController from './CharacterController2.js';
import { CustomModels } from './CustomModels.js';
import { Color3, Color4, CubeTexture, DefaultRenderingPipeline,PhysicsShapeBox, PhysicsBody,DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
var canvas2 = document.getElementById("renderCanvas");

export class PlayerLevel1 {

    constructor(scene,engine,name,forward,backward,left,right,x,y,z) {
        this.scene = scene;
        this.engine = engine;
        this.boxBody ;

        this.testPlayer(scene,engine,name,x,y,z);
        this.enablePlayerControl(forward,backward,left,right);
     
    }

    testPlayer(scene,engine,name,x,y,z){
        var boxW = 1;
        var boxH = 1;
        var boxD = 1;

        var box = MeshBuilder.CreateBox(name, {width: boxW, height: boxH, depth: boxD},scene);
        box.position = new Vector3(x,y,z);
        box.rotation = new Vector3(0,0,0);
        box.isVisible = false;
        let snowMan = new CustomModels(scene).CreateSnowManOnSki(x, y+1, z, box);
        
        var boxShape = new PhysicsShapeBox(new Vector3(0,0,0), Quaternion.Identity(), new Vector3(boxW, boxH, boxD), scene);
        var boxBody = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, scene);
    
        boxBody.shape = boxShape;
        boxBody.setMassProperties({mass : 1})
    
        var blueMaterial = new StandardMaterial("groundMaterial", scene);
        blueMaterial.diffuseColor = new Color3(0, 0, 1);
        box.material = blueMaterial;
       
        
        boxBody.setCollisionCallbackEnabled(true)

        //rotate character
        this.boxBody = boxBody;      
        
        return box;
    }

    enablePlayerControl(forward,backward,left,right){
       let control = new CharacterController(canvas2,this.engine,this.boxBody,forward,backward,left,right);
    }
}
export default PlayerLevel1;