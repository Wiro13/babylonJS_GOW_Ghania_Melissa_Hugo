import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";



export class CharacterController{
    constructor(scene,body){
        this.scene = scene;
        this.body = body;
     
    }

    handleKeyUp(event) {
      
    }

    updateRotation() {

    }

    // Function to handle arrow key presses
    handleKeyDown(event) {
        const speed = 0.1; // Adjust the speed as needed

        switch (event.key) {
            case "ArrowUp":
               
                break;
            case "ArrowDown":
             
                break;
            case "ArrowLeft":
               
            
                break;
            case "ArrowRight":
        
                break;
            case " ":
          
                break;
        }
    }
    
}