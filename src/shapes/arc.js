import {defaultTheme} from '../theme'

export default (context, props = {}) => {
  // TODO: check props types
  const {x, y, radius, startAngle, endAngle, anticlockwise, fillStyle} = props
  if (fillStyle) {
    context.fillStyle = fillStyle  
  }
  
  context.beginPath()
  context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  context.fill()
}