// Récupération des éléments du DOM
const boule = document.querySelector('.boule');
const ecran = document.querySelector('body');

// Variables pour la physique du jeu
let puissance = 0;
let angle = 0;
let vitesseX = 0;
let vitesseY = 0;
let vitesseAngulaire = 0; // Vitesse angulaire de rotation
const masse = 1; // Masse de la boule
const multiplicateurPuissance = 0.1; // Multiplicateur de puissance
const frottement = 0.98; // Facteur de décélération
const frottementAngulaire = 0.95; // Facteur de décélération de rotation
const coefficientFrottement = 0.05; // Coefficient de frottement avec la table

// Fonction pour gérer le mouvement lors du déplacement de la souris
function gererDeplacementSouris(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    angle = Math.atan2(mouseY - boule.offsetTop, mouseX - boule.offsetLeft);
    puissance = Math.sqrt((mouseX - boule.offsetLeft) ** 2 + (mouseY - boule.offsetTop) ** 2) * multiplicateurPuissance;
}

// Fonction de mise à jour de la position et de la rotation de la boule
function update() {
    // Calcul de la vitesse en fonction de la direction et de la puissance
    vitesseX = Math.cos(angle) * puissance / masse;
    vitesseY = Math.sin(angle) * puissance / masse;

    // Calcul de la vitesse angulaire en fonction de la vitesse de déplacement
    vitesseAngulaire = Math.sqrt(vitesseX ** 2 + vitesseY ** 2);

    // Application du frottement
    vitesseX *= frottement - coefficientFrottement;
    vitesseY *= frottement - coefficientFrottement;
    vitesseAngulaire *= frottementAngulaire;

    // Application des lois de la physique pour les rebonds sur les bords de l'écran
    if (boule.offsetLeft < 0 || boule.offsetLeft + boule.offsetWidth > ecran.offsetWidth) {
        vitesseX *= -1;
    }
    if (boule.offsetTop < 0 || boule.offsetTop + boule.offsetHeight > ecran.offsetHeight) {
        vitesseY *= -1;
    }

    // Mise à jour de la position de la boule
    boule.style.left = `${boule.offsetLeft + vitesseX}px`;
    boule.style.top = `${boule.offsetTop + vitesseY}px`;

    // Mise à jour de la rotation de la boule
    boule.style.transform = `rotate(${vitesseAngulaire}deg)`;

    // Appel de la fonction update à chaque trame
    requestAnimationFrame(update);
}

// Ajout d'un écouteur d'événements pour le mouvement de la souris
ecran.addEventListener('mousemove', gererDeplacementSouris);

// Lancer la mise à jour des positions et de la rotation de la boule
update();
