
import CharacterController from './CharacterController2.js';
import { CustomModels } from './CustomModels.js';
import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
var canvas2 = document.getElementById("renderCanvas");
//var engine2 = new BABYLON.Engine(canvas2, true);

//variables



export class PlayerLevel1 {

    constructor(scene,engine,name,forward,backward,left,right,x,y,z) {
        this.scene = scene;
        this.engine = engine;
        this.boxBody ;

        this.testPlayer(scene,engine,name,x,y,z);
        this.enablePlayerControl(forward,backward,left,right);
     
    }
    

    testPlayer(scene,engine,name,x,y,z){

        
       let flatPlane = new CustomModels(scene).flatplane(0,10,0,80,80,scene);
        

        var boxW = 2;
        var boxH = 2;
        var boxD = 2;

        var box = MeshBuilder.CreateBox(name, {width: boxW, height: boxH, depth: boxD},scene);
        box.position = new Vector3(x,y,z);
        //box.isVisible = false;
        //var box2 = BABYLON.MeshBuilder.CreateBox(name, {width: boxW, height: boxH, depth: boxD},scene);
        //box.addChild(snowMan);
        let snowMan = new CustomModels(scene).CreateSnowManOnSki(x,y-0.5,z,box);
    
       
  
        
      
        
        var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD), scene);
        var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);
    
        boxBody.shape = boxShape;
        boxBody.setMassProperties({mass : 1})
    
    
        //add create material add tothe cube
        var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
        box.material = blueMaterial;
       
        
        boxBody.setCollisionCallbackEnabled(true)

        //rotate character
      

        this.boxBody = boxBody;      
        
     
        
      
        
        
    
       
 
        return box;
    
        
    }
  
 
    enablePlayerControl(forward,backward,left,right){
       let control = new CharacterController(canvas2,this.engine,this.boxBody,forward,backward,left,right);
    }
    

    destroyPlayer(){
        
        control = null;
    }



}
export default PlayerLevel1;