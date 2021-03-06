import formModule from './formModule';
import resultModule from './resultModule';


export default app = {

  base_url:"https://mavilleauvertpublicapi.onrender.com",

  init: async () => {
    console.log("app.init !");

    formModule.setBaseUrl(app.base_url);
    resultModule.setBaseUrl(app.base_url);
    app.addListeners();

    
    await formModule.getFormOptionsFromAPI();

  },

  addListeners: () => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event)=> {formModule.handleSearchForm(event)});
    console.log(`L'event listener is in da place !`);
    console.log(`Coucou toi fellow dev qui jette un oeil dans la console ! Pour voir le code, ça se passe ici : https://github.com/marion-vgv`);

    const aboutLink = document.getElementById("aboutLink");
    aboutLink.addEventListener("click", app.showAboutModal);

    const closeModalIcon = document.getElementById("closeIcon");
    closeModalIcon.addEventListener("click", app.hideAboutModal);
  },

  // handleSearchForm: (event) => {
  //   formModule.handleSearchForm(event);
  // },

  reloadHomepage : () => {
    document.location.reload();
  },

  showAboutModal : () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("isInvisible");


  },

  hideAboutModal : () => {
    const modal = document.getElementById("modal");
    modal.classList.add("isInvisible");
  }

};

document.addEventListener("DOMContentLoaded", app.init);
