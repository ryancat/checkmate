import {defaultTheme} from '../theme'

export function drawText (context, props = {}) {
  // TODO: check props types
  const {
    x, 
    y, 
    fillStyle = defaultTheme.FONT_COLOR, 
    font = defaultTheme.FONT, 
    fontSize = defaultTheme.FONT_SIZE, 
    text
  } = props
  
  context.fillStyle = fillStyle
  context.font = fontSize + 'px ' + font

  context.fillText(text, x, y)
}

export function drawTextInWidth (context, props = {}) {
  const {
    x,
    y,
    width,
    text,
    fillStyle = defaultTheme.FONT_COLOR, 
    font = defaultTheme.FONT, 
    fontSize = defaultTheme.FONT_SIZE,
    lineHeight = fontSize
  } = props

  context.fillStyle = fillStyle
  context.font = fontSize + 'px ' + font

  let textArr = text.split(' '),
      newText = '',
      newTextArr = []

  while (textArr.length) {
    let word = textArr.splice(0, 1)

    if (context.measureText(newText + word).width > width) {
      newTextArr.push(newText)
      newText = ''
    }
    else {
      newText += word + ' '
    }
  }
  newTextArr.push(newText)

  newTextArr.forEach((t, tIndex) => {
    context.fillText(t, x, y + tIndex * lineHeight)
  })
}