<template>
  <main class="main-container" id="searchFormContainer">
    <h2 class="header-subtitle">
      Trouvez la ville ou le village où vous mettre au vert parmi les villes de
      moins de 200 000 habitants en France métropolitaine
    </h2>

    <!-- LOADING -->
    <LoadingThingy v-if="loading" />

    <!-- ERROR -->

    <!-- FORM -->
    <form
      v-else
      action=""
      method="POST"
      id="searchForm"
      class="mainContainerForm"
    >
      <div class="form-header flex-row flex-align-center">
        <h3 class="header-title">
          <span class="underline">Votre recherche</span>
        </h3>
        <img src="" alt="" class="header-image" />
      </div>
      <!-- -- LIEU DE RECHERCHE -->
      <div
        class="form-section flex-row flex-justify-between separation-border"
        id="searchLocation"
      >
        <div class="form-section-header">
          <h4>
            <span class="header-highlight">Lieu</span><br /><span
              class="header-baseline"
              >de recherche</span
            >
          </h4>
        </div>
        <div
          class="
            form-section-main form-section-main-width
            flex-column flex-justify-between
          "
        >
          <!-- Dans toute la France -->
          <label
            class="button locationTouteFrance"
            :class="[searchLocation === 'france' ? 'winner' : 'neutral']"
            for="locationTouteFrance"
          >
            <div class="flex-row flex-align-center">
              <input
                type="radio"
                name="location"
                id="locationTouteFrance"
                value="france"
                v-model="searchLocation"
              />
              <p>Toute la France</p>
            </div>
          </label>

          <!-- Par région -->
          <label 
          class="button locationByRegion"
          :class="[searchLocation === 'region' ? 'winner' : 'neutral']"
          for="locationByRegion">
            <div class="flex-row flex-align-center">
              <input
                type="radio"
                name="location"
                id="locationByRegion"
                value="region"
                v-model="searchLocation"

              />
              <p>Par région</p>
            </div>

            <div id="regionOptions" :class="[searchLocation === 'region' ? '' : 'hide']">
              <select name="locationRegion" id="locationRegion" v-model="locationRegion">
                <option :value="null" disabled>
                  Sélectionnez la région
                </option>

                <option
                  v-for="region in options.regions"
                  :value="region.id"
                  v-bind:key="region.id"
                >
                  {{ region.name_region }}
                </option>
              </select>
            </div>
          </label>

          <!-- Par département -->
          <label
            class="button neutral locationByDepartment"
            :class="[searchLocation === 'department' ? 'winner' : 'neutral']"
            for="locationByDepartment"
          >
            <div class="flex-row flex-align-center">
              <input
                type="radio"
                name="location"
                id="locationByDepartment"
                value="department"
                v-model="searchLocation"
              />
              <p>Par département</p>
            </div>

            <div id="departmentOptions" :class="[searchLocation === 'department' ? '' : 'hide']">
              <select name="locationDepartment" id="locationDepartment" v-model="locationDepartment">
                <option :value="null" disabled>
                  Sélectionnez le département
                </option>

                <option
                  v-bind:key="department.id"
                  v-for="department in options.departments"
                  :value="department.id"
                >
                  {{ department.name_dpt }}
                </option>
              </select>
            </div>
          </label>
        </div>
      </div>

      <!-- TYPE DE VILLE -->
      <div
        class="form-section flex-row flex-justify-between separation-border"
        id="searchTownType"
      >
        <div class="form-section-header">
          <h4>
            <span class="header-highlight">Type</span><br /><span
              class="header-baseline"
              >de&nbsp;ville</span
            >
          </h4>
        </div>
        <div
          class="
            form-section-main form-section-main-width
            flex-column flex-justify-between
          "
        >
          <!-- Ville rurale -->
          <label 
          class="button typeRurale" 
          :class="[searchType === 'rurale' ? 'winner' : 'neutral']"
          for="typeRurale">
            <div class="flex-row flex-align-center"
            >
              <input
                type="radio"
                name="type"
                id="typeRurale"
                value="rurale"
                v-model="searchType"
              />
              <p>Ville rurale</p>
            </div>
          </label>

          <!-- Ville urbaine -->
          <label 
          class="button relative typeUrbaine" 
          :class="[searchType === 'urbaine' ? 'winner' : 'neutral']"
          for="typeUrbaine">
            <div class="flex-row flex-justify-between flex-align-center">
              <div class="flex-row flex-align-center"
              >
                <input
                  type="radio"
                  name="type"
                  id="typeUrbaine"
                  value="urbaine"
                  v-model="searchType"

                />
                <p>Ville appartenant à une aire urbaine</p>
              </div>
              <div class="tool-tip">
                <img
                  src="~@/assets/icons/help-circle.svg"
                  alt=""
                  class="tool-tip-icon"
                />
                <p class="tool-tip-box">
                  Une <span>aire urbaine</span> est un ensemble de villes ou
                  villages géographiquement proches et dont l'activité est liée
                  grâce notamment à la mobilité de ses habitants
                </p>
              </div>
            </div>
            <div id="uuOptions" :class="[searchType === 'urbaine' ? '' : 'hide']">
              <select name="uu" id="uu" v-model="typeUrbaine">
                <option
                  value=""
                  disabled
                >
                  Je veux une ville située dans une zone urbaine de...
                </option>
                <option value="1">
                  moins de 5 000 habitants
                </option>
                <option value="2">
                  de 5 000 à 10 000 habitants
                </option>
                <option value="3">
                  de 10 000 à 20 000 habitants
                </option>
                <option value="4">
                  de 20 000 à 50 000 habitants
                </option>
                <option value="5">
                  de 50 000 à 100 000 habitants
                </option>
                <option value="6">
                  de 100 000 à 200 000 habitants
                </option>
              </select>
            </div>
          </label>
        </div>
      </div>

      <!-- TAILLE DE VILLE -->
      <div
        class="form-section flex-row flex-justify-between separation-border"
        id="searchTownSize"
      >
        <div class="form-section-header">
          <h4>
            <span class="header-highlight">Pop</span><br /><span
              class="header-baseline"
              >ulation</span
            >
          </h4>
        </div>

        <div class="form-section-main form-section-main-width searchTownSize">
          <p>
            Je veux une ville dont la population est comprise entre
            <select class="" name="townMin" id="townMin">
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
      <div
        class="form-section flex-row flex-justify-between separation-border"
        id="searchEducation"
      >
        <div class="form-section-header">
          <h4>
            <span class="header-highlight">Édu</span><br /><span
              class="header-baseline"
              >cation</span
            >
          </h4>
          <p class="formBlockText">
            Recherchez-vous une ville ayant une ou des écoles ?
          </p>
        </div>

        <!-- noSchool -->
        <div
          class="
            form-section-main form-section-main-width
            flex-column flex-justify-between
          "
        >
          <label class="button winner noSchool" for="noSchool">
            <div class="flex-row flex-align-center">
              <input
                type="radio"
                name="school"
                id="noSchool"
                value="false"
                checked
              />
              <p>Pas d'école nécessaire</p>
            </div>
          </label>

          <!-- withSchool -->
          <label class="button neutral withSchool" for="withSchool">
            <div class="flex-row flex-align-center">
              <input type="radio" name="school" id="withSchool" value="true" />
              <p>Au moins une école est nécessaire</p>
            </div>

            <div id="schoolOptions" class="checkbox-group">
              <label class="checkbox-label materSchool" for="materSchool">
                <div class="flex-row flex-align-center">
                  <input
                    type="checkbox"
                    name="schoolOptions"
                    id="materSchool"
                    value="mater"
                  />
                  <p>École maternelle</p>
                </div>
              </label>

                <label class="checkbox-label primSchool" for="primSchool">
                <div class="flex-row flex-align-center">
                <input
                  type="checkbox"
                  name="schoolOptions"
                  id="primSchool"
                  value="prim"
                />
                  <p>École primaire</p>
              </div>
                </label>

                <label class="checkbox-label collSchool" for="collSchool">
              <div class="flex-row flex-align-center">
                <input
                  type="checkbox"
                  name="schoolOptions"
                  id="collSchool"
                  value="coll"
                />
                  <p>Collège</p>
              </div>
                </label>

                <label class="checkbox-label lyceeSchool" for="lyceeSchool">
              <div class="flex-row flex-align-center">
                <input
                  type="checkbox"
                  name="schoolOptions"
                  id="lyceeSchool"
                  value="lycee"
                />
                  <p>Lycée</p>
              </div>
                </label>

                <label class="checkbox-label segpaSchool" for="segpaSchool">
              <div class="flex-row flex-align-center">
                <input
                  type="checkbox"
                  name="schoolOptions"
                  id="segpaSchool"
                  value="segpa"
                />
                  <p>SEGPA</p>
              </div>
                </label>

              <input value="" name="schoolOptions" disabled hidden />
            </div>
          </label>
        </div>
      </div>

      <div class="hide" id="formErrorAlert">
        Vos critères de recherche sont incomplets, veuillez corriger :)
      </div>
      <button class="search-button" type="submit" value="Ok !">
        Lancer la recherche
      </button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import LoadingThingy from "@/components/LoadingThingy.vue";

