// at init time
var pxCamera = document.querySelector('#cpx');
var pyCamera = document.querySelector('#cpy');
var pzCamera = document.querySelector('#cpz');
var rxCamera = document.querySelector('#crx');
var ryCamera = document.querySelector('#cry');
var rzCamera = document.querySelector('#crz');

var pxObject = document.querySelector('#opx');
var pyObject = document.querySelector('#opy');
var pzObject = document.querySelector('#opz');
var rxObject = document.querySelector('#orx');
var ryObject = document.querySelector('#ory');
var rzObject = document.querySelector('#orz');

var fileG = document.querySelector('#filegenerated');

//parametros para el mero_obj
/*
const config_params =
{
	"fov":45,
	"near":0.1,
	"far":100,
	"debug":true,
	"filename":"mero_obj",
	"camera":
	{
		"position":
		{ 
			"x":4.218,
			"y":5.0,
			"z":18.615
		},
		"rotation":
		{ 
			"x":0,
			"y":0.223,
			"z":0
		}
	},
	"scene":
	{
		"backgroundColor":"rgb(128, 128, 128)",
		"lights":
		{
			"ambient":true,
			"point":true,
			"key":
			{
				"active":true,
				"color":"hsl(30, 100%, 75%)"
			}
		}
	},
	"object":
	{
		"position":
		{ 
			"x":2.1,
			"y":3.1,
			"z":5.9
		},
		"rotation":
		{ 
			"x":0.055,
			"y":0.260,
			"z":0
		},
		"scale":1
	}	
}
*/

//parametros para el mariposa
/*
const config_params =
{
	"fov":45,
	"near":0.1,
	"far":100,
	"debug":true,
	"filename":"mariposa_obj",
	"camera":
	{
		"position":
		{ 
			"x":-10.291,
			"y":7.163,
			"z":8.692
		},
		"rotation":
		{ 
			"x":-0.244,
			"y":-0.855,
			"z":-0.186
		}
	},
	"scene":
	{
		"backgroundColor":"rgb(0, 0, 0)",
		"lights":
		{
			"ambient":true,
			"point":true,
			"key":
			{
				"active":true,
				"color":"hsl(30, 100%, 75%)"
			}
		}
	},
	"object":
	{
		"position":
		{ 
			"x":14.5,
			"y":-2.9,
			"z":-18.0
		},
		"rotation":
		{ 
			"x":2.779,
			"y":0.668,
			"z":0.328
		},
		"scale":1.5
	}	
}
*/


const config_params =
{
	"fov":45,
	"near":0.1,
	"far":100,
	"debug":true,
	"filename":"cangrejo_obj",
	"camera":
	{
		"position":
		{ 
			"x":-9.486,
			"y":6.536,
			"z":8.573
		},
		"rotation":
		{ 
			"x":-0.356,
			"y":-0.824,
			"z":-0.266
		}
	},
	"scene":
	{
		"backgroundColor":"rgb(0, 0, 0)",
		"lights":
		{
			"ambient":true,
			"point":true,
			"key":
			{
				"active":true,
				"color":"hsl(30, 100%, 75%)"
			}
		}
	},
	"object":
	{
		"position":
		{ 
			"x":-0.700,
			"y":8.0,
			"z":12.3
		},
		"rotation":
		{ 
			"x":-0.452,
			"y":-6.283,
			"z":0.365
		},
		"scale":1
	}	
}


const DEBUG = config_params.debug;
if(!DEBUG)
{
	document.getElementById("debug").style.display = "none";
}

//Just for testing
var objeto_testing=config_params.filename;
let objIsLoaded = false;

//Render
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = config_params.fov;
const near = config_params.near;
const aspect = window.innerWidth / window.innerHeight;
const far = config_params.far;

scene = new THREE.Scene();
scene.background = new THREE.Color( config_params.scene.backgroundColor ); 

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = config_params.camera.position.x;
camera.position.y = config_params.camera.position.y;
camera.position.z = config_params.camera.position.z;
camera.rotation.x = config_params.camera.rotation.x;
camera.rotation.y = config_params.camera.rotation.y;
camera.rotation.z = config_params.camera.rotation.z;
camera.lookAt(new THREE.Vector3(0,0,0));

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 1;
controls.maxDistance = 50;			
controls.target.set(0, 5, 0);
controls.update();

var lights_ambient = config_params.scene.lights.ambient;
var lights_point = config_params.scene.lights.point;
var lights_key = config_params.scene.lights.key.active;

if(lights_ambient)
{
	ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
}

if(lights_point)
{
	pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );
}

if(lights_key)
{
	keyLight = new THREE.DirectionalLight(new THREE.Color(config_params.scene.lights.key.color), 1.0, 100);
	keyLight.position.set(0, 0, 0);
	scene.add(keyLight);
}


const planeSize = 100;
const loader = new THREE.TextureLoader();
const texture = loader.load('checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 20;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });


const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);
				
				
mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('objects/'+objeto_testing+'/');
mtlLoader.load('objects/'+objeto_testing+'/'+objeto_testing+'.mtl', function (materials) 
{
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('objects/'+objeto_testing+'/'+objeto_testing+'.obj', function (object) 
	{
		object.name="3dObject";
		object.position.x = config_params.object.position.x;
		object.position.y = config_params.object.position.y;
		object.position.z = config_params.object.position.z;
		
		object.rotation.x = config_params.object.rotation.x;
		object.rotation.y = config_params.object.rotation.y;
		object.rotation.z = config_params.object.rotation.z;
		object.scale.set(config_params.object.scale,config_params.object.scale,config_params.object.scale);
		scene.add(object);
		objIsLoaded = true;
    });
});


