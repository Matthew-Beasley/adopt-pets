rescueGroups.org:
API docs: 
Your API Key: 6QONihuq

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
