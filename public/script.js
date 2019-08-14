// three.js rendered element start

let scene, camera, renderer;
function init() {
  scene = new THREE.Scene(); // make scene
  var light = new THREE.PointLight(0xff0000, 1, 100);
  light.position.set(50, 50, 50);
  scene.add(light); // setting and adding light source
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    45,
    30000
  ); // setting camera
  camera.position.set(0, 100, 0);
  camera.rotation.y = 30;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load("src/assets/SkyboxZ+.jpg");
  let texture_bk = new THREE.TextureLoader().load("src/assets/SkyboxZ-.jpg");
  let texture_up = new THREE.TextureLoader().load("");
  let texture_dn = new THREE.TextureLoader().load("");
  let texture_rt = new THREE.TextureLoader().load("src/assets/SkyboxX-.jpg");
  let texture_lf = new THREE.TextureLoader().load("src/assets/SkyboxX+.jpg"); //loading skybox textures except up and down

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
  animate();
}
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  camera.rotation.y -= 0.0007;
}
init();
renderer.domElement.id = "renderedCanvas"; // giving name to rendered element

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
} // make auto resizing

// three.js rendered element end

// sending form data to telegram bot start

// send message to telegram bot on input submit
const TOKEN = "943606326:AAFGZsuregLJi-G4bbiqguGarydGmn4SKC0"; // token from BotFather
const CHAT_ID = 493263425; // chat_id
var form = document.querySelector(".form"); // find form in DOM
form.addEventListener("submit", function(e) {
  // listening form

  e.preventDefault(); // cancel default form answer
  data = new FormData(this); // formdata

  sendMsg(data); // give form data for sending
});

function sendMsg(data) {
  var url = "https://api.telegram.org/bot" + TOKEN + "/sendMessage"; // bot token
  var body = JSON.stringify({
    // make JSON string
    chat_id: CHAT_ID,
    parse_mode: "Markdown", // markdown for use *bold* text
    text:
      "*Новый лид*\n" +
      "\n\n*Имя:* " +
      data.get("name") +
      "\n*Телефон:* " +
      data.get("phone") +
      "\n*Email:* " +
      data.get("email") +
      "\n*Выбор:* " +
      data.get("selected") +
      "\n*Откуда:* [" +
      window.location.href +
      "](" +
      window.location.href +
      ")"
  });
  var xhr = new XMLHttpRequest(); // initialize ajax request
  xhr.open("POST", url, true); // sending POST on telegram server
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8"); // tell to telegram server about sanding JSON
  xhr.send(body);
  M.toast({html: 'Спасибо за Ваш заказ. Мы скоро свяжемся с Вами)', classes: 'rounded'});

}

// sending form data to telegram bot end

M.AutoInit(); //materializecss initialisation 




// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".collapsible");
//   var instances = M.Collapsible.init(elems, {});
// });
