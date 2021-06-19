import '../sass/_reset.css';
import '../sass/_vars.scss';
import '../sass/style.scss';
import formModule from './formModule';
import resultModule from './resultModule';

export default app = {
  // base_url: "http://localhost:3000/api",
  base_url: "https://mavilleauvertback.onrender.com:10000/api",

  init: async () => {
    console.log("app.init !");

    formModule.setBaseUrl(app.base_url);
    resultModule.setBaseUrl(app.base_url);
    app.addListeners();

    await formModule.getFormOptionsFromAPI();

  },

  addListeners: () => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", app.handleSearchForm);
    console.log(`L'event listener is in da place !`);

    const aboutLink = document.getElementById("aboutLink");
    aboutLink.addEventListener("click", app.showAboutModal);

    const closeModalIcon = document.getElementById("closeIcon");
    closeModalIcon.addEventListener("click", app.hideAboutModal);
  },

  handleSearchForm: (event) => {
    formModule.handleSearchForm(event);
  },

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
