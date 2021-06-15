const resultModule = {
  base_url: null,

  setBaseUrl: (url) => {
    resultModule.base_url = url;
  },

  showSearchResults: (results) => {
    console.log("Search results !");

    // GENERER LE MENU DES RESULTATS
    resultModule.handleSearchMenuOptions(results);

    // CACHER LE LOADER
    const loader = document.getElementById("searchInProgress");
    loader.classList.add("isInvisible");

    // AFFICHER LA SECTION D'AFFICHAGE DES RESULTATS
    const searchResults = document.getElementById("searchResults");
    searchResults.classList.remove("isInvisible");

    // AFFICHER LE NOMBRE DE RESULTATS DISPONIBLES
    const resultSentence = document.getElementById("searchResultsNumber");
    if (results.length == 0) {
      resultSentence.textContent = `Il n'existe pas de ville correspondant à votre recherche`;
    }
    if (results.length == 1) {
      resultSentence.textContent = `Il existe ${results.length} ville correspondant à votre recherche`;
    }
    if (results.length > 1) {
      resultSentence.textContent = `Il existe ${results.length} villes correspondant à votre recherche`;
    }

    // GENERER 1 FICHE VILLE / RESULTAT
    for (const result of results) {
      resultModule.makeTownCardInDOM(result);
    }
  },

  makeTownCardInDOM: (data) => {
    console.log(data);

    const template = document.getElementById("townCardTemplate");
    const node = document.importNode(template.content, true);

    // NOM DE VILLE
    const townName = node.querySelector(".townCardName");
    townName.textContent = data.name_town;

    // NOM DE REGION
    const townRegion = node.querySelector(".townCardRegion");
    townRegion.textContent = `(${data.region.name_region})`;

    // NOM DE DEPARTEMENT
    const townDepartment = node.querySelector(".townCardDepartment");
    townDepartment.textContent = data.department.name_dpt;

    // ZONE URBAINE OU ZONE RURALE
    const townUU = node.querySelector(".townCardUU");
    const uuName = data.urban_unit.name_uu;
    console.log("uuName");
    console.log(uuName);
    if (uuName.includes("hors unité urbaine") == true) {
      const uuNameUpdated = uuName.replace("hors unité urbaine", "rurale");
      console.log(uuName);
      townUU.textContent = uuNameUpdated;
    } else {
      townUU.textContent = `Commune appartenant à l'aire urbaine de ${uuName}`;
    }

    // NB HABITANTS
    const townPopulation = node.querySelector(".townCardPop");
    townPopulation.textContent = `${data.population.population_total} habitants`;

    // ECOLES
    const townSchool = node.querySelector(".townCardSchool");
    const schoolSection = node.querySelector(".schoolSection");
    const schoolIcon = node.querySelector(".schoolIcon");

    const dataKeys = Object.keys(data);

    if (dataKeys.includes("school") == true) {
      const schools = data.school;

      if (schools.length == 1) {
        townSchool.textContent = `Il y a ${data.school.length} école correspondant à votre recherche :`;
      }

      if (schools.length > 1) {
        townSchool.textContent = `Il y a ${data.school.length} écoles correspondant à votre recherche :`;
      }

      const schoolList = document.createElement("ul");
      schoolList.setAttribute("class", "schoolList");
      townSchool.appendChild(schoolList);

      for (const school of schools) {
        const schoolElement = document.createElement("li");
        schoolElement.setAttribute("class", "schoolElement");
        schoolElement.textContent = `- ${school.name_place} (${school.secteur})`;
        schoolList.appendChild(schoolElement);
      }
    } else {
      townSchool.setAttribute("hidden", "");
      schoolSection.setAttribute("hidden", "");
      schoolIcon.setAttribute("hidden", "");
    }

    // AJOUT DE LA CARTE AU DOM
    document.getElementById("searchResultsContainer").appendChild(node);
  },

  handleSearchMenuOptions : (data) => {

    // MODIFIER LA RECHERCHE

    // NOUVELLE RECHERCHE : RELOAD DE LA PAGE D'ACCUEIL

    // ENVOI PAR MAIL : GENERER LE CONTENU DE L'EMAIL


  }
};
