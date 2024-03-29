import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";


export class Player{

    constructor(scene){
        this.scene=scene;
        this.createPlayer();
    }
    createPlayer(){
        let player = MeshBuilder.CreateCapsule("player",this.scene);
        player.position = new Vector3(0,5,0);
        const playerAggregate = new PhysicsAggregate(player, PhysicsShapeType.CAPSULE, { mass: 1, restitution: 0.75 }, this.scene);
    
    }
    

}