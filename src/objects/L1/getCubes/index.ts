import * as THREE from 'three'
import * as objects from '../..'

export default cubes => {
    return objects.L0.getGroup(
        cubes,
        size => new THREE.BoxBufferGeometry(size, size, size)
    )
}