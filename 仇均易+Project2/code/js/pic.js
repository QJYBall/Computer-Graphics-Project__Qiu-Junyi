//创建渲染器
var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //允许阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
}

//创建相机
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

//创建场景
var scene;
function initScene() {
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    // cubeTextureLoader.setPath('src/skybox/');
    
    // var cubeTexture = cubeTextureLoader.load(['px.BMP', 'nx.BMP', 'py.BMP', 'ny.BMP', 'pz.BMP', 'nz.BMP']);
    scene = new THREE.Scene();
    // scene.background = cubeTexture;
}

//创建光源
var ambientLight, spotLight;
function initLight() {
    ambientLight = new THREE.AmbientLight("#111111");
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight("#ffffff");
    spotLight.position.set(20,40,20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024*4;
    spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);
}

function GetOrientalPearl() {
    var OrientalPearl = new THREE.Object3D();
    
    //底部
    var bottom = new THREE.Object3D();
    
    //底部圆台*2
    var cylinder_1 = CreateCylinder(2,2,0.38,30,"src/fu.jpg");
    cylinder_1.position.y = 0;
    cylinder_1.receiveShadow = true;

    var cylinder_2 = CreateCylinder(1.8,1.8,0.2,30,"src/fu.jpg");
    cylinder_2.position.y = 0.28;
    cylinder_2.receiveShadow = true;
    
    //斜向圆柱*3
    var bottomColumn_1 = CreateCylinder(0.15,0.15,3,30,"src/bl.jpg");
    bottomColumn_1.position.set(1.1, 1, 0.5);
    bottomColumn_1.rotation.set((Math.PI / 2) * 1.15, (Math.PI / 5.5) * 1.5, -(Math.PI / 2.5) * 1.1); 
 
    var bottomColumn_2 = CreateCylinder(0.15,0.15,3,30,"src/bl.jpg");
    bottomColumn_2.position.set(-0.05, 1, -1.35);
    bottomColumn_2.rotation.set((Math.PI / 2) * 1.47, -(Math.PI / 5.5) * 1.35, (Math.PI / 2.5) * 0.05); 
 
    var bottomColumn_3 = CreateCylinder(0.15,0.15,3,30,"src/bl.jpg");
    bottomColumn_3.position.set(-1, 1, 0.8);
    bottomColumn_3.rotation.set(-(Math.PI / 2) * 1.25, (Math.PI / 5.5) * 1, -(Math.PI / 3.5) * 0.9); 
    
    //底部支柱*3
    var bottomPillar_1 = CreateCylinder(0.2,0.2,7,30,"src/mu.jpg");
    var midball_1 = CreateSphere(0.32,32,32,"src/fu.jpg");
    bottomPillar_1.add(midball_1);
    bottomPillar_1.position.set(2, 2, 1);
    bottomPillar_1.rotation.set(-(Math.PI / 5.5), Math.PI / 10, Math.PI / 5);

    var bottomPillar_2 = CreateCylinder(0.2,0.2,7,30,"src/mu.jpg");
    var midball_2 = CreateSphere(0.32,32,32,"src/fu.jpg");
    bottomPillar_2.add(midball_2);
    bottomPillar_2.position.set(0, 2, -2.5);
    bottomPillar_2.rotation.set(Math.PI / 4.5, Math.PI / 6, -Math.PI / 1);

    var bottomPillar_3 = CreateCylinder(0.2,0.2,7,30,"src/mu.jpg");
    var midball_3 = CreateSphere(0.32,32,32,"src/fu.jpg");
    bottomPillar_3.add(midball_3);
    bottomPillar_3.position.set(-2, 2, 1.5);
    bottomPillar_3.rotation.set(-Math.PI / 15, Math.PI / 8, (-Math.PI / 10) * 2);

    bottom.add(cylinder_1, cylinder_2, bottomColumn_1, bottomColumn_2, bottomColumn_3, bottomPillar_1, bottomPillar_2, bottomPillar_3);

    //中部
    var middle = new THREE.Object3D();

    //直立圆柱*3
    var midCylinder_1 = CreateCylinder(0.35,0.35,15,30,"src/mu.jpg");
    midCylinder_1.position.set(0, 7, 0.8);
    
    var midCylinder_2 = CreateCylinder(0.35,0.35,15,30,"src/mu.jpg");
    midCylinder_2.position.set(0.7, 7, -0.5);
    
    var midCylinder_3 = CreateCylinder(0.35,0.35,15,30,"src/mu.jpg");
    midCylinder_3.position.set(-0.7, 7, -0.45);

    //中球
    var middleball = CreateSphere(1.5,32,32,"src/pi.jpg");
    middleball.position.y = 15;
    
    //大球
    var bigball = CreateSphere(2,32,32,"src/fudan.jpg");
    bigball.position.y = 5;

    //圆环*7
    var Torus_1 = CreateTorus(0.8,0.2,16,10,2,"src/hu.jpg");
    var Torus_2 = CreateTorus(0.8,0.2,16,10,7.5,"src/hu.jpg");
    var Torus_3 = CreateTorus(0.8,0.2,16,10,8.6,"src/hu.jpg");
    var Torus_4 = CreateTorus(0.8,0.2,16,10,9.7,"src/hu.jpg");
    var Torus_5 = CreateTorus(0.8,0.2,16,10,10.8,"src/hu.jpg");
    var Torus_6 = CreateTorus(0.8,0.2,16,10,11.9,"src/hu.jpg");
    var Torus_7 = CreateTorus(0.8,0.2,16,10,13,"src/hu.jpg");
  
    middle.add(midCylinder_1, midCylinder_2, midCylinder_3, bigball, middleball, Torus_1, Torus_2, Torus_3, Torus_4, Torus_5, Torus_6, Torus_7);

    //顶部
    var top = new THREE.Object3D();
    
    // 顶部圆柱1
    var topCylinder_1 = CreateCylinder(0.3,0.3,2.5,5,"src/mu.jpg");
    topCylinder_1.position.y = 17.5;

    // 顶部球
    var topSphere = CreateSphere(0.6,32,32,"src/fudan.jpg");
    topSphere.position.y = 19;

    // 顶部圆柱2
    var topCylinder_2 = CreateCylinder(0.25,0.2,3,5,"src/mu.jpg");
    topCylinder_2.position.y = 20;

    var top_Torus_1 = CreateTorus(0.15,0.15,16,10,21.5,"src/hu.jpg");

    // 顶部圆柱3
    var topCylinder_3 = CreateCylinder(0.15,0.15,2,10,"src/mu.jpg");
    topCylinder_3.position.y = 22.5;

    var top_Torus_2 = CreateTorus(0.13,0.13,16,10,23.5,"src/hu.jpg");

    // 顶部圆柱4
    var topCylinder_4 = CreateCylinder(0.1,0.1,3,10,"src/mu.jpg");
    topCylinder_4.position.y = 25;

    top.add(topCylinder_1, topSphere, topCylinder_2, top_Torus_1, topCylinder_3, top_Torus_2, topCylinder_4);


    OrientalPearl.add(bottom, middle, top);

    return OrientalPearl;
}

