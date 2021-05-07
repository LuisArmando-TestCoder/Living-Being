import * as THREE from 'three'

export default (
    elements: {
        x: number,
        y: number,
        z: number,
        color: string,
        size: number
    }[],
    callback: (size: number) => any
): THREE.Object3D => {
    const group = new THREE.Group()

    elements.forEach(({x, y, z, color, size}) => {
        const geometry = callback(size)
        const material = new THREE.MeshStandardMaterial({color})
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(x, y, z)

        group.add(mesh)
    })

    return group
}