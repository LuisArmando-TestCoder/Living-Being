import * as objects from '../..'

const canvas = document.createElement('canvas')
const canvasContext = canvas.getContext('2d')
const canvasPixels = []

function getImageData() {
    return canvasContext.getImageData(
        0, 0,
        canvas.width,
        canvas.height
    ).data
}

function getCanvasPixels({
    pixels,
    pixelSize,
    customizePixel
}) {
    let index = 0

    for (
        let y = 0;
        y < canvas.width * canvas.height * 4;
        y += canvas.width * 4 * pixelSize
    ) {
        for (
            let x = 0;
            x < canvas.width * 4;
            x += 4 * pixelSize,
            index++
        ) {
            const item = x + y
            const [red, green, blue, alpha] = [
                pixels[item], pixels[item + 1],
                pixels[item + 2], pixels[item + 3],
            ]
            const pixel = {
                red, green, blue, alpha,
                x: x / 4 / pixelSize,
                y: y / canvas.width / 4 / pixelSize
            }

            if (customizePixel) customizePixel(pixel)

            canvasPixels[index] = pixel
        }
    }

    return canvasPixels
}

function getPixels({
    pixelSize = 1,
    opacity = 1,
}) {
    return getCanvasPixels({
        pixels: getImageData(),
        pixelSize,
        customizePixel(pixel) {
            const {
                red, green, blue,
                alpha, x, y
            } = pixel

            pixel.position = {x, y, z: 0}
            pixel.color = `rgba(${red},${green},${blue},${opacity || alpha})`
            pixel.size = 1
        }
    })
}

function setGroupPixels({group, pixelSize}) {
    const pixels = getPixels({pixelSize})
    const cubicPixels = objects.L1.getCubes(pixels)

    cubicPixels.children.forEach(cubicPixel => {
        group.add(cubicPixel)
    })
}

function changePixelsGroup({group, pixelSize, modifier}) {
    const pixels = getPixels({pixelSize})
    const time = Date.now() / 1e3

    group.children.forEach((cubicPixel, index) => {
        cubicPixel.position.set(
            cubicPixel?.['original']?.position?.x,
            cubicPixel?.['original']?.position?.y,
            cubicPixel?.['original']?.position?.z
        )

        modifier(cubicPixel.position, index, time)

        cubicPixel?.material?.color?.setStyle(
            pixels?.[index]?.color
        )
    })
}

function frame() {
    canvasContext.drawImage(this.video, 0, 0)
    changePixelsGroup(this)
    requestAnimationFrame(frame.bind(this))
}

export default ({
    group, url, pixelSize, modifier
}: {
    group: THREE.Group,
    url: string,
    pixelSize: number,
    modifier: (position: THREE.Vector3, index: number, time: number) => void
}) => {
    const video = document.createElement('video')

    video.src = url
    video.loop = false

    video.addEventListener('canplay', () => {
        if (!video.loop) {
            video.loop = true
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
    
            
            setGroupPixels({group, pixelSize})
            
            frame.call({video, group, pixelSize, modifier})
            
            window.addEventListener('click', () => {
                (video.paused ? video.play : video.pause).call(video)
            })
        }
    })
}