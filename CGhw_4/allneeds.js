class Button {
  constructor(color, name) {
    this.on = false;
    this.hsl = color.getHSL();
    this.obj = this.makeButton(name);
  }

  get isOn() {
    return this.on;
  }

  toggle() {
    this.on = !this.on;
    this.update();
  }

  update() {
    if (this.on) {
      this.obj.scale.set (1,0.5,1);
      this.obj.children[0].material.color.setHSL 
        (0.053, 1, 1);
    } else {
    	this.obj.scale.set(1,1,1);
    	this.obj.children[0].material.color.setHSL 
         (this.hsl.h, this.hsl.s, this.hsl.l);
    }
  }
  makeButton(name) {
    let mesh = new THREE.Mesh(new THREE.CylinderGeometry( 1, 1, 1, 32 ),
      new THREE.MeshLambertMaterial());
    let button = new THREE.Object3D();
    button.add(mesh);
    mesh.material.color.setHSL (this.hsl.h, this.hsl.s, this.hsl.l)
    mesh.position.y = 0.5;
    button.name = name;  // a string
    return button;
  }
}

//////////////////build somthing//////////////////

function penHoldBuild() {

var penHold = new THREE.Object3D();
var cube = new THREE.Mesh( new THREE.BoxGeometry( 4, 5, 0.1), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('https://i.imgur.com/RszPUa2.jpg'),
  }));
cube.castShadow = true;
cube.receiveShadow = true;
var cube1 = cube.clone();
var cube2 = cube.clone();
var cube3 = cube.clone();
var cube4 = cube.clone();
var cube5 = new THREE.Mesh( new THREE.BoxGeometry( 4, 0.1, 4), new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('https://i.imgur.com/RszPUa2.jpg'),
  }));
cube5.castShadow = true;
cube5.receiveShadow = true;
penHold.add(cube1,cube2,cube3,cube4,cube5);
cube1.position.set(0,0,-1.95);
cube2.position.set(0,0,1.95);
cube3.rotation.y = Math.PI/2;
cube3.position.set(1.95,0,0);
cube4.rotation.y = Math.PI/2;
cube4.position.set(-1.95,0,0);
cube5.position.set(0,-2.5,0);
return penHold;
}

function floorBuild() {
var texture = new THREE.TextureLoader().load('https://i.imgur.com/hFDQbVB.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({
    map: texture
  }));
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;

return floor;
}

//////////////////Mouse function//////////////////

function onDocumentMouseDown(event) {

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // find intersections
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(pickables, true);
  if (intersects.length > 0) {
    let picked = intersects[0].object.parent.name;
    switch (picked) {
    case 'table':
    	button.toggle();
      break;
    case 'room':
    	button2.toggle();
      break;
    }
  }
}