function CreateCylinder(r1, r2, h, s, pic) {
    var cylinderGeometry = new THREE.CylinderGeometry(r1, r2, h, s);
    var cylinderMaterial = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load(pic)});
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    return cylinder;
}

function CreateSphere(r, w, h, pic) {
    var sphereGeometry = new THREE.SphereGeometry(r, w, h);
    var sphereMaterial = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load(pic)});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    return sphere;
}

function CreateTorus(r, t, rS, tS, y, pic) {
    var torusGeometry = new THREE.TorusGeometry(r, t, rS, tS);
    var torusMaterial = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load(pic)});
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 2;
    torus.position.y = y;
    torus.castShadow = true;
    return torus;
}


//创建模型
var OrientalPearl;
function initModel() {
    //辅助工具
    var helper = new THREE.AxisHelper(20);
    scene.add(helper);

    //plane
    var planeGeometry = new THREE.PlaneGeometry(70, 70);
    var planeMaterial = new THREE.MeshPhongMaterial({color:0xffffff});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    OrientalPearl = GetOrientalPearl();
    scene.add(OrientalPearl);
}

var stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

var controls;
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.minDistance = 20;
    controls.maxDistance == 400;
    controls.enablePan = true;
}

function render() {
    renderer.render(scene, camera);
}

//窗口大小改变
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function AnimateRender() {
    render();
    stats.update();
    controls.update();
    requestAnimationFrame(AnimateRender);
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();
    AnimateRender();
    window.onresize = onWindowResize;
}