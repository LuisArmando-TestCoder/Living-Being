import presetScene from 'scene-preset'
import * as objects from '../../objects'

const cubes = objects.L1.getCubes([{x: 0, y: 0, z: 0, color: '#000', size: 1}])
const prisms = objects.L1.getPrisms([{x: 0, y: 2, z: 0, color: '#000', size: 1}])

export default id => presetScene({
    setup({scene}) {
        scene.add(cubes as any)
        scene.add(prisms as any)
    },
    animate() {
    }
}, `#${id}`)