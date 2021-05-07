import * as THREE from 'three'
import * as objects from '../..'

export default prisms => {
    return objects.L0.getGroup(
        prisms,
        size => new THREE.CylinderGeometry(size / 4, size / 4, size, 3)
    )
}