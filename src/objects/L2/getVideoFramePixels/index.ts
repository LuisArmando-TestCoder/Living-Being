import * as THREE from 'three'
import setVideoGroup from './setVideoGroup'

export default (
    url: string,
    audioUrl: string,
    configuration: {
        position: THREE.Vector3,
        pixelSize: number
        modifier: (mesh: THREE.Object3D, index: number, time: number, frequencies) => void
    }
): THREE.Group =>  {
    const group = new THREE.Group()

    group.position.set(
        configuration.position.x,
        configuration.position.y,
        configuration.position.z
    )

    const audio = document.createElement('audio')

    audio.src = audioUrl

    setVideoGroup({
        group,
        url,
        pixelSize: configuration.pixelSize,
        modifier: configuration.modifier,
        audio,
    })

    return group
}