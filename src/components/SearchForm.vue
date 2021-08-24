<template>
  <main class="mainContainer" id="searchFormContainer">
    <h2 class="headerSubtitle">
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

                  <option
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

                  <option
                    v-bind:key="index"
                    v-for="(department, index) in options.departments"
                    value="{{department.id}}"
                  >
                    {{ department.name_dpt }}
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
            </label>
          </div>
        </div>
      </div>

      <div class="hide" id="formErrorAlert">
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
import LoadingThingy from "@/components/LoadingThingy.vue";

export default {
  name: "SearchForm",
  components: { LoadingThingy },
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
.mainContainer {
  // FLEXBOX
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;

  .headerSubtitle {
    box-sizing: border-box;
    width: 700px;
    line-height: 1.6;
    font-size: 1.2rem;
    font-style: italic;
    color: $blackish;
    text-align: center;
    margin-bottom: 4rem;

    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }

  .mainContainerTitle {
    text-align: center;
    font-family: $headerFont;
    font-size: 1.5rem;
    letter-spacing: 0.5rem;
    padding-bottom: 2rem;
  }
}

.mainContainerForm {
  width: 700px;
  text-align: left;

  @media screen and (max-width: 700px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  // FORM SECTION
  .formBlock {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    @media screen and (max-width: 700px) {
      flex-direction: column;
      margin-bottom: 0.5rem;
      margin-left: auto;
      margin-right: auto;
    }

    .formBlockHeader {
      font-family: $headerFont;
      font-size: 1.2rem;
      padding: 1rem;
      background-color: rgb($mainColor, 0.6);
      color: $white;
      border-radius: 0 1rem 1rem 1rem;
      width: 27%;

      @media screen and (max-width: 700px) {
        width: 100%;
        margin-bottom: 0.5rem;
        margin: auto;
        box-sizing: border-box;
      }

      .formBlockText {
        font-size: 0.8rem;
        padding-top: 1rem;
        color: $white;
        line-height: 1.2;
        width: 100%;
      }
    }

    // FORM SECTION WITH RADIO BUTTONS
    .formBlockRadio {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    // FORM SECTION WITH SELECT INPUT
    .formBlockSelect {
      cursor: pointer;
      border: 1px solid transparent;
      margin: 0.5rem;
    }

    .formBlockText {
      .formBlockSelect {
        background-color: rgb($mainColorLight, 0.3);
        box-shadow: inset 0 0 5px rgb($mainColorLight, 0.8);
      }
    }

    .formBlockRadio {
      .formBlockSelect {
        background-color: $white;
        box-shadow: inset 0 0 5px rgb($mediumGrey, 0.5);
      }
    }

    //
    // RADIO INPUTS
    //
    .radioButtonWrapper {
      width: 100%;
      margin-top: 4px;
      margin-bottom: 4px;
      position: relative;
      * {
        cursor: pointer;
      }

      .radioButton {
        display: none;
      }

      .radioButtonOption {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          box-shadow: inset 0 0 5px $mediumGrey;
          border: 0;
        }

        &:focus {
          border: 1px solid rgb($mainColorLight, 1);
          outline: 2px solid $mainColorLight;
        }

        .radioButtonLabel {
          padding-left: 0.5rem;
          font-size: 1rem;
          width: 80%;
        }

        .radioDot {
          height: 20px;
          width: 20px;
          background: rgb($mainColor, 0.6);
          border-radius: 50%;
          position: relative;

          &::before {
            position: absolute;
            content: "";
            top: 4px;
            left: 4px;
            width: 12px;
            height: 12px;
            background: rgb($mainColor, 0.6);
            border-radius: 50%;
            opacity: 0;
            transform: scale(1.5);
            transition: all 0.3s ease;
          }
        }

        .optionsMenu {
          margin-top: 1rem;
          width: 100%;
          align-self: stretch;

          .formBlockSelect {
            width: 100%;
            margin: auto;
            box-shadow: 0 0 5px rgb($mainColorLight, 0.8);
          }
        }
      }

      // HANDLING DISPLAY DEPENDING ON CHECK STATUS
      #regionOptions,
      #departmentOptions,
      #uuOptions,
      #schoolOptions {
        display: none;
      }

      #locationTouteFrance:checked ~ .locationTouteFrance,
      #locationByRegion:checked ~ .locationByRegion,
      #locationByDepartment:checked ~ .locationByDepartment,
      #typeRurale:checked ~ .typeRurale,
      #typeUrbaine:checked ~ .typeUrbaine,
      #withSchool:checked ~ .withSchool,
      #noSchool:checked ~ .noSchool {
        background-color: rgb($mainColorLight, 0.3);
        border: 1px solid transparent;
        box-shadow: inset 0 0 5px rgb($mainColorLight, 0.6);

        .radioDot {
          background: $white;
          box-shadow: 0 0 10px rgb($mainColorLight, 1);

          &::before {
            opacity: 1;
            transform: scale(1);
          }
        }

        #regionOptions,
        #departmentOptions,
        #uuOptions,
        #schoolOptions {
          display: block;
        }

        .toolTip {
          position: absolute;
          top: 30px;
          right: 15px;
        }
      }
    }

    .selectOption {
      @media screen and (max-width: 700px) {
        margin-top: 0.5rem;
      }
    }

    .radioButtonOption,
    .selectOption {
      padding: 1rem;
      box-shadow: 0 0 5px $mediumGrey;
      border-radius: 0 1rem 1rem 1rem;
      line-height: 1.6;
      transition: box-shadow 0.3s ease;
      transition: background-color 0.3s ease;

      .formBlockSelect {
        font-size: 0.9rem;
        color: $blackish;
        font-family: $contentFont;
        border: transparent;
        border-radius: 1rem;
        padding: 0.5rem;

        &:focus {
          border-radius: 1rem;
          outline: 2px solid $mainColorLight;
        }
      }

      .toolTip {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translate(0, -50%);
        transition: all 0.3s ease;

        .toolTipIcon {
          color: rgb($mainColor, 0.6);
          height: 20px;
          width: 20px;
          cursor: pointer;
        }

        .toolTipBox {
          position: absolute;
          display: none;
        }

        &:hover {
          .toolTipBox {
            display: block;
            background-color: $white;
            box-shadow: 0 0 5px $mediumGrey;
            font-size: 0.8rem;
            bottom: 0;
            left: 0;
            padding: 1rem;
            margin: 1.5rem;
            border-radius: 0 1rem 1rem 1rem;

            @media screen and (max-width: 700px) {
              transform: translate(-120%, 0);
            }

            span {
              font-weight: bold;
            }
          }
        }
      }
    }

    //
    // CHECKBOX INPUTS
    //
    .optionsMenuCheckbox {
      padding-left: 1.5rem;
      display: flex;
      flex-direction: column;

      .checkboxWrapper {
        padding-bottom: 0.3rem;
        cursor: pointer;

        .checkboxInput {
          display: none;
        }

        .checkboxOption {
          display: flex;
          flex-direction: row;
          align-items: center;

          &:hover {
            .checkboxLabel {
              text-decoration: underline $mainColorLight 3px;
              transition: all 0.3s ease-in-out;
            }
          }

          &:focus {
            border: 1px solid rgb($mainColorLight, 1);
            outline: 2px solid $mainColorLight;
          }

          .checkBox {
            height: 20px;
            width: 20px;
            background: $white;
            border-radius: 0.3rem;
            position: relative;

            &::before {
              position: absolute;
              content: "✓";
              height: 22px;
              width: 22px;
              bottom: 2px;
              left: 2px;
              color: $blackish;
              opacity: 0;
              transform: scale(1.5);
              transition: all 0.3s ease;
            }
          }

          .checkboxLabel {
            padding-left: 0.5rem;
          }
        }

        #materSchool:checked ~ .materSchool,
        #primSchool:checked ~ .primSchool,
        #collSchool:checked ~ .collSchool,
        #lyceeSchool:checked ~ .lyceeSchool,
        #segpaSchool:checked ~ .segpaSchool {
          .checkBox {
            background: $white;
            box-shadow: 0 0 5px rgb($mainColorLight, 0.8);

            &::before {
              opacity: 1;
              transform: scale(1);
            }
          }
        }
      }
    }

    //
    // ALL INPUTS
    //
    .formBlockRadio,
    .formBlockText {
      font-family: $contentFont;
      width: 67%;

      @media screen and (max-width: 700px) {
        width: 100%;
      }

      * {
        box-sizing: border-box;
      }
    }
  }

  .formBlockSubmitButton {
    width: 100%;
    font-size: 1.2rem;
    font-family: $headerFont;
    color: $white;
    background-color: rgb($mainColor, 0.6);
    padding: 1rem;
    border: 0;
    border-radius: 0 1rem 1rem 1rem;
    margin: 2rem auto;

    &:hover {
      box-shadow: inset 0 0 5px rgb($mainColor, 1);
      transition: all 0.3s ease;
    }
  }

  .formErrorAlert {
    font-family: $headerFont;
    font-size: 0.9rem;
    color: darkred;
    text-align: center;
    padding: 1rem 0;
    background-color: rgb(darkred, 0.15);
    border-radius: 0 1rem 1rem 1rem;
    margin: auto;
  }

  .hide {
    display: none;
  }

  .showFlex {
    display: flex;
  }

  .showBlock {
    display: block;
  }
}
</style>
