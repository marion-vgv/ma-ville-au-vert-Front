export default formModule = {
  base_url: null,

  setBaseUrl: (url) => {
    formModule.base_url = url;
  },

  // Récupération des options pour générer le formulaire
  getFormOptionsFromAPI: async () => {
    try {
      const result = await fetch(`${formModule.base_url}/`);

      const json = await result.json();

      formModule.setFormOptions(json);
    } catch (error) {
      console.error(`Impossible de charger les options depuis l'API`, error);
    }
  },

  // Injection des options dans le HTML
  setFormOptions: (options) => {
    console.log("setFormOptions");

    // -- OPTIONS DE REGIONS
    const locationRegion = document.getElementById("locationRegion");

    for (const region of options.regions) {
      if (region.id > 5) {
        const regionOption = document.createElement("option");
        regionOption.setAttribute("value", region.id);
        const regionOptionText = document.createTextNode(region.name_region);
        regionOption.appendChild(regionOptionText);
        locationRegion.appendChild(regionOption);
      }
    }

    // -- OPTIONS DE DEPARTEMENTS
    const locationDepartment = document.getElementById("locationDepartment");

    for (const department of options.departments) {
      if (department.id < 500) {
        const departmentOption = document.createElement("option");
        departmentOption.setAttribute("value", department.id);
        const departmentOptionText = document.createTextNode(
          department.name_dpt
        );
        departmentOption.appendChild(departmentOptionText);
        locationDepartment.appendChild(departmentOption);
      }
    }
  },

  handleSearchForm: async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    //
    // VERIFICATION QUE LE FORM EST CORRECTEMENT REMPLI
    //
    //
    // PAR REGION : IL FAUT SELECTIONNER UNE REGION
    if (
      formData.get("location") === "region" &&
      isNaN(parseInt(formData.get("locationRegion")))
    ) {
      const fieldRegion = document
        .getElementById("locationRegion")
        .closest(".radioButtonOption");
      fieldRegion.classList.add("error");
      const formBlock = fieldRegion.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldRegion.classList.remove("error");
      });
    }

    // PAR DEPARTEMENT : IL FAUT SELECTIONNER UN DEPARTEMENT
    if (
      formData.get("location") === "department" &&
      isNaN(parseInt(formData.get("locationDepartment")))
    ) {
      const fieldDepartment = document
        .getElementById("locationDepartment")
        .closest(".radioButtonOption");
      fieldDepartment.classList.add("error");
      const formBlock = fieldDepartment.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldDepartment.classList.remove("error");
      });
    }

    // AIRE URBAINE : IL FAUT FAIRE UNE SELECTION
    if (
      formData.get("type") === "urbaine" &&
      isNaN(parseInt(formData.get("uu")))
    ) {
      const fieldUU = document
        .getElementById("uu")
        .closest(".radioButtonOption");
      fieldUU.classList.add("error");
      const formBlock = fieldUU.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldUU.classList.remove("error");
      });
    }

    // POPULATION : IL FAUT QUE GAUCHE SOIT INFERIEUR A DROITE
    if (parseInt(formData.get("townMin")) > parseInt(formData.get("townMax"))) {
      const fieldMin = document
        .getElementById("townMin")
        .closest(".formBlockSelect");
      const fieldMax = document
        .getElementById("townMax")
        .closest(".formBlockSelect");
      fieldMin.classList.add("error");
      fieldMax.classList.add("error");
      const formBlock = fieldMin.closest(".formBlock");
      formBlock.addEventListener("click", () => {
        fieldMin.classList.remove("error");
        fieldMax.classList.remove("error");
      });
    }

    // ECOLE : IL FAUT SELECTIONNER AU MOINS UN TYPE D'ECOLE
    if (
      formData.get("school") === "true" &&
      formData.get("schoolOptions") === null
    ) {
      const fieldSchool = document
        .getElementById("schoolOptions")
        .closest(".radioButtonOption");
      fieldSchool.classList.add("error");
      const formBlock = fieldSchool.closest(".formBlockRadio");
      formBlock.addEventListener("click", () => {
        fieldSchool.classList.remove("error");
      });
    }
    //
    // SI LE FORM EST REMPLI CORRECTEMENT :
    //
    else {
      // CACHER LE FORM DE RECHERCHE
      const form = document.getElementById("searchForm");
      form.classList.add("isInvisible");

      // AFFICHER LE LOADER
      const loader = document.getElementById("searchInProgress");
      loader.classList.remove("isInvisible");

      // ENVOYER LA RECHERCHE AU BACK
      try {
        const result = await fetch(`${formModule.base_url}/`, {
          method: "POST",
          body: formData,
        });

        if (result.ok) {
          const json = await result.json();
          console.log(`On a reçu un résultat !`);
          console.log(json);
          console.log(json.length);
          resultModule.showSearchResults(json);
        } else {
          console.error("On a eu un pépin sur le serveur");
        }
      } catch (error) {
        console.error(
          `Impossible de charger les résultats de la recherche depuis l'API`,
          error
        );
      }
    }
  },
};