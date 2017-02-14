const canvas = (function() {
  const canvas  = document.querySelector('canvas')
  const context = canvas.getContext('2d')

  const width  = context.canvas.width  = window.innerWidth
  const height = context.canvas.height = window.innerHeight

  window.onresize = canvasResize

  function draw(callback) {
    callback(context)
  }

  function dim() {
    const width  = context.canvas.width
    const height = context.canvas.height

    return { width, height }
  }

  function canvasResize() {
    context.canvas.width = window.innerWidth
    context.canvas.height = window.innerHeight
  }


  return { draw, dim }
})()

class Dots {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

;(function() {
  canvas.draw(ctx => {
    let width  = canvas.dim().width
    let height = canvas.dim().height

    
  })

})()