export default {
  name: "SearchForm",
  components: { LoadingThingy },
  data: function () {
    return {
      loading: true,
      errored: false,
      options: null,
      searchLocation: 'france',
      locationRegion: null,
      locationDepartment: null,
      searchType : 'rurale',
      typeUrbaine :null,
    };
  },
  mounted() {
    axios
      .get("https://mavilleauvertpublicapi.onrender.com")
      .then((response) => {
        this.options = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss">
.main-container {
  width: 700px;
  margin: auto;

  .header-subtitle {
    font-style: italic;
    line-height: 1.5;
    padding: 3rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  *:focus-visible {
    outline: none;
    box-shadow: 0px 0px 0px 3px $highlightLight;
  }

  .flex-row {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex-justify-between {
    justify-content: space-between;
  }

  .flex-align-center {
    align-items: center;
  }

  .form-header {
    margin-bottom: 3rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $headerFont;
  }

  .header-title {
    font-size: 2.8rem;
  }

  .relative {
    position: relative;
  }

  .tool-tip {
    transition: all 0.3s ease;

    .tool-tip-icon {
      color: $mainColorLight;
      height: 20px;
      width: 20px;
      cursor: pointer;
    }

    .tool-tip-box {
      position: absolute;
      display: none;
    }

    &:hover {
      .tool-tip-icon {
        border-radius: 50%;
        border: 2px solid $white;
        background-color: $white;
      }

      .tool-tip-box {
        display: block;
        height: 100px;
        width: 200px;
        color: $black;
        background-color: $white;
        box-shadow: $shadow-out;
        font-size: 0.8rem;
        line-height: 1.2;
        top: 0;
        right: 0;
        transform: translate(-10px, -100%);
        padding: 1rem;
        margin: 1.5rem;
        border-radius: $radius $radius 0 $radius;

        span {
          font-weight: bold;
        }
      }
    }
  }

  .separation-border {
    border-bottom: solid 2px $mainColorLight;
  }

  .underline {
    border-bottom: solid 2px $mainColor;
  }

  .hide {
    display: none;
  }

  .form-section {
    margin-top: 4rem;
    padding-bottom: 0.2rem;

    .form-section-header {
      .header-highlight {
        font-size: 2.8rem;
        color: $mainColor;
      }

      .header-baseline {
        font-size: 2rem;
        margin-top: -1rem;
        margin-left: 1rem;
      }

      p {
        padding: 1rem 0;
        line-height: 1.5;
      }
    }

    .form-section-main-width {
      max-width: 400px;
    }

    .form-section-main {
      .button {
        padding: 0.8rem 1rem;
        margin-bottom: 0.8rem;
        border-radius: $radius;
        border: 1px solid $mainColor;
        width: 350px;
      }

      .neutral {
        color: $black;
        background-color: $white;
        box-shadow: $shadow-out;

        &:hover {
          background-color: $mainColor;
          color: $white;

          .tool-tip-icon {
            border-radius: 50%;
            border: 2px solid $white;
            background-color: $white;
          }
        }
      }

      .winner {
        color: $white;
        background-color: $mainColor;
        box-shadow: $shadow-in;
        font-weight: bold;
      }

      label {
        p {
          padding-left: 0.5rem;
        }
      }

      input[type="radio"] {
        /* create custom radiobutton appearance */
        display: inline-block;
        width: 22px;
        height: 22px;
        padding: 4px;

        /* background-color only for content */
        background-clip: content-box;
        border: 1px solid $mainColor;
        background-color: $mainColorLight;
        border-radius: 50%;

        &:hover {
          border: 1px solid $white;
        }
      }

      /* appearance for checked radiobutton */
      input[type="radio"]:checked {
        background-color: $white;
        border: 1px solid $white;
      }

      select {
        color: $black;
        margin-top: 1rem;
        border-radius: $radius;
        height: 2.5rem;
        padding: 0.5rem;
        max-width: 100%;
        margin-left: 33px;
      }

      .checkbox-group {
        margin-left : 35px;
        margin-top : 1rem;

        label {
          padding : 0.3rem 0;

          &:hover {
            text-decoration: underline $white 4px;
            transition: all 0.3s ease-in-out;
            font-weight: bold;
          }

          input {
        /* create custom checkbox appearance */
        display: inline-block;
        width: 22px;
        height: 22px;

        /* background-color only for content */
        background-clip: content-box;
        border: 1px solid $mainColor;
        background-color: $mainColorLight;
        border-radius: 25%;

        &:hover {
          border: 1px solid $white;
        }

        &:checked {
        background-color: $white;
        border: 1px solid $white;
        padding : 3px;
        position:relative;
        }


          }
        }
      }
    }

    .searchTownSize {
      p {
        margin: 0 1rem 1rem 1rem;
      }

      select {
        border-color: $mainColor;
        cursor: pointer;
        box-shadow: $shadow-out;
        margin: 1rem 0.5rem 0 0.5rem;
      }
    }
  }

  .search-button { 
    width: 100%;
    margin-top : 1rem;
    padding: 1rem 0;
    border-radius: $radius;
    border: 1px solid $mainColor;
    color: $black;
    background-color: $white;
    box-shadow: $shadow-out;
    font-size: 1rem;
    font-family: $headerFont;

    &:hover {
      background-color: $mainColor;
      color: $white;
      font-weight: bold;
    }

  }

    }
  

</style>
