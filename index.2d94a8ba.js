!function(){var e=formModule={base_url:null,setBaseUrl:e=>{formModule.base_url=e},getFormOptionsFromAPI:async()=>{try{const e=await fetch(`${formModule.base_url}/`,{method:"GET"}),t=await e.json();formModule.setFormOptions(t)}catch(e){console.error("Impossible de charger les options depuis l'API ",e)}},setFormOptions:e=>{const t=document.getElementById("locationRegion");for(const o of e.regions)if(o.id>5){const e=document.createElement("option");e.setAttribute("value",o.id);const n=document.createTextNode(o.name_region);e.appendChild(n),t.appendChild(e)}const o=document.getElementById("locationDepartment");for(const t of e.departments)if(t.id<500){const e=document.createElement("option");e.setAttribute("value",t.id);const n=document.createTextNode(t.name_dpt);e.appendChild(n),o.appendChild(e)}},handleSearchForm:async e=>{e.preventDefault();const t=new FormData(e.target);if("region"===t.get("location")&&isNaN(parseInt(t.get("locationRegion")))){const e=document.getElementById("locationRegion").closest(".radioButtonOption");e.classList.add("error");e.closest(".formBlockRadio").addEventListener("click",(()=>{e.classList.remove("error")}))}if("department"===t.get("location")&&isNaN(parseInt(t.get("locationDepartment")))){const e=document.getElementById("locationDepartment").closest(".radioButtonOption");e.classList.add("error");e.closest(".formBlockRadio").addEventListener("click",(()=>{e.classList.remove("error")}))}if("urbaine"===t.get("type")&&isNaN(parseInt(t.get("uu")))){const e=document.getElementById("uu").closest(".radioButtonOption");e.classList.add("error");e.closest(".formBlockRadio").addEventListener("click",(()=>{e.classList.remove("error")}))}if(parseInt(t.get("townMin"))>parseInt(t.get("townMax"))){const e=document.getElementById("townMin").closest(".formBlockSelect"),t=document.getElementById("townMax").closest(".formBlockSelect");e.classList.add("error"),t.classList.add("error");e.closest(".formBlock").addEventListener("click",(()=>{e.classList.remove("error"),t.classList.remove("error")}))}if("true"===t.get("school")&&null===t.get("schoolOptions")){const e=document.getElementById("schoolOptions").closest(".radioButtonOption");e.classList.add("error");e.closest(".formBlockRadio").addEventListener("click",(()=>{e.classList.remove("error")}))}else{document.getElementById("searchForm").classList.add("isInvisible");document.getElementById("searchInProgress").classList.remove("isInvisible");try{const e=await fetch(`${formModule.base_url}/`,{method:"POST",body:t});if(e.ok){const t=await e.json();console.log("On a reçu un résultat !"),resultModule.showSearchResults(t)}else console.error("On a eu un pépin sur le serveur")}catch(e){console.error("Impossible de charger les résultats de la recherche depuis l'API",e)}}}},t=resultModule={base_url:null,setBaseUrl:e=>{resultModule.base_url=e},showSearchResults:e=>{console.log("Search results !"),resultModule.handleSearchMenuOptions(e);document.getElementById("searchInProgress").classList.add("isInvisible");document.getElementById("searchResults").classList.remove("isInvisible");const t=document.getElementById("searchResultsNumber");0==e.length&&(t.textContent="Il n'existe pas de ville correspondant à votre recherche"),1==e.length&&(t.textContent=`Il existe ${e.length} ville correspondant à votre recherche`),e.length>1&&(t.textContent=`Il existe ${e.length} villes correspondant à votre recherche`);for(const t of e)resultModule.makeTownCardInDOM(t)},makeTownCardInDOM:e=>{const t=document.getElementById("townCardTemplate"),o=document.importNode(t.content,!0);o.querySelector(".townCardName").textContent=e.name_town;o.querySelector(".townCardRegion").textContent=`(${e.region.name_region})`;o.querySelector(".townCardDepartment").textContent=e.department.name_dpt;const n=o.querySelector(".townCardUU"),s=e.urban_unit.name_uu;if(1==s.includes("hors unité urbaine")){const e=s.replace("hors unité urbaine","rurale");console.log(s),n.textContent=e}else n.textContent=`Commune appartenant à l'aire urbaine de ${s}`;o.querySelector(".townCardPop").textContent=`${e.population.population_total} habitants`;const r=o.querySelector(".townCardSchool"),l=o.querySelector(".schoolSection"),a=o.querySelector(".schoolIcon");if(1==Object.keys(e).includes("school")){const t=e.school;1==t.length&&(r.textContent=`Il y a ${e.school.length} école correspondant à votre recherche :`),t.length>1&&(r.textContent=`Il y a ${e.school.length} écoles correspondant à votre recherche :`);const o=document.createElement("ul");o.setAttribute("class","schoolList"),r.appendChild(o);for(const e of t){const t=document.createElement("li");t.setAttribute("class","schoolElement"),t.textContent=`- ${e.name_place} (${e.secteur})`,o.appendChild(t)}}else r.setAttribute("hidden",""),l.setAttribute("hidden",""),a.setAttribute("hidden","");document.getElementById("searchResultsContainer").appendChild(o)},handleSearchMenuOptions:()=>{document.getElementById("newSearch").addEventListener("click",o.reloadHomepage)}},o=app={base_url:"https://mavilleauvertpublicapi.onrender.com",init:async()=>{console.log("app.init !"),e.setBaseUrl(app.base_url),t.setBaseUrl(app.base_url),app.addListeners(),await e.getFormOptionsFromAPI()},addListeners:()=>{document.getElementById("searchForm").addEventListener("submit",app.handleSearchForm),console.log("L'event listener is in da place !");document.getElementById("aboutLink").addEventListener("click",app.showAboutModal);document.getElementById("closeIcon").addEventListener("click",app.hideAboutModal)},handleSearchForm:t=>{e.handleSearchForm(t)},reloadHomepage:()=>{document.location.reload()},showAboutModal:()=>{document.getElementById("modal").classList.remove("isInvisible")},hideAboutModal:()=>{document.getElementById("modal").classList.add("isInvisible")}};document.addEventListener("DOMContentLoaded",app.init)}();
//# sourceMappingURL=index.2d94a8ba.js.map
