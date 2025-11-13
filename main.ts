import * as ecs from '@8thwall/ecs'
const {THREE} = window as any
const {Position} = ecs

ecs.registerComponent({
  name: 'DragAndDelete',
  schema: {
    distanceToCamera: ecs.f32,
    followSpeed: ecs.f32,
    targetX: ecs.f32,
    targetY: ecs.f32,
    targetZ: ecs.f32,
    deleteRadius: ecs.f32,
  },
  schemaDefaults: {
    distanceToCamera: 2,
    followSpeed: 0.3,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    deleteRadius: 0.3,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    const targetPos = new THREE.Vector3()
    let isDragging = false

    // get mesh object
    const object3D = world.three.entityToObject.get(eid)
    if (!object3D) return

    function getClientXY(event) {
      let {clientX} = event
      let {clientY} = event
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      }
      return {clientX, clientY}
    }

    function onStart(event) {
      const {clientX, clientY} = getClientXY(event)
      mouse.x = (clientX / window.innerWidth) * 2 - 1
      mouse.y = -(clientY / window.innerHeight) * 2 + 1

      const camera = world.three.camera || world.three.activeCamera || world.three.mainCamera
      if (!camera) return
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObject(object3D, true)
      if (intersects.length > 0) {
        isDragging = true
      }
    }

    function onEnd() {
      isDragging = false
    }

    function onMove(event) {
      if (!isDragging) return

      const {clientX, clientY} = getClientXY(event)
      mouse.x = (clientX / window.innerWidth) * 2 - 1
      mouse.y = -(clientY / window.innerHeight) * 2 + 1

      const camera = world.three.camera || world.three.activeCamera || world.three.mainCamera
      if (!camera) return
      raycaster.setFromCamera(mouse, camera)

      const schema = schemaAttribute.cursor(eid)
      targetPos.copy(raycaster.ray.origin).add(raycaster.ray.direction.multiplyScalar(schema.distanceToCamera))
    }

    ecs.defineState('default').initial()
      .onEnter(() => {
        window.addEventListener('mousedown', onStart)
        window.addEventListener('mouseup', onEnd)
        window.addEventListener('mousemove', onMove)

        window.addEventListener('touchstart', onStart)
        window.addEventListener('touchend', onEnd)
        window.addEventListener('touchmove', onMove)
      })
      .onExit(() => {
        window.removeEventListener('mousedown', onStart)
        window.removeEventListener('mouseup', onEnd)
        window.removeEventListener('mousemove', onMove)

        window.removeEventListener('touchstart', onStart)
        window.removeEventListener('touchend', onEnd)
        window.removeEventListener('touchmove', onMove)
      })
      .onTick(() => {
        if (!ecs.Position.has(world, eid)) return

        const schema = schemaAttribute.cursor(eid)
        const currentPos = ecs.Position.get(world, eid)

        if (isDragging) {
          const newX = currentPos.x + (targetPos.x - currentPos.x) * schema.followSpeed
          const newY = currentPos.y + (targetPos.y - currentPos.y) * schema.followSpeed
          const newZ = currentPos.z + (targetPos.z - currentPos.z) * schema.followSpeed

          world.setPosition(eid, newX, newY, newZ)
        }

        // Check distance to target drop zone
        const dx = currentPos.x - schema.targetX
        const dy = currentPos.y - schema.targetY
        const dz = currentPos.z - schema.targetZ
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < schema.deleteRadius) {
          console.log('🚀 Dropped into target zone, deleting entity')
          world.deleteEntity(eid)
        }
      })
  },
})
