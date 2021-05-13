import React from 'react'
import {actions} from 'scene-preset'
import * as Components from '../components'

actions.addSceneSetupIntrude((canvasState) => {
  canvasState.presetConfiguration.ambient.color = 0x000
})

export default () => {
  return (
    <Components.L0.GlobalWrapper title='Home'>
      <Components.L1.Canvas3D
        scenes={['Default', 'Particles']}
        id='MainScene'
      />
    </Components.L0.GlobalWrapper>
  )
}
