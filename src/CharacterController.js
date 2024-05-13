import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

export class CharacterController {
    constructor(scene,body) {
        this.scene = scene;
        this.body = body;

        scene.onKeyboardObservable.add((info) => {
            if (info.type === KeyboardEventTypes.KEYDOWN) {
                this.handleKeyDown(info.event);
            }
        });
    }

    handleKeyDown(event) {
        // Define movement speed and acceleration
        const movementSpeed = 0.1;
        const acceleration = 0.02;
    
        if (event.key === "q" || event.key === "Q") {
            // Rotate left
            this.body.rotate(Vector3.Up(), -Math.PI / 8); // Adjust rotation angle as needed
            console.log("Q key pressed");
        } else if (event.key === "d" || event.key === "D") {
            // Rotate right
            this.body.rotate(Vector3.Up(), Math.PI / 8); // Adjust rotation angle as needed
            console.log("D key pressed");
        } else if (event.key === "z" || event.key === "Z") {
            // Apply forward movement
            let forward = this.body.transformNode.forward.scale(movementSpeed);
            this.body.applyForce(forward, this.body.transformNode.position);
            console.log("Z key pressed");
        } else if (event.key === "s" || event.key === "S") {
            // Apply backward movement
            let backward = this.body.transformNode.forward.scale(-movementSpeed / 2); // Adjust backward speed
            this.body.applyForce(backward, this.body.transformNode.position);
            console.log("S key pressed");
        }
    }
    
}
