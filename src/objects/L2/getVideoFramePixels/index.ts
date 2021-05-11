import * as THREE from 'three'
import setVideoGroup from './setVideoGroup'

export default (
    url: string,
    configuration: {
        position: THREE.Vector3,
        pixelSize: number
        modifier: (position: THREE.Vector3, index: number, time: number) => void
    }
): THREE.Group =>  {
    const group = new THREE.Group()

    group.position.set(
        configuration.position.x,
        configuration.position.y,
        configuration.position.z
    )

    setVideoGroup({
        group,
        url,
        pixelSize: configuration.pixelSize,
        modifier: configuration.modifier,
    })

    return group
}