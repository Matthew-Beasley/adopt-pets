const submit = document.querySelector('#submit-btn');
const zip = document.querySelector('#location')
const species = document.querySelector('#species');
const breed = document.querySelector('#breed');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const both = document.querySelector('#both');
const size = document.querySelector('#size');
const age = document.querySelector('#age');
const rightPanel = document.querySelector('#right-panel');

const baseUrl = 'https://api.rescuegroups.org/http/v2.json';

//////// initial search  //////////
const displaySearch = (results) => {
    const pets = results.data;
    console.log(pets)
    let html = '';
    for (let pet in pets) {
        if (pet){
            console.log(pet);
            html += `<h3>${pet.animalName}</h3>`
        }
    }
    rightPanel.innerHTML = html;

}

const createSearchObject = () => {

    const search = {
        apikey: '6QONihuq',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: '0',
            resultLimit: '10',
            resultSort: 'animalID',
            resultOrder: 'asc',
            filters:
                [
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

// build search url

// make api request

// handle data, break into chunks (pages?)

// display pets returned, in pages? on borderless cards
const submitSearch = (event) => {
    event.preventDefault();
    makeAPISearchRequest()
    .then(response => displaySearch(response));
    //console.log(promise, 'this is the promise in the event handler');

    //buildSearchURL();
}

submit.addEventListener('click', submitSearch)


///// login path //////////
