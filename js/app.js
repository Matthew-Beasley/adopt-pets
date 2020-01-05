const submit = document.querySelector('#submit-btn');
const zip = document.querySelector('#location')
const species = document.querySelector('#species');
const breed = document.querySelector('#breed');
const sex = document.querySelector('input[name="gender"]:checked');
const size = document.querySelector('#size');
const age = document.querySelector('#age');
const rightPanel = document.querySelector('#right-panel');

const baseUrl = 'https://api.rescuegroups.org/http/v2.json';

const displaySearch = (results) => {
    if (species.value !== 'dog') {
        rightPanel.innerHTML = '<h3>Sorry, under construction. Only dogs available at this time';
        return;
    }

    const pets = results.data;
    console.log(pets)
    rightPanel.innerHTML = '';
    let html = '';
    for (let pet in pets) {
        if (pet){
            html += `<div class="card">
                        <h3>${pets[pet].animalName}</h3>
                        <img class="thumb" src="${pets[pet].animalPictures[0].urlSecureThumbnail ? pets[pet].animalPictures[0].urlSecureThumbnail : ''}" />
                    </div>`
        }
    }
    rightPanel.innerHTML = html;
}

const createSearchObject = () => {
    const sex = document.querySelector('input[name="gender"]:checked');
console.log(sex.value);
    const search = {
        apikey: '6QONihuq',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: '0', //paginate here
            resultLimit: '9',
            resultSort: 'animalID',
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

const makeAPISearchRequest = (() => {
    const searchObject = createSearchObject();

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
})

const submitSearch = (event) => {
    event.preventDefault();
    makeAPISearchRequest()
    .then(response => displaySearch(response));
}

submit.addEventListener('click', submitSearch);


///// login path //////////
