$(function(){

    // set the scene size
  var WIDTH = 400,
    HEIGHT = 300;

  // set some camera attributes
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  // get the DOM element to attach to
  // - assume we've got jQuery to hand
  var $container = $('#container');

  // create a WebGL renderer, camera
  // and a scene
  var camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);
var keyboard = new THREEx.KeyboardState();

  var scene = new THREE.Scene();
  var camera, scene, renderer, objects, controls;
  var particleLight, pointLight;
  var dae, skin,MovingCube;


  var loader = new THREE.ColladaLoader();
  loader.load('assets/03020647(BB1891445).DAE', function (collada) {
    // scene.add(collada.scene);
    dae = collada.scene;
    MovingCube = dae;
    dae.scale.x = dae.scale.y = dae.scale.z = 1;
    THREE.GeometryUtils.center( collada )
    dae.updateMatrix();

    // dae.translateZ(-3)

    init();
    animate();
  });

  function init() {

    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0,-2,0);

    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', render );

    scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 )
    // Add the COLLADA

    scene.add( dae );

    // particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xaaaaaa} ) );
    // scene.add( particleLight );

        // Lights

      scene.add( new THREE.AmbientLight( 0xffffff ) );

      // var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
      // directionalLight.position.x = Math.random() - 0.5;
      // directionalLight.position.y = Math.random() - 0.5;
      // directionalLight.position.z = Math.random() - 0.5;
      // directionalLight.position.normalize();
      // scene.add( directionalLight );

      // pointLight = new THREE.PointLight( 0xaaaaaa, 4 );
      // pointLight.position = particleLight.position;
      // scene.add( pointLight );

      // renderer = new THREE.WebGLRenderer();
      renderer = new THREE.WebGLRenderer( { antialias: false } );
      // renderer.setClearColor( scene.fog.color, 1 );
      renderer.setSize( window.innerWidth, window.innerHeight );

      $container.append( renderer.domElement );

      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        render()
      }

      //

      var t = 0;
      var clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame( animate );
        controls.update();
        update()
        // render();
      }

    function render() {

      // var timer = Date.now() * 0.0005;

      // camera.position.x = 10;//Math.cos( timer ) * 10;
      // camera.position.y = 10//Math.cos( timer ) * 10;
      // camera.position.z = 5//Math.sin( timer ) * 10;

      // camera.lookAt( getCentroid(dae));

      // particleLight.position.x = Math.sin( timer * 4 ) * 3009;
      // particleLight.position.y = Math.cos( timer * 5 ) * 4000;
      // particleLight.position.z = Math.cos( timer * 4 ) * 3009;

      renderer.render( scene, camera );
      stats.update();
    }

    function update()
    {
      var delta = clock.getDelta(); // seconds.
      var moveDistance = 2 * delta; // 200 pixels per second
      var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
      
      // local coordinates

      // local transformations

      // move forwards/backwards/left/right
      if ( keyboard.pressed("W") )
        MovingCube.translateZ( -moveDistance );
      if ( keyboard.pressed("S") )
        MovingCube.translateZ(  moveDistance );
      if ( keyboard.pressed("Q") )
        MovingCube.translateX( -moveDistance );
      if ( keyboard.pressed("E") )
        MovingCube.translateX(  moveDistance ); 

      // rotate left/right/up/down
      var rotation_matrix = new THREE.Matrix4().identity();
      if ( keyboard.pressed("A") )
        MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      if ( keyboard.pressed("D") )
        MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      if ( keyboard.pressed("R") )
        MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
      if ( keyboard.pressed("F") )
        MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
      
      if ( keyboard.pressed("Z") )
      {
        MovingCube.position.set(0,25.1,0);
        MovingCube.rotation.set(0,0,0);
      }
        
      // global coordinates
      if ( keyboard.pressed("left") )
        MovingCube.position.x -= moveDistance;
      if ( keyboard.pressed("right") )
        MovingCube.position.x += moveDistance;
      if ( keyboard.pressed("up") )
        MovingCube.position.z -= moveDistance;
      if ( keyboard.pressed("down") )
        MovingCube.position.z += moveDistance;
        
      controls.update();
      stats.update();
    }
})

