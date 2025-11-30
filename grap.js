AFRAME.registerComponent('grap', {

  init: function () {
this.draging = false; 

this.cam = document.querySelector('#camera');
console.log("loaded");
this.el.addEventListener('click', (e) => {
  const body = this.el.body;
  console.log("clicked");
  if (!body || !this.cam) return;
  const Dire = new THREE.Vector3();
  this.cam.object3D.getWorldDirection(Dire);
console.log("draging:", this.draging);
  
  this.draging = !this.draging;
  console.log("draging:", this.draging);

  if (this.draging){
    body.setGravity(new Ammo.btVector3(0,0,0));
    body.activate();
  } else {
    body.setGravity(new Ammo.btVector3(0,-9.8,0));
    body.activate();
    const drop = Dire.multiplyScalar(-10);
    body.setLinearVelocity(new Ammo.btVector3(drop.x, drop.y, drop.z));
    body.setActivationState(1); //disable deactivation
    
  }
});
  },
  tick: function (time, timeDelta) {
    if (!this.draging)return;
    const came = this.cam;
    const b0dy = this.el.body;
    if (!b0dy || !came) return;
    const camerapos = new THREE.Vector3();
    came.object3D.getWorldPosition(camerapos);
    const cameraAng = new THREE.Quaternion();
    came.object3D.getWorldQuaternion(cameraAng);
    
    
    const cameraDir = new THREE.Vector3();
    came.object3D.getWorldDirection(cameraDir);
    camerapos.add(cameraDir.multiplyScalar(-2));
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(camerapos.x, camerapos.y, camerapos.z));
    transform.setRotation(new Ammo.btQuaternion(cameraAng.x, cameraAng.y, cameraAng.z, cameraAng.w));
    b0dy.setWorldTransform(transform);
    b0dy.activate();

  }
});

