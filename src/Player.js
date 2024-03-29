import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { CharacterController } from "./CharacterController";


export class Player{

    constructor(scene){
        this.scene=scene;
        this.body;
        this.createPlayer();
        this.enableMovement();
    }
    createPlayer(){
        let player = MeshBuilder.CreateCapsule("player",this.scene);
        player.position = new Vector3(0,5,0);
        this.body = player.physicsBody;
        const playerAggregate = new PhysicsAggregate(player, PhysicsShapeType.CAPSULE, { mass: 1, restitution: 0.75 }, this.scene);
    
    }

    enableMovement(){
        var characterController = new CharacterController(this.scene,this.body);

    }
    

}