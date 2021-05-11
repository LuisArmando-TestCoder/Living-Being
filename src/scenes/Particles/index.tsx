import * as THREE from 'three'
import presetScene from 'scene-preset'
import * as objects from '../../objects'

const videoFramePixels = objects.L2.getVideoFramePixels(
    '../../videos/capture.mp4',
    {
        position: new THREE.Vector3(0, 0, -200),
        pixelSize: 10,
        modifier: (position: THREE.Vector3, index: number, time: number) => {
            const fraction = 5
            const radius = 20

            position.z = index / fraction
            position.x = Math.sin(index / fraction + time) * radius
            position.y = Math.cos(index / fraction + time) * radius
        }
    }
)

export default id => presetScene({
    setup({scene}) {
        scene.add(videoFramePixels as any)
    },
}, `#${id}`)