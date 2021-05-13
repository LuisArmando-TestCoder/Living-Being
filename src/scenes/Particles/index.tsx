import * as THREE from 'three'
import presetScene, {consulters} from 'scene-preset'
import * as objects from '../../objects'

export default id => presetScene({
    setup({scene}) {

        const videoFramePixels = objects.L2.getVideoFramePixels(
            '../../videos/capture.mp4',
            '../../audios/Natural.mp3',
            {
                position: new THREE.Vector3(0, 0, -200),
                pixelSize: 15,
                modifier: (mesh: THREE.Object3D, index: number, time: number, frequencies) => {
                    const fraction = 1.5
                    const radius = 20

                    mesh.position.x = Math.sin(index / fraction + time) * radius
                    mesh.position.y = Math.cos(index / fraction + time) * radius
                                    + Math.sin(Math.cos(index / (fraction * 50)) + time) * radius
                    mesh.position.z = index / fraction

                    mesh.lookAt(0, 0, 0)

                    const scaledFrequency = frequencies[index] / 256

                    mesh.scale.set(1, scaledFrequency, 1)
                }
            }
        )

        scene.add(videoFramePixels as any)
    },
}, `#${id}`)