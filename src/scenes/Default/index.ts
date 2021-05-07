import presetScene, { actions } from 'scene-preset'

export default id => presetScene({
    setup() {
        actions.blacklistControls([
            'setFirstPersonZoom',
            'setCanvasAutoFocus',
        ], `#${id}`)
    },
    animate({scene}) {
        scene.getObjectByName('SimpleFloor').visible = false
        scene.getObjectByName('SimpleCube').visible = false
    }
}, `#${id}`)