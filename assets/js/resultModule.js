const resultModule = {

    base_url: null,

    setBaseUrl: url => {
        resultModule.base_url = url;
    },

    showSearchResults : (results)=> {
        console.log('Search results !')

        // CACHER LE FORM DE RECHERCHE

        // AFFICHER LE NOMBRE DE RESULTATS DISPONIBLES

        // GENERER 1 FICHE VILLE / RESULTAT
        for (const result of results) {
            resultModule.makeTownCardInDOM(result);
        }
    },

    makeTownCardInDOM : (data)=>{
        console.log(data);

        const template = document.getElementById('townCardTemplate');
        const node = document.importNode(template.content, true);

        // NOM DE VILLE
        const townName = node.querySelector('.townCardName');
        townName.textContent = data.name_town;

        // NOM DE REGION
        const townRegion = node.querySelector('.townCardRegion');
        townRegion.textContent = data.id_region;

        // NOM DE DEPARTEMENT
        const townDepartment = node.querySelector('.townCardDepartment');
        townDepartment.textContent = data.department.name_dpt;
        
        // ZONE URBAINE OU ZONE RURALE
        const townUU = node.querySelector('.townCardUU');
        const uuName = data.urban_unit.name_uu;
        console.log(uuName);
        if (uuName.includes('hors unité urbaine')==true){
            const uuNameUpdated = uuName.replace('hors unité urbaine', 'rurale');
            console.log(uuName);
            townUU.textContent = uuNameUpdated;
        } else{
            townUU.textContent = uuName;
        }

        // NB HABITANTS
        const townPopulation = node.querySelector('.townCardPop');
        townPopulation.textContent = `${data.population.population_total} habitants`;

        // ECOLES
        const townSchool = node.querySelector('.townCardSchool');
        // TODO : A CONTINUER
        // townSchool.textContent = data.department.name_dpt;

        
        const dataKeys = Object.keys(data);

        if (dataKeys.includes('school')==true){
            console.log(`Il y a des ecoles !`)
        } else {
            console.log(`Il n'y a PAS d'ecoles !`)
        }



        // AJOUT DE LA CARTE AU DOM
        document.getElementById('searchResultsContainer').appendChild(node);

    }



}