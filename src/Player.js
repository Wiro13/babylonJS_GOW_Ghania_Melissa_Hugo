import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { CharacterController } from "./CharacterController";
import { Models } from "./Models";
import skierUrl from "../assets/models/skier_low_poly_character.glb";


export class Player {
    constructor(scene){
        this.scene = scene;
        this.body;
        this.createPlayer();
        this.enableMovement();
    }

    createPlayer(){
        let player = MeshBuilder.CreateBox("player",this.scene);
        player.position = new Vector3(0.22,0.57,0);
        player.scaling._x = 0.08;
        player.scaling._z = 0.045;
        player.scaling._y = 0.04;
        player.isVisible = false;

        this.character(0, 0, 0, player);
       
        const playerAggregate = new PhysicsAggregate(player, PhysicsShapeType.BOX, { mass: 1, restitution: 0.075 }, this.scene);
        this.body = player.physicsBody;
    }

    enableMovement(){
        var characterController = new CharacterController(this.scene,this.body);
    }

    async character(x,y,z,parent){
        let mesh;

        const {meshes} = await SceneLoader.ImportMeshAsync("","",skierUrl, this.scene);

        mesh = meshes[0];
        mesh.name = "Skier";
        mesh.scaling._x = 0.1;
        mesh.scaling._y = 0.1;
        mesh.scaling._z = 0.1;
        mesh.position = new Vector3(x, y, z);
        mesh.setParent(parent);
    }
}