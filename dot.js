const canvas = (function() {
  const canvas  = document.querySelector('canvas')
  const context = canvas.getContext('2d')

  const width  = context.canvas.width  = window.innerWidth
  const height = context.canvas.height = window.innerHeight

  function draw(callback) {
    callback(context)
  }

  function dim() {
    const width  = context.canvas.width
    const height = context.canvas.height

    return { width, height }
  }

  return { context, dim }
})()

class Dot {
  constructor(posX, posY, speedX, speedY) {
    this.posX   = posX
    this.posY   = posY
    this.speedX = speedX
    this.speedY = speedY
    this.size   = 4
  }
}

function createDots(n, width, height) {
  const dots = []

  function randSign() {
    return Math.round(Math.random()) ? 1 : -1
  }

  for(let i = 0; i < n; i++) {
    let randX  = Math.floor(Math.random() * width)
    let randY  = Math.floor(Math.random() * height)
    let speedX = 1 * randSign()
    let speedY = 1 * randSign()

    dots.push(new Dot(randX, randY, speedX, speedY))
  }

  return dots
}



;(function() {
  const ctx        = canvas.context
  const item_size  = 50

  let width  = canvas.dim().width
  let height = canvas.dim().height
  let dots   = createDots(item_size, width, height)

  window.onresize = redraw

  function redraw() {
    width  = ctx.canvas.width  = window.innerWidth
    height = ctx.canvas.height = window.innerHeight
    dots   = createDots(item_size, width, height)
  }


  function draw() {
    ctx.clearRect(0, 0, width, height)

    dots.forEach( dot => {
      console.log(dot.posX, dot.posY)

      dot.posX = dot.posX + dot.speedX
      dot.posY = dot.posY + dot.speedY

      if(dot.posX > width) {
        dot.speedX = -dot.speedX
      }

      if(dot.posY > height) {
        dot.speedY = -dot.speedY
      }

      if(dot.posX < 0) {
        dot.speedX = Math.abs(dot.speedX)
      }

      if(dot.posY < 0) {
        dot.speedY = Math.abs(dot.speedY)
      }

      ctx.fillStyle = "#2A5";
      ctx.beginPath();
      ctx.arc(dot.posX, dot.posY, dot.size, 0, Math.PI * 2);
      ctx.fill();
    })

    requestAnimationFrame(draw)
  }

  draw()
})()
