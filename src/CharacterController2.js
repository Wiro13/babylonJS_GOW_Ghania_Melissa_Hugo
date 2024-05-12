import { Color3, Color4, CubeTexture, DefaultRenderingPipeline,PhysicsShapeBox, PhysicsBody,DirectionalLight, FlyCamera, FollowCamera, FreeCamera, GizmoManager, HavokPlugin, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, ParticleSystem, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Quaternion, Scalar, Scene, SceneLoader, ShadowGenerator, Sound, StandardMaterial, TargetCamera, Texture, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
class CharacterController {
    constructor(canvas , engine, character,forward,backward,left,right) {
        this.setupKeyboardInput(canvas, engine, character,forward,backward,left,right);
    }

    setupKeyboardInput(canvas, engine, character,forwardI,backward,left,right) {
        this.keys = {};

        // Écoute l'événement "keydown" (touche enfoncée) sur le canvas.
        canvas.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        // Écoute l'événement "keyup" (touche relâchée) sur le canvas.
        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        // Démarre la boucle de rendu du moteur Babylon.js.
        engine.runRenderLoop(() => {
            // Vérifie l'état des touches dans l'objet "keys" et effectue des actions en conséquence.

            if (this.keys[forwardI]) {
                //console.log('Touche Z enfoncée');
                
                let forward = character.transformNode.forward.scale(-5);
               console.log("TOUCHE Z");

                character.applyForce(forward , character.transformNode.position);
                character.setAngularVelocity(Vector3.ZeroReadOnly);
          
            }

            if (this.keys[backward]) {
                //console.log('Touche S enfoncée');
                character.applyForce(new Vector3(0, 0, 5), new Vector3(0, 0, 0));
                character.setAngularVelocity(Vector3.ZeroReadOnly);
                //character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                //charater.position.z += 0.1; // Déplace le personnage vers l'avant (positif sur l'axe z).
            }

            if (this.keys[left]) {
                //console.log('Touche Q enfoncée');
                //character.applyForce(new Vector3(5, 0, 0), new Vector3(0, 0, 0));
                character.setAngularVelocity(new Vector3(0, -1, 0),new Vector3(0, 0, 0));
                //character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
                //character.position.x += 0.1; // Déplace le personnage vers la gauche (positif sur l'axe x).
            }

            if (this.keys[right]) {
                //console.log('Touche D enfoncée');
                //character.applyForce(new Vector3(-5, 0, 0), new Vector3(0, 0, 0));
                character.setAngularVelocity(new Vector3(0, 1, 0));
                //character.position.x -= 0.1; // Déplace le personnage vers la droite (négatif sur l'axe x).
            }
        });
    }
}

export default CharacterController;
