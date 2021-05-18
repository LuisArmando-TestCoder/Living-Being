import * as THREE from 'three'
import createText from 'three-bmfont-text'
import MSDFShader from 'three-bmfont-text/shaders/msdf'
import {getFont} from '../../../utils'

function getGlyph({
    font, text, texture,
    align, color
}) {
    const geometry = createText({
        text,
        font,
        align, // 'left' | 'right' | 'center'
        flipY: texture.flipY
    })
    const material = new THREE.RawShaderMaterial(MSDFShader({
        map: texture,
        transparent: true,
        color // some color
    }))
    const mesh = new THREE.Mesh(geometry, material)
    const container = new THREE.Object3D()
    const textAnchor = new THREE.Object3D()

    textAnchor.add(text)
    container.add(mesh)

    return container
}

export default ({
    text,
    fontName = 'Roboto-msdf',
    align = 'left',
    color = '#333'
}) => {
    const fontPath = `../../fonts/${fontName}.`

    return new Promise(resolve => {
        getFont({
            font: `${fontPath}json`,
            image: `${fontPath}png`
        }, (font, texture) => {
            resolve(
                getGlyph({
                    font, text, texture,
                    align, color
                })
            )
        })
    })
}