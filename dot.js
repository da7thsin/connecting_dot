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


const helper = (function() {

  function randSign() {
    return Math.round(Math.random()) ? 1 : -1
  }

  function distance(objA, objB) {
    const distX = Math.pow(objB.posX - objA.posX, 2)
    const distY = Math.pow(objB.posY - objA.posY, 2)

    return Math.sqrt(distX + distY)
  }

  function createDots(n, width, height) {
    const dots  = []
    const speed = 0.4
    const size  = 0

    for(let i = 0; i < n; i++) {
      let randX  = Math.floor(Math.random() * width)
      let randY  = Math.floor(Math.random() * height)

      dots.push(new Dot(randX, randY, speed, size))
    }

    return dots
  }

  return { randSign, distance, createDots }
})()




class Dot {
  constructor(posX, posY, speed, size) {
    this.posX   = posX
    this.posY   = posY
    this.speedX = speed * helper.randSign()
    this.speedY = speed * helper.randSign()
    this.size   = size
  }

  link(context, other) {
    context.strokeStyle = "#fff"
    context.beginPath()
    context.moveTo(this.posX, this.posY)
    context.lineTo(other.posX, other.posY)
    context.stroke()
  }
}


;(function() {
  const ctx        = canvas.context
  const item_size  = 50
  const canvas_dim = canvas.dim()

  let width  = canvas_dim.width
  let height = canvas_dim.height
  let dots   = helper.createDots(item_size, width, height)

  window.onresize = redraw


  function redraw() {
    width  = ctx.canvas.width  = window.innerWidth
    height = ctx.canvas.height = window.innerHeight
    dots   = helper.createDots(item_size, width, height)
  }


  function draw() {
    ctx.clearRect(0, 0, width, height)

    dots.forEach((dot, i) => {
      const size = dot.size

      dot.posX = dot.posX + dot.speedX
      dot.posY = dot.posY + dot.speedY

      if(dot.posX < 0) {
        dot.speedX *= -1
      }

      if(dot.posY < 0) {
        dot.speedY *= -1
      }

      if(dot.posX > width) {
        dot.speedX = -dot.speedX
      }

      if(dot.posY > height) {
        dot.speedY = -dot.speedY
      }

      dots.forEach((other, j) => {
        const dist       = helper.distance(dot, other)
        const link_range = 200

        if(i != j && dist <= link_range) {
          dot.link(ctx, other)
        }
      })


      ctx.fillStyle = "#2A5";
      ctx.beginPath();
      ctx.arc(dot.posX, dot.posY, size, 0, Math.PI * 2);
      ctx.fill();
    })

    requestAnimationFrame(draw)
  }

  draw()
})()
