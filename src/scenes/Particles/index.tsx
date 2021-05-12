import * as THREE from 'three'
import presetScene from 'scene-preset'
import * as objects from '../../objects'

export default id => presetScene({
    setup({scene, camera}) {
        const videoFramePixels = objects.L2.getVideoFramePixels(
            '../../videos/capture.mp4',
            {
                position: new THREE.Vector3(0, 0, -200),
                pixelSize: 15,
                modifier: (mesh: THREE.Object3D, index: number, time: number) => {
                    const fraction = 5
                    const radius = 20
        
                    mesh.position.x = Math.sin(index / fraction + time) * radius
                    mesh.position.y = Math.cos(index / fraction + time) * radius
                                    + Math.sin(Math.cos(index / (fraction * 50)) + time) * radius
                    mesh.position.z = index / fraction
        
                    mesh.lookAt(
                        Math.sin(time) * radius,
                        Math.sin(time) * radius + Math.sin(Math.cos(time) * radius),
                        0
                    )
                }
            }
        )

        scene.add(videoFramePixels as any)
    },
}, `#${id}`)