if(DEBUG)
{
	const gridXZ = new THREE.GridHelper(100, 20, new THREE.Color(0xff0000), new THREE.Color(0xffffff));
	const gridXY = new THREE.GridHelper(100, 20, new THREE.Color(0x00FF00), new THREE.Color(0xffAfff)  );
	gridXY.geometry.rotateX( Math.PI / 2 );
	gridXY.position.z=0;
	scene.add(gridXZ);
	scene.add(gridXY);
}


var controlsUI = new function() 
{	
  this.filename_obj = config_params.filename;
  this.scale_obj = config_params.object.scale;
  this.scene_bgcolor = config_params.scene.backgroundColor;
  this.objPX = config_params.object.position.x;
  this.objPY = config_params.object.position.y;
  this.objPZ = config_params.object.position.z;
  
  this.objRX = config_params.object.rotation.x;
  this.objRY = config_params.object.rotation.y;
  this.objRZ = config_params.object.rotation.z;
  
  this.ambient = config_params.scene.lights.ambient;
  this.point = config_params.scene.lights.point;
  this.key = config_params.scene.lights.key.active;
  this.keycolor = config_params.scene.lights.key.color;
  
  this.generate_json = function () {
          generateJsonConfigFile();
        };
}

var gui = new dat.GUI();
if(!DEBUG)
{
	gui.closed = true;
}
gui.add(controlsUI, "filename_obj");
gui.add(controlsUI, "scale_obj");
gui.add(controlsUI, "scene_bgcolor");

var guiObjPos =gui.addFolder("Object Position");
guiObjPos.add(controlsUI, 'objPX', -100, 100 , 0.1);
guiObjPos.add(controlsUI, 'objPY', -100, 100 , 0.1);
guiObjPos.add(controlsUI, 'objPZ', -100, 100 , 0.1);
guiObjPos.open();

var guiObjRot =gui.addFolder("Object Rotation");
guiObjRot.add(controlsUI, 'objRX', -(2*Math.PI), (2*Math.PI) , 0.001);
guiObjRot.add(controlsUI, 'objRY', -(2*Math.PI), (2*Math.PI) , 0.001);
guiObjRot.add(controlsUI, 'objRZ', -(2*Math.PI), (2*Math.PI) , 0.001);
guiObjRot.open();
			
var guiLights =gui.addFolder("Scene Lights");
gui.add(controlsUI, "ambient");
gui.add(controlsUI, "point");
gui.add(controlsUI, "key");
gui.add(controlsUI, "keycolor");
guiLights.open();

gui.add(controlsUI, "generate_json");


window.addEventListener('resize', onResize, false);

 function onResize()
 {
	renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}

function generateJsonConfigFile()
{
	strConfigFile=`{
	"fov":45,
	"near":0.1,
	"far":100,
	"debug":true,
	"filename":"${controlsUI.filename_obj}",
	"camera":
	{
		"position":
		{ 
			"x":${camera.position.x.toFixed(3)},
			"y":${camera.position.y.toFixed(3)},
			"z":${camera.position.z.toFixed(3)}
		},
		"rotation":
		{ 
			"x":${camera.rotation.x.toFixed(3)},
			"y":${camera.rotation.y.toFixed(3)},
			"z":${camera.rotation.z.toFixed(3)}
		}
	},
	"scene":
	{
		"backgroundColor":"${controlsUI.scene_bgcolor}",
		"lights":
		{
			"ambient":${controlsUI.ambient},
			"point":${controlsUI.point},
			"key":
			{
				"active":${controlsUI.key},
				"color":"${controlsUI.keycolor}"
			}
		}
	},
	"object":
	{
		"position":
		{ 
			"x":${controlsUI.objPX},
			"y":${controlsUI.objPY},
			"z":${controlsUI.objPZ}
		},
		"rotation":
		{ 
			"x":${controlsUI.objRX},
			"y":${controlsUI.objRY},
			"z":${controlsUI.objRZ}
		},
		"scale":1
	}	
}`
	fileG.innerHTML  = '========= JSON GENERATED ========= \n'+strConfigFile+'\n========= EOF ========= \n\n';
	document.getElementById("filegenerated").style.display = "block";
}

function animate() {
    requestAnimationFrame(animate);
	
	if(objIsLoaded)
	{
		obj = scene.getObjectByName("3dObject");
		
		obj.position.x = controlsUI.objPX;
		obj.position.y = controlsUI.objPY;
		obj.position.z = controlsUI.objPZ;
		obj.rotation.x = controlsUI.objRX;
		obj.rotation.y = controlsUI.objRY;
		obj.rotation.z = controlsUI.objRZ;
		
		lights_ambient = controlsUI.ambient;
		lights_point = controlsUI.point;
		lights_key = controlsUI.key;
		lights_keycolor = controlsUI.keycolor;
	}
	
    
	if(DEBUG)
	{
		pxCamera.innerText   = camera.position.x.toFixed(3);
		pyCamera.innerText   = camera.position.y.toFixed(3);
		pzCamera.innerText   = camera.position.z.toFixed(3);
		rxCamera.innerText   = camera.rotation.x.toFixed(3);
		ryCamera.innerText   = camera.rotation.y.toFixed(3);
		rzCamera.innerText   = camera.rotation.z.toFixed(3);		
		
		if(objIsLoaded)
		{
			obj = scene.getObjectByName("3dObject");
			pxObject.innerText   = obj.position.x.toFixed(3);
			pyObject.innerText   = obj.position.y.toFixed(3);
			pzObject.innerText   = obj.position.z.toFixed(3);
			rxObject.innerText   = obj.rotation.x.toFixed(3);
			ryObject.innerText   = obj.rotation.y.toFixed(3);
			rzObject.innerText   = obj.rotation.z.toFixed(3);
		}
	}
	
	renderer.render(scene, camera);
    controls.update();
};

animate();