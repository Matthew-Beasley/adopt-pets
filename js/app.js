const searchBtn = document.querySelector('#search-btn');
const backBtn = document.querySelector('#back-btn');
const zip = document.querySelector('#location');
const species = document.querySelector('#species');
const breed = document.querySelector('#breed');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const both = document.querySelector('#both');
const size = document.querySelector('#size');
const age = document.querySelector('#age');
const rightPanel = document.querySelector('#right-panel');

const baseUrl = 'https://api.rescuegroups.org/http/v2.json';

const makePaginator = () => {
    let page = 0;

    return (direction) => {
        if (direction === 'forward') {
            page += 20;
            return page;
        } else if (direction === 'back') {
            if (page - 20 >= 0) {
                page -= 20;
                return page;
            } else if (page - 20 < 0) {
                page = 0;
                return page;
            }
        } else if (direction === 'reset') {
            page = 0;
        } else if (!direction) {
            return page;
        }
    }
}

const paginator = makePaginator();

const displaySearch = (results) => {
    if (species.value !== 'dog') {
        rightPanel.innerHTML = '<h3>Sorry, under construction. Only dogs available at this time';
        return;
    }

    const pets = results.data;
    console.log(pets)
    let html = '<table>'

    for (let pet in pets) {
        if (pet) {
            html += `
            <tr class="row-striped" >
                <td class="thumb-cell">
                    <img class="thumb" src="${pets[pet].animalPictures[0].urlSecureThumbnail}" />
                    <div class="animalId">${pets[pet].animalID}</div>
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

const displayDetail = (results, id) => {
    const pet = results.data[id];
    let html =
    '<div class="large=image-box">'
    pet.animalPictures.forEach(pic => {
       html += `<img src="${pic.urlSecureFullsize}" />`
    } )
    html += `
    </div>
    <div class="detail-box">`
    for (let detail in pet) {
        if (pet[detail] !== '') {
            console.log('pet', pet[detail]);
            html += `<p><strong>${detail}:</strong>  ${pet[detail]}</p>`
        }
    }
    html += '</div>'
    //TO DO: Use results to generate html for large image and details
    rightPanel.innerHTML = html;
}

const createSearchObject = (startPosition) => {
    console.log(startPosition);
    let gender;
    if (male.checked) {
        gender = male.value;
    } else if (female.checked) {
        gender = female.value;
    } else if (both.checked) {
        gender = both.value;
    }

    const search = {
        apikey: '6QONihuq',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: `${startPosition}`,
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
                        criteria: `${gender.value}`
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
                    },
                    {
                        fieldName: 'animalSex',
                        operation: 'equals',
                        criteria: `${gender}`
                    },
                    {
                        fieldName: 'animalBreed',
                        operation: 'equals',
                        criteria: `${breed.value}`
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

const buildIDSearchObject = (animalId) => {
    const search = {
        apikey: '6QONihuq',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: '0',
            resultLimit: '1',
            resultSort: 'animalId',
            resultOrder: 'asc',
            filters:
                [
                    {
                        fieldName: 'animalID',
                        operation: 'equals',
                        criteria: `${animalId}`
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

const makeAPISearchRequest = (startposition, searchType, id) => {
    console.log(startposition);
    let searchObject;
    if (searchType === 'full') {
        searchObject = createSearchObject(startposition);
    } else if (searchType === 'details') {
        searchObject = buildIDSearchObject(id)
    }

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

const submitDetail = ({ target }) => {
    console.log(target);
    const animalId = target.nextSibling.nextSibling.innerHTML;
    makeAPISearchRequest(0, 'details', animalId)
        .then(response => displayDetail(response, animalId));

}

const submitSearch = (event) => {
    event.preventDefault();
    let start = paginator();
    makeAPISearchRequest(start, 'full', null)
        .then(response => displaySearch(response));
    paginator('forward');
}

const submitBack = (event) => {
    event.preventDefault();
    let start = paginator('back');
    makeAPISearchRequest(start, 'full', null)
        .then(response => displaySearch(response));
}

male.addEventListener('click', () => paginator('reset'));
female.addEventListener('click', () => paginator('reset'));
both.addEventListener('click', () => paginator('reset'));
zip.addEventListener('change', () => paginator('reset'));
rightPanel.addEventListener('click', submitDetail);
searchBtn.addEventListener('click', submitSearch);
backBtn.addEventListener('click', submitBack);

window.addEventListener('load', () => {
    makeAPISearchRequest(0, 'full', null)
        .then(response => displaySearch(response));
})
