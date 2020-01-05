const searchBtn = document.querySelector('#search-btn');
const backBtn = document.querySelector('#back-btn');
const zip = document.querySelector('#location');
const species = document.querySelector('#species');
const breed = document.querySelector('#breed');
const sex = document.querySelector('input[name="gender"]:checked'); //REFACTOR set up to use an if statement
const size = document.querySelector('#size');
const age = document.querySelector('#age');
const rightPanel = document.querySelector('#right-panel');

const baseUrl = 'https://api.rescuegroups.org/http/v2.json';

const makePaginator = () => {
    let page = 0;
    return (direction) => {
        if (direction === 'forward'){
            page += 20;
            return page;
        } else if (page === 'back') {
            if (page - 20 >= 0){
                page -= 20;
                return page;
            } else if (page > 0) {
                page = 0;
                return page;
            }
        } else if (!direction) {
            return page;
        }
    }
}

const paginate = makePaginator();

const displaySearch = (results) => {
    if (species.value !== 'dog') {
        rightPanel.innerHTML = '<h3>Sorry, under construction. Only dogs available at this time';
        return;
    }

    const pets = results.data;
    console.log(pets)
    let html = '<table>'

    for (let pet in pets) {
        if (pet){
            html += `<tr class="row-striped" >
                        <td class="thumb-cell">
                            <img class="thumb" src="${pets[pet].animalPictures[0].urlSecureThumbnail}" />
                        </td>
                        <td class="name-cell">
                            <h4>${pets[pet].animalName}</h4>
                        </td>
                        <td class="data-cell">
                            <div class="pet-data">
                                <p>Gender: ${pets[pet].animalSex}</p>
                                <p>Age: ${pets[pet].animalGeneralAge}</p>
                                <p>Breed: ${pets[pet].animalPrimaryBreed}</p>
                                <p>Location: ${pets[pet].animalLocationCitystate}</p>
                            </div> 
                        </td>
                    </tr>`
        }
    }
    html += '</table>'
    rightPanel.innerHTML = html;
}

const createSearchObject = (startPosition) => {
    const sex = document.querySelector('input[name="gender"]:checked');
    console.log(sex.value);
    const search = {
        apikey: '6QONihuq',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: `${startPosition}`, //paginate here
            resultLimit: '20',
            resultSort: 'animalId',
            resultOrder: 'asc',
            filters:
                [
                    {
                        fieldName: 'animalSpecies',
                        operation: 'equals',
                        criteria: `${species.value}`
                    },
                    {
                        fieldName: 'animalSex',
                        operation: 'equals',
                        criteria: `${sex.value}`
                    },
                    {
                        fieldName: 'animalStatus',
                        operation: 'equals',
                        criteria: 'Available'
                    },
                    {
                        fieldName: 'animalLocationDistance',
                        operation: 'radius',
                        criteria: '50'
                    },
                    {
                        fieldName: 'animalLocation',
                        operation: 'equals',
                        criteria: `${zip.value}`
                    },
                    {
                        fieldName: 'animalGeneralAge',
                        operation: 'equals',
                        criteria: `${age.value}`
                    }
                ],
            filterProcessing: '1',
            fields:
                [
                    'animalID', 'animalOrgID', 'animalActivityLevel', 'animalAdoptedDate', 'animalAdoptionFee', 'animalAgeString', 'animalAltered', 'animalAvailableDate', 'animalBirthdate', 'animalBirthdateExact', 'animalBreed', 'animalCoatLength', 'animalColor', 'animalColorID', 'animalColorDetails', 'animalCourtesy', 'animalDeclawed', 'animalDescription', 'animalDescriptionPlain', 'animalDistinguishingMarks', 'animalEarType', 'animalEnergyLevel', 'animalExerciseNeeds', 'animalEyeColor', 'animalFence', 'animalFound', 'animalFoundDate', 'animalFoundPostalcode', 'animalGeneralAge', 'animalGeneralSizePotential', 'animalGroomingNeeds', 'animalHousetrained', 'animalIndoorOutdoor', 'animalKillDate', 'animalKillReason', 'animalLocation', 'animalLocationCoordinates', 'animalLocationDistance', 'animalLocationCitystate', 'animalMicrochipped', 'animalMixedBreed', 'animalName', 'animalSpecialneeds', 'animalSpecialneedsDescription', 'animalNeedsFoster', 'animalNewPeople', 'animalNotHousetrainedReason', 'animalObedienceTraining', 'animalOKWithAdults', 'animalOKWithCats', 'animalOKWithDogs', 'animalOKWithKids', 'animalOwnerExperience', 'animalPattern', 'animalPatternID', 'animalAdoptionPending', 'animalPrimaryBreed', 'animalPrimaryBreedID', 'animalRescueID', 'animalSearchString', 'animalSecondaryBreed', 'animalSecondaryBreedID', 'animalSex', 'animalShedding', 'animalSizeCurrent', 'animalSizePotential', 'animalSizeUOM', 'animalSpecies', 'animalSpeciesID', 'animalSponsorable', 'animalSponsors', 'animalSponsorshipDetails', 'animalSponsorshipMinimum', 'animalStatus', 'animalStatusID', 'animalSummary', 'animalTailType', 'animalThumbnailUrl', 'animalUptodate', 'animalUpdatedDate', 'animalUrl', 'animalVocal', 'animalYardRequired', 'animalAffectionate', 'animalApartment', 'animalCratetrained', 'animalDrools', 'animalEagerToPlease', 'animalEscapes', 'animalEventempered', 'animalFetches', 'animalGentle', 'animalGoodInCar', 'animalGoofy', 'animalHasAllergies', 'animalHearingImpaired', 'animalHypoallergenic', 'animalIndependent', 'animalIntelligent', 'animalLap', 'animalLeashtrained', 'animalNeedsCompanionAnimal', 'animalNoCold', 'animalNoFemaleDogs', 'animalNoHeat', 'animalNoLargeDogs', 'animalNoMaleDogs', 'animalNoSmallDogs', 'animalObedient', 'animalOKForSeniors', 'animalOKWithFarmAnimals', 'animalOlderKidsOnly', 'animalOngoingMedical', 'animalPlayful', 'animalPlaysToys', 'animalPredatory', 'animalProtective', 'animalSightImpaired', 'animalSkittish', 'animalSpecialDiet', 'animalSwims', 'animalTimid', 'fosterEmail', 'fosterFirstname', 'fosterLastname', 'fosterName', 'fosterPhoneCell', 'fosterPhoneHome', 'fosterSalutation', 'locationAddress', 'locationCity', 'locationCountry', 'locationUrl', 'locationName', 'locationPhone', 'locationState', 'locationPostalcode', 'animalPictures', 'animalVideos', 'animalVideoUrls'
                ]

        }

    }
    return search;
}

const makeAPISearchRequest = (startposition) => {
    const searchObject = createSearchObject(startposition);

    const promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                resolve(json);
            } else {
                reject(xhr.statusText);
            }
        };
        const data = JSON.stringify(searchObject);
        xhr.send(data);
    });

    return promise;
}

const submitSearch = (event) => {
    let start = paginate();
    event.preventDefault();
    makeAPISearchRequest(start)
    .then(response => displaySearch(response));
    paginate('forward');
}

const submitBack = (event) => {
    let start = paginate();
    event.preventDefault();
    makeAPISearchRequest(start)
    .then(response => displaySearch(response))
    paginate('back');
}

searchBtn.addEventListener('click', submitSearch);
backBtn.addEventListener('click', submitBack);
window.addEventListener('load', () => {
    makeAPISearchRequest(0)
        .then(response => displaySearch(response));
})

///// login path //////////
