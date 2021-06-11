const app = {
  base_url: "http://localhost:3000",

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
  },

  handleSearchForm: (event) => {
    formModule.handleSearchForm(event);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
