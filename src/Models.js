import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

import mountainUrl from "../assets/models/snowy_slope.glb";
import skierUrl from "../assets/models/skier_low_poly_character.glb";


export class Models {

    constructor(scene) {
        this.scene = scene;
    }
/*
    importMontain() {
        SceneLoader.ImportMeshAsync("", "", mountainUrl).then((result) => {
            let mountain = result.meshes[1];
            mountain.name = "Mountain";
            mountain.position = new Vector3(0, 0, 0);
            mountain.scaling = new Vector3(1, 1, 1);

            let mountainMaterial = new StandardMaterial("mountainMaterial", this.scene);
            mountainMaterial.diffuseColor = new Color3(1, 1, 1);
            mountain.material = mountainMaterial;

            new PhysicsAggregate(mountain, PhysicsShapeType.MESH, { mass: 0, restitution: 0 }, this.scene);
        });
    }
*/
    importMontain() {
        let boundingBox;
            SceneLoader.ImportMesh("", "", mountainUrl, this.scene, (meshes) => {
                let mountain = meshes[1];
                mountain.name = "Mountain";
                mountain.position = new Vector3(0, 0, 0);
                mountain.scaling = new Vector3(1, 1, 1);
                //mountain.rotation = new Vector3(10,0,0);
                let mountainMaterial = new StandardMaterial("mountainMaterial", this.scene);
                mountainMaterial.diffuseColor = new Color3(1, 1, 1);
                mountain.material = mountainMaterial;
                
                let i = 1;
                console.log(meshes.length);
                console.log(i);
                while(i < meshes.length) {
                    new PhysicsAggregate(meshes[i], PhysicsShapeType.MESH, { mass: 0, restitution: 0 }, this.scene);
                    i++;
                }
            }, undefined, undefined, "");
    }


    skieur1() {
        SceneLoader.ImportMeshAsync("", "", skierUrl, this.scene).then((result) => {
            let capsule = MeshBuilder.CreateBox("collider", this.scene);
            capsule.material = new StandardMaterial("capsuleMat");
            capsule.isVisible = false;
            let skier = result.meshes[1];
            skier.parent = capsule;
            skier.scaling = new Vector3(0.01, 0.01, 0.01);
        });
    }

    skieur(x, y, z) {
        SceneLoader.ImportMeshAsync("", "", skierUrl, this.scene).then((result) => {
            
            let skier = result.meshes[1]
            skier.scaling = new Vector3(0.01, 0.01, 0.01);
            skier.position = new Vector3(x, y, z);
            return skier;
        });
    }

    ground() {
        //Creation du ground
        let ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);
        //Gestion de la physique
        const groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, this.scene);
        //Gestion de la couleur 
        let snowMaterial = new StandardMaterial("snowMaterial", this.scene);
        snowMaterial.diffuseColor = new Color3(0.8, 0.8, 1);
        snowMaterial.specularColor = new Color3(0, 0, 0);
        ground.material = snowMaterial;
    }
}