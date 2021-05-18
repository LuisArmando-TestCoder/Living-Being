import loadFont from 'load-bmfont'
import * as THREE from 'three'

// https://github.com/Jam3/three-bmfont-text/blob/master/test/load.js
export default (
    {font, image}: {
        font: string,
        image: string
    },
    callback: (font, texture) => void) => {
    loadFont(font, function (err, font) {
        if (err) throw err

        THREE.ImageUtils.loadTexture(image, undefined, texture => {
            callback(font, texture)
        })
    })
}
