
import skierUrl from "../assets/models/skier_low_poly_character.glb";
import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
export class CustomModels {

    constructor(scene) {
        this.scene = scene;
    }

    CreateSnowManOnSki(x, y, z,parent) {
        let mesh;
    
        SceneLoader.ImportMesh("", "", skierUrl, this.scene, (meshes) => {
            console.log("Chargement réussi SnowMan", meshes);
            mesh = meshes[0];
            mesh.name = "SnowMan";
            mesh.position = new Vector3(x, y, z);
            mesh.setParent(parent);
          
        }, undefined, undefined, ".glb");
    
        return { mesh };
    }

    async flatplane(x, y, z,width,height,scene) {
      
        let subdivisions = 1
        
        var ground = MeshBuilder.CreateGround("ground", { width, height, subdivisions },scene);
        ground.position.addInPlace(new Vector3(x, y, z));
       
       
        ground.rotation = new Vector3(0, 0, 0);

        var groundAggregate =new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
        
        var groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new Color3(0.92, 0.29, 0.28);
        
        ground.material = groundMaterial;
        return ground;
    }
}
