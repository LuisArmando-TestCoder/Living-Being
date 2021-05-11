import * as THREE from 'three'
import presetScene from 'scene-preset'
import * as objects from '../../objects'

const videoFramePixels = objects.L2.getVideoFramePixels(
    '../../videos/capture.mp4',
    {
        position: new THREE.Vector3(-10, -10, 50),
        pixelSize: 10,
        modifier: (position: THREE.Vector3, index: number, time: number) => {
            position.z = index / 5 + Math.sin(time)
        }
    }
)

export default id => presetScene({
    setup({scene}) {
        scene.add(videoFramePixels as any)
    },
}, `#${id}`)