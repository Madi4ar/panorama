// Создание панорам
const panorama = new PANOLENS.ImagePanorama("images/DRON_0720.png");
const panorama2 = new PANOLENS.ImagePanorama("images/DVOR.png");
const panorama3 = new PANOLENS.ImagePanorama("images/CAMERA_1_360_0000.jpg"); // Новая панорама

// Получение контейнера для панорамы
let imageContainer = document.querySelector(".image-container");

// Массив с позициями для точек перехода
var infospotPositions = [
  new THREE.Vector3(-2136.06, 16.3, 890.14), // Для перехода из панорамы 1 в панораму 2
  new THREE.Vector3(-3136.06, 296.3, -4290.14), // Для перехода из панорамы 2 в панораму 1
  new THREE.Vector3(1500, 0, -2500), // Для перехода из панорамы 2 в панораму 3
];

// Создание Viewer для отображения панорам
const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  controlBar: true,
});

// Связывание панорам с позициями переходов
panorama.link(panorama2, infospotPositions[0]); // Связь из панорамы 1 в панораму 2
panorama2.link(panorama, infospotPositions[1]); // Связь из панорамы 2 в панораму 1
panorama2.link(panorama3, infospotPositions[2]); // Связь из панорамы 2 в панораму 3
panorama3.link(panorama, new THREE.Vector3(-2000, 500, 3000)); // Связь из панорамы 3 в панораму 1

// Добавление всех панорам в viewer
viewer.add(panorama, panorama2, panorama3);

// Добавление кнопок (информационных точек) в панораму 1
const infospot1 = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
infospot1.position.set(1000, 0, -1000);
infospot1.addHoverText("Информация о локации 1", 50);
panorama.add(infospot1);

// Добавление кнопки с изображением в панораму 2
const texture = new THREE.TextureLoader().load("images/icon.png");
const infospotWithImage = new PANOLENS.Infospot(500, texture);
infospotWithImage.position.set(1500, -500, 2000);
infospotWithImage.addHoverText("Это изображение", 50);
panorama2.add(infospotWithImage);

// Добавление еще одной кнопки (информационной точки) в панораму 3
const infospot3 = new PANOLENS.Infospot(400, PANOLENS.DataImage.Info);
infospot3.position.set(-1000, 300, 1500);
infospot3.addHoverText("Информация о локации 3", 50);
panorama3.add(infospot3);
