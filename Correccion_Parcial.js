
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

   
    scene.add(cube);
    return(cube);
}
function init() {

   
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

   

   light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( 10, 10, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 


    Cubo = [];   // Definir un array unidimensional para almacenar tres cubos
    dim = 8; 

    Cubo.push(cubo(dim, dim, dim, 'green', 'Basic', false)); 
    Cubo.push(cubo(dim, dim, dim, 'red', 'Basic', false));

    Cubo.push(cubo(dim, dim, dim, 'blue', 'Basic', false)); 

    for(i=0; i<3; i++){  

      Cubo[i].translateX(dim/2); 
      Cubo[i].translateZ(dim/2); 
      Cubo[i].translateY(dim/2); 
    }
    
    for(i=1; i<3; i++){ 

        escala= 1/(2*i); //Escalado a la mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); 
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    } 
    camera.position.set(3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}