rescueGroups.org:
API docs: 
Your API Key: adopt-a-pet.surge.sh

surge url: adopt-a-pet.surge.sh

request url: https://api.rescuegroups.org/http/v2.json

https://rescuegroups.org/services/adoptable-pet-data-api/


zip url: https://www.zipcodeapi.com/

zip api key: r5gWDlTNjPSGXpsRxxAVstSqVOHZYSuwK8UsK2bV77SL6oaJzADtrfleTjv6D9jK

Petfinder:
12/27/2019

proxy server, add this before url
https://corsproxy.github.io

Pet finder api credentials, waiting for reply about domain origin (cors issue)
api key  kTkq5OF4L9FjO4bQcMXrSSKZZZQiLKJ82ZIqG1JJhhPPt6kD4A
secret 5fycV7UzMZBF2aoixMVXtIrQ306XSerhfkO29uZA

token request (curl):
curl -d "grant_type=client_credentials&client_id=kTkq5OF4L9FjO4bQcMXrSSKZZZQiLKJ82ZIqG1JJhhPPt6kD4A&client_secret=5fycV7UzMZBF2aoixMVXtIrQ306XSerhfkO29uZA" https://api.petfinder.com/v2/oauth2/token

launch chrome without cross site security:
open -a /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir="/tmp/chrome_tmp"


to get breeds list:
https://dog.ceo/dog-api/documentation/


rest calls:

const makeAPIRequest = () => {

/*
    var request = new Request('https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token', {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            grant_type: 'client_credentials',
            client_id: 'kTkq5OF4L9FjO4bQcMXrSSKZZZQiLKJ82ZIqG1JJhhPPt6kD4A',
            client_secret: '5fycV7UzMZBF2aoixMVXtIrQ306XSerhfkO29uZA'
        })
    });

    fetch(request)
    .then(response => {return response.json()})
    .then(myJson => console.log(myJson));
*/
/*
    axios({
        method: 'GET',
        headers: {grant_type: 'client_credentials',
            client_id: 'kTkq5OF4L9FjO4bQcMXrSSKZZZQiLKJ82ZIqG1JJhhPPt6kD4A',
            client_secret: '5fycV7UzMZBF2aoixMVXtIrQ306XSerhfkO29uZA'},
        url: 'https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token',
    }).then(function (response) {
        console.log(response.data);
    });
*/
}
/*
const makeAPIRequest = () => {
    const options = {
        headers: {
            grant_type: 'client_credentials',
            client_id: 'kTkq5OF4L9FjO4bQcMXrSSKZZZQiLKJ82ZIqG1JJhhPPt6kD4A',
            client_secret: '5fycV7UzMZBF2aoixMVXtIrQ306XSerhfkO29uZA'
        }
    };

    let promise = axios.get('https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token',  options)
        .then(response => console.log(response));
    console.log(promise);
}


const makePaginator = () => {
    let page = 0;
    return (direction) => {
        if (direction === 'forward'){
            page += 20;
            return page;
        } else if (direction === 'back') {
            if (page - 20 >= 0){
                page -= 20;
                return page;
            } else {
                return 0;
            }
        } else if (!direction) {
            return page;
        }
    }
}


const search = {
        apikey: 'cACEhIdz',
        objectType: 'animals',
        objectAction: 'publicSearch',
        search:
        {
            resultStart: `${startPosition}`,
            resultLimit: '20',
            resultSort: 'animalCreatedDate',
            resultOrder: 'desc',
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
