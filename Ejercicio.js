//objetos, cámara, luces
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

    // Cube entra en escena
    scene.add(cube);
    return(cube);
}
function init() {

    //Cámara, donde miramos. 
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Render - definimos tamaño.
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ejes en escena. 
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //Luz en escena. 
    light = new THREE.PointLight(0xFFFFFF); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( -10, 10, 10 );             //  Luz en ejes x, y, z.
    scene.add( light ); 


    Cubo = [];   //Array para cubos. 
    dim = 8; //Dimesión inicial cubos.
    delta= dim/2; //Mitad dimensión inicial de cubos. 
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2)); //Valor de la línea diagonal
    valor= diagonal-delta; 
    Angulo = (Math.PI/4); //Angulo rotación
    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); //Cubo 0

    Cubo.push(cubo(dim, dim, dim, 'green', 'Physical', false)); //Cubo 1

    Cubo.push(cubo(dim, dim, dim, 'yellow', 'Physical', false)); //Cubo 2

    for(i=0; i<3; i++){  //Traslación cubos  al origen de coordenadas.

      Cubo[i].translateX(dim/2); 
      Cubo[i].translateZ(dim/2); 
      Cubo[i].translateY(dim/2); 
    }
    
    for(i=1; i<3; i++){ //Escalado y traslación sobre el eje y.

        escala= 1/(2*i); //Escalado mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); //Superposición cubos
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    for(i=0; i<3; i++){ 

      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor);  
    }
 
    Cubo[0].rotateY(Angulo);//Se rotan el cubo 1 y 3.
    Cubo[2].rotateY(Angulo);


    //Posición cámara
    camera.position.set(-3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);

   
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // renderiza la escena
    renderer.render(scene, camera);
}