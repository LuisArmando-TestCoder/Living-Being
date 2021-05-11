import * as THREE from 'three'

export default (
    elements: {
        position: {
            x: number,
            y: number,
            z: number,
        }
        color: string,
        size: number
    }[],
    callback: (size: number) => any
): THREE.Object3D => {
    const group = new THREE.Group()

    elements.forEach(({position, color, size}) => {
        const geometry = callback(size)
        const material = new THREE.MeshBasicMaterial({color})
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(position.x, position.y, position.z)

        mesh['original'] = {position: position}
        
        group.add(mesh)
    })

    return group
}