import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { CharacterController } from "./CharacterController";
import { Models } from "./Models";


export class Player{


    constructor(scene){
        this.scene=scene;
        this.body;
        this.createPlayer();
        this.enableMovement();
    }
    createPlayer(){

        //let player = new Models().skieur(3,5,0);

        
        let player = MeshBuilder.CreateBox("player",this.scene);
        player.position = new Vector3(3,5,0);
       
        //const playerAggregate = new PhysicsAggregate(player, PhysicsShapeType.CAPSULE, { mass: 1, restitution: 0.75 }, this.scene);
        const playerAggregate = new PhysicsAggregate(player, PhysicsShapeType.BOX, { mass: 1, restitution: 0.75 }, this.scene);
        this.body = player.physicsBody;
    }

    enableMovement(){
        var characterController = new CharacterController(this.scene,this.body);

    }

    

}