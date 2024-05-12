import { Color3, Color4, CubeTexture, DefaultRenderingPipeline,PhysicsShapeBox, PhysicsBody,DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
class CharacterController {
    constructor(canvas , engine, character,forward,backward,left,right) {
        this.setupKeyboardInput(canvas, engine, character,forward,backward,left,right);
    }

    setupKeyboardInput(canvas, engine, character,forwardI,backward,left,right) {
        this.keys = {};

        canvas.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        engine.runRenderLoop(() => {

            if (this.keys[forwardI]) {
                let forward = character.transformNode.forward.scale(-5);

                character.applyForce(forward , character.transformNode.position);
                character.setAngularVelocity(Vector3.ZeroReadOnly);
          
            }

            if (this.keys[backward]) {
                character.applyForce(new Vector3(0, 0, 5), new Vector3(0, 0, 0));
                character.setAngularVelocity(Vector3.ZeroReadOnly);
            }

            if (this.keys[left]) {
                character.setAngularVelocity(new Vector3(0, -1, 0),new Vector3(0, 0, 0));
            }

            if (this.keys[right]) {
                character.setAngularVelocity(new Vector3(0, 1, 0));
            }
        });
    }
}

export default CharacterController;
