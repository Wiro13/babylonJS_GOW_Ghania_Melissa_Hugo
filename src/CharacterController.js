import { Color3, Color4, CubeTexture, DefaultRenderingPipeline, DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";

export class CharacterController {
    constructor(scene,body) {
        this.scene = scene;
        this.body = body;

        // Listen to key down events on the scene
        scene.onKeyboardObservable.add((info) => {
            if (info.type === KeyboardEventTypes.KEYDOWN) {
                this.handleKeyDown(info.event);
            }
        });
    }

    // Function to handle key down events and log each key individually
    handleKeyDown(event) {
        if (event.key === "q" || event.key === "Q") {
            let forward = this.body.transformNode.forward.scale(-0.3);
            this.body.applyForce(forward,this.body.transformNode.position);
            this.body.applyForce(new Vector3(0,-0.5,0),new Vector3(0,0,0));
            this.body.setAngularVelocity(new Vector3(0, -1, 0));
            console.log("Q key pressed");
        } else if (event.key === "d" || event.key === "D") {
            let forward = this.body.transformNode.forward.scale(0.3);
            this.body.applyForce(forward,this.body.transformNode.position);
            this.body.applyForce(new Vector3(0,0.5,0),new Vector3(0,0,0));
            this.body.setAngularVelocity(new Vector3(0, 1, 0));
            console.log("D key pressed");
        } else if (event.key === "z" || event.key === "Z") {
            this.body.applyForce(new Vector3(-0.5,0,0),new Vector3(0,0,0));
            this.body.setAngularVelocity(Vector3.ZeroReadOnly);
            console.log("Z key pressed");
        }
    }
}