document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour charger et afficher les blagues à partir du jeu de données local
    function loadJokesFromJSON() {
        // Charger le fichier JSON contenant les blagues
        fetch('https://carambar-lvk1.onrender.com/api/v1/blagues')
          .then(response => response.json())
          .then(data => {
            // Récupérer la section des blagues dans laquelle nous afficherons les données
            const jokesListSection = document.querySelector('.jokes-list');
      
            // Effacer le contenu actuel de la section des blagues
            jokesListSection.innerHTML = '';
      
            // Parcourir les blagues récupérées et les ajouter à la section des blagues
            data.forEach(joke => {
              const jokeElement = document.createElement('div');
              jokeElement.classList.add('joke');
              jokeElement.innerHTML = `
                <h3>Question: ${joke.question}</h3>
                <p>Réponse: ${joke.reponse}</p>
              `;
              jokesListSection.appendChild(jokeElement);
            });
          })
          .catch(error => {
            console.error('Erreur lors du chargement des blagues depuis le fichier JSON :', error);
          });
      }
      
    // Récupérer la référence vers l'onglet "Toutes les blagues"
    const allJokesTab = document.querySelector('nav ul li:nth-child(2) a');
      
    // Ajouter un gestionnaire d'événements pour le clic sur l'onglet "Toutes les blagues"
    allJokesTab.addEventListener('click', function() {
        // Charger les blagues
        loadJokesFromJSON();
        // Afficher la section des blagues
        document.querySelector('.jokes-list').style.display = 'block';
        // Masquer la section de la blague aléatoire
        document.querySelector('.random-joke').style.display = 'none';
        // Masquer la section de recherche par ID
        document.querySelector('.search-by-id').style.display = 'none';
    });
    
    // Récupérer la référence vers l'onglet "Accueil"
    const homeTab = document.querySelector('nav ul li:first-child a');
      
    // Ajouter un gestionnaire d'événements pour le clic sur l'onglet "Accueil"
    homeTab.addEventListener('click', function() {
        // Masquer la section des blagues
        document.querySelector('.jokes-list').style.display = 'none';
        // Masquer la section de la blague aléatoire
        document.querySelector('.random-joke').style.display = 'none';
        // Masquer la section de recherche par ID
        document.querySelector('.search-by-id').style.display = 'none';
    });

    // Fonction pour charger et afficher une blague aléatoire
    function loadRandomJokeFromJSON() {
        // Charger le fichier JSON contenant les blagues
        fetch('https://carambar-lvk1.onrender.com/api/v1/blagues/random')
          .then(response => response.json())
          .then(data => {
            // Sélectionner une blague aléatoire
            const randomJoke = data[Math.floor(Math.random() * data.length)];
            
            // Afficher la blague aléatoire
            const randomJokeSection = document.querySelector('.random-joke');
            randomJokeSection.innerHTML = `
              <h3>Question: ${randomJoke.question}</h3>
              <p>Réponse: ${randomJoke.reponse}</p>
            `;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des blagues depuis le fichier JSON :', error);
          });
    }
    
    // Récupérer la référence vers l'onglet "Blague aléatoire"
    const randomJokeTab = document.querySelector('nav ul li:nth-child(3) a');

    // Ajouter un gestionnaire d'événements pour le clic sur l'onglet "Blague aléatoire"
    randomJokeTab.addEventListener('click', function() {
    // Charger et afficher une blague aléatoire
    loadRandomJokeFromJSON();
    // Afficher la section de la blague aléatoire
    document.querySelector('.random-joke').style.display = 'block';
    // Masquer la section des blagues
    document.querySelector('.jokes-list').style.display = 'none';
    // Masquer la section de recherche par ID
    document.querySelector('.search-by-id').style.display = 'none';
});

    // Récupérer la référence vers l'onglet "Rechercher par ID"
    const searchByIdTab = document.querySelector('nav ul li:nth-child(4) a');

        // Ajouter un gestionnaire d'événements pour le clic sur l'onglet "Rechercher par ID"
        searchByIdTab.addEventListener('click', function() {
        // Masquer la section des blagues
        document.querySelector('.jokes-list').style.display = 'none';
        // Masquer la section de la blague aléatoire
        document.querySelector('.random-joke').style.display = 'none';
        // Afficher la section de recherche par ID
        document.querySelector('.search-by-id').style.display = 'block';
    });

    // Fonction pour rechercher une blague par ID
    function searchJokeById(id) {
        // Charger le fichier JSON contenant les blagues
        fetch('Données/blagues.json')
          .then(response => response.json())
          .then(data => {
            // Rechercher la blague avec l'ID spécifié
            const searchedJoke = data.find(joke => joke.id === id);
            
            // Afficher la blague recherchée
            const searchResultSection = document.querySelector('.search-result');
            const searchedJokeElement = document.querySelector('#searchedJoke');
            if (searchedJoke) {
                searchedJokeElement.innerHTML = `
                  <h3>Question: ${searchedJoke.question}</h3>
                  <p>Réponse: ${searchedJoke.reponse}</p>
                `;
                searchResultSection.style.display = 'block';
              } else {
                searchedJokeElement.innerHTML = 'Aucune blague trouvée pour cet ID.';
                searchResultSection.style.display = 'block';
              }
            })
            .catch(error => {
              console.error('Erreur lors de la recherche par ID:', error);
            });
      }
  
      // Récupérer la référence vers le formulaire de recherche par ID
      const searchForm = document.querySelector('#searchForm');
  
        // Ajouter un gestionnaire d'événements pour la soumission du formulaire de recherche par ID
         searchForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Empêcher le comportement par défaut du formulaire
          
          // Récupérer la valeur de l'ID saisie par l'utilisateur
          const searchedId = document.querySelector('#jokeId').value;
          
          // Rechercher la blague par ID
          searchJokeById(searchedId);
          
          // Afficher la section de recherche par ID
          document.querySelector('.search-by-id').style.display = 'block';
          // Masquer la section des blagues
          document.querySelector('.jokes-list').style.display = 'none';
          // Masquer la section de la blague aléatoire
          document.querySelector('.random-joke').style.display = 'none';
      });
});
