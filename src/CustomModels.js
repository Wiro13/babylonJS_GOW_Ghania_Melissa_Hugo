
import skierUrl from "../assets/models/skier_low_poly_character.glb";
import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
export class CustomModels {

    constructor(scene) {
        this.scene = scene;
    }

    
    
    


    CreateSnowManOnSki(x, y, z,parent) {
        let mesh; // Déclaration de mesh à un niveau supérieur pour qu'il soit accessible en dehors de la fonction de rappel
    
        // Charger le modèle 3D
        SceneLoader.ImportMesh("", "", skierUrl, this.scene, (meshes) => {
            console.log("Chargement réussi SnowMan", meshes);
            mesh = meshes[0]; // Assignation de meshes[0] à mesh
            mesh.name = "SnowMan";
            mesh.position = new Vector3(x, y, z); // Positionne le modèle une fois chargé
            mesh.setParent(parent);
 
            //mesh.rotationQuaternion._y = 85;

          
        }, undefined, undefined, ".glb");
    
        return { mesh }; // Retourne mesh
    }

    async flatplane(x, y, z,width,height,scene) {
      
        let subdivisions = 1
        
        var ground = MeshBuilder.CreateGround("ground", { width, height, subdivisions },scene);
        ground.position.addInPlace(new Vector3(x, y, z)); 
        // Créez un quaternion pour représenter la rotation souhaitée
       
       
        ground.rotation = new Vector3(0, 0, 0);

        
        //create physic impostor
        var groundAggregate =new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
        
            // Appliquez la rotation au sol
      
        // create Materials
        var groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new Color3(0.92, 0.29, 0.28); // Rouge doux
         // Set position of the ground
        //ground.position = new BABYLON.Vector3(x, y, z);
        
        //add material to the object
        ground.material = groundMaterial;
        //console.log(ground);
        return ground;
     
    }


   



    
   
}
