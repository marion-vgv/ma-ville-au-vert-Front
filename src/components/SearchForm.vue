<template>
  <main class="mainContainer" id="searchFormContainer">
    <h2 class="headerSubtitle">
      Trouvez la ville ou le village où vous mettre au vert parmi les villes de
      moins de 200 000 habitants en France métropolitaine
    </h2>

    <!-- FORM -->
    <form action="" method="POST" id="searchForm" class="mainContainerForm">
      <h3 class="mainContainerTitle">Votre recherche</h3>
      <!-- -- LIEU DE RECHERCHE -->
      <div class="formBlock" id="searchLocation">
        <div class="formBlockHeader">
          <h4 class="formBlockTitle">Lieu de recherche</h4>
        </div>
        <div class="formBlockRadio">
          <!-- Dans toute la France -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="location"
              id="locationTouteFrance"
              value="france"
              checked
            />
            <label
              class="radioButtonOption locationTouteFrance"
              for="locationTouteFrance"
            >
              <div class="radioDot"></div>
              <span class="radioButtonLabel">Toute la France</span>
            </label>
          </div>

          <!-- Par région -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="location"
              id="locationByRegion"
              value="region"
            />
            <label
              class="radioButtonOption locationByRegion"
              for="locationByRegion"
            >
              <div class="radioDot"></div>
              <span class="radioButtonLabel">Par région</span>

              <div id="regionOptions" class="optionsMenu">
                <label class="formBlockSelectLabel" for="locationRegion">
                </label>
                <select
                  class="formBlockSelect"
                  name="locationRegion"
                  id="locationRegion"
                >
                  <option
                    class="formBlockSelectOption"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Sélectionnez la région
                  </option>

                  <option v-if="loading">Loading...</option>

                  <option
                    v-else
                    v-bind:key="index"
                    v-for="(region, index) in options.regions"
                    value="{{region.id}}"
                  >
                    {{ region.name_region }}
                  </option>
                </select>
              </div>
            </label>
          </div>

          <!-- Par département -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="location"
              id="locationByDepartment"
              value="department"
            />
            <label
              class="radioButtonOption locationByDepartment"
              for="locationByDepartment"
            >
              <div class="radioDot"></div>
              <span class="radioButtonLabel">Par département</span>

              <div id="departmentOptions" class="optionsMenu">
                <label
                  class="formBlockSelectLabel"
                  for="locationDepartment"
                ></label>
                <select
                  class="formBlockSelect"
                  name="locationDepartment"
                  id="locationDepartment"
                >
                  <option
                    class="formBlockSelectOption"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Sélectionnez le département
                  </option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- TYPE DE VILLE -->
      <div class="formBlock" id="searchTownType">
        <div class="formBlockHeader">
          <h4 class="formBlockTitle">Type de ville</h4>
          <!-- <p class="formBlockText"></p> -->
        </div>
        <div class="formBlockRadio">
          <!-- Ville rurale -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="type"
              id="typeRurale"
              value="rurale"
              checked
            />
            <label class="radioButtonOption typeRurale" for="typeRurale">
              <div class="radioDot"></div>
              <span class="radioButtonLabel">Ville rurale</span>
            </label>
          </div>

          <!-- Ville urbaine -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="type"
              id="typeUrbaine"
              value="urbaine"
            />
            <label class="radioButtonOption typeUrbaine" for="typeUrbaine">
              <div class="radioDot"></div>
              <span class="radioButtonLabel"
                >Ville appartenant à une aire urbaine
              </span>
              <div class="toolTip">
                <img
                  src="~@/assets/icons/help-circle.svg"
                  alt=""
                  class="toolTipIcon"
                />
                <p class="toolTipBox">
                  Une <span>aire urbaine</span> est un ensemble de villes ou
                  villages géographiquement proches et dont l'activité est liée
                  grâce notamment à la mobilité de ses habitants
                </p>
              </div>
              <div id="uuOptions" class="optionsMenu">
                <label class="formBlockSelectLabel" for="uu"></label>
                <select class="formBlockSelect" name="uu" id="uu">
                  <option
                    class="formBlockSelectOption"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Je veux une ville située dans une zone urbaine de...
                  </option>
                  <option class="formBlockSelectOption" value="1">
                    moins de 5 000 habitants
                  </option>
                  <option class="formBlockSelectOption" value="2">
                    de 5 000 à 10 000 habitants
                  </option>
                  <option class="formBlockSelectOption" value="3">
                    de 10 000 à 20 000 habitants
                  </option>
                  <option class="formBlockSelectOption" value="4">
                    de 20 000 à 50 000 habitants
                  </option>
                  <option class="formBlockSelectOption" value="5">
                    de 50 000 à 100 000 habitants
                  </option>
                  <option class="formBlockSelectOption" value="6">
                    de 100 000 à 200 000 habitants
                  </option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- TAILLE DE VILLE -->
      <div class="formBlock" id="searchTownSize">
        <div class="formBlockHeader">
          <h4 class="formBlockTitle">Population</h4>
          <!-- <p class="formBlockText"></p> -->
        </div>
        <div class="formBlockText">
          <p class="selectOption">
            Je veux une ville dont la population est comprise entre
            <select class="formBlockSelect" name="townMin" id="townMin">
              <option class="formBlockSelectOption" value="0">0</option>
              <option class="formBlockSelectOption" value="500">500</option>
              <option class="formBlockSelectOption" value="1000">1 000</option>
              <option class="formBlockSelectOption" value="2500">2 500</option>
              <option class="formBlockSelectOption" value="5000">5 000</option>
              <option class="formBlockSelectOption" value="10000">
                10 000
              </option>
              <option class="formBlockSelectOption" value="20000">
                20 000
              </option>
              <option class="formBlockSelectOption" value="50000">
                50 000
              </option>
              <option class="formBlockSelectOption" value="100000">
                100 000
              </option>
              <option class="formBlockSelectOption" value="150000">
                150 000
              </option>
              <option class="formBlockSelectOption" value="200000">
                200 000
              </option>
            </select>
            et
            <select class="formBlockSelect" name="townMax" id="townMax">
              <option class="formBlockSelectOption" value="500">500</option>
              <option class="formBlockSelectOption" value="1000">1 000</option>
              <option class="formBlockSelectOption" value="2500">2 500</option>
              <option class="formBlockSelectOption" value="5000">5 000</option>
              <option class="formBlockSelectOption" value="10000">
                10 000
              </option>
              <option class="formBlockSelectOption" value="20000">
                20 000
              </option>
              <option class="formBlockSelectOption" value="50000">
                50 000
              </option>
              <option class="formBlockSelectOption" value="100000">
                100 000
              </option>
              <option class="formBlockSelectOption" value="150000">
                150 000
              </option>
              <option class="formBlockSelectOption" value="200000">
                200 000
              </option>
            </select>
            habitants
          </p>
        </div>
      </div>

      <!-- EDUCATION -->
      <div class="formBlock" id="searchEducation">
        <div class="formBlockHeader">
          <h4 class="formBlockTitle">Éducation</h4>
          <p class="formBlockText">
            Recherchez-vous une ville ayant une ou des écoles ?
          </p>
        </div>

        <!-- noSchool -->
        <div class="formBlockRadio">
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="school"
              id="noSchool"
              value="false"
              checked
            />
            <label class="radioButtonOption noSchool" for="noSchool">
              <div class="radioDot"></div>
              <span class="radioButtonLabel">Pas d'école nécessaire</span>
            </label>
          </div>

          <!-- withSchool -->
          <div class="radioButtonWrapper">
            <input
              class="radioButton"
              type="radio"
              name="school"
              id="withSchool"
              value="true"
            />
            <label class="radioButtonOption withSchool" for="withSchool">
              <div class="radioDot"></div>
              <span class="radioButtonLabel"
                >Au moins une école est nécessaire</span
              >
            </label>

            <div id="schoolOptions" class="optionsMenu">
              <div class="optionsMenuCheckbox">
                <div class="checkboxWrapper">
                  <input
                    class="checkboxInput"
                    type="checkbox"
                    name="schoolOptions"
                    id="materSchool"
                    value="mater"
                  />
                  <label class="checkboxOption materSchool" for="materSchool">
                    <div class="checkBox"></div>
                    <span class="checkboxLabel">École maternelle</span>
                  </label>
                </div>

                <div class="checkboxWrapper">
                  <input
                    class="checkboxInput"
                    type="checkbox"
                    name="schoolOptions"
                    id="primSchool"
                    value="prim"
                  />
                  <label class="checkboxOption primSchool" for="primSchool">
                    <div class="checkBox"></div>
                    <span class="checkboxLabel">École primaire</span>
                  </label>
                </div>

                <div class="checkboxWrapper">
                  <input
                    class="checkboxInput"
                    type="checkbox"
                    name="schoolOptions"
                    id="collSchool"
                    value="coll"
                  />
                  <label class="checkboxOption collSchool" for="collSchool">
                    <div class="checkBox"></div>
                    <span class="checkboxLabel">Collège</span>
                  </label>
                </div>

                <div class="checkboxWrapper">
                  <input
                    class="checkboxInput"
                    type="checkbox"
                    name="schoolOptions"
                    id="lyceeSchool"
                    value="lycee"
                  />
                  <label class="checkboxOption lyceeSchool" for="lyceeSchool">
                    <div class="checkBox"></div>
                    <span class="checkboxLabel">Lycée</span>
                  </label>
                </div>

                <div class="checkboxWrapper">
                  <input
                    class="checkboxInput"
                    type="checkbox"
                    name="schoolOptions"
                    id="segpaSchool"
                    value="segpa"
                  />
                  <label class="checkboxOption segpaSchool" for="segpaSchool">
                    <div class="checkBox"></div>
                    <span class="checkboxLabel">SEGPA</span>
                  </label>
                </div>

                <input value="" name="schoolOptions" disabled hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="isInvisible" id="formErrorAlert">
        Vos critères de recherche sont incomplets, veuillez corriger :)
      </div>
      <button class="formBlockSubmitButton" type="submit" value="Ok !">
        Lancer la recherche
      </button>
    </form>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchForm",
  data: function () {
    return {
      loading: true,
      errored: false,
      options: null,
    };
  },
  mounted() {
    axios
      .get("https://mavilleauvertpublicapi.onrender.com")
      .then((response) => {
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="sass"></style>
