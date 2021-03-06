const SELECT_DATA =
{
    breeds: [

    ],

    size: [
        'Small',
        'Medium',
        'Large'
    ],

    gender: [
        'Male',
        'Female'
    ],

    age: [
        'Young',
        'Adult',
        'Senior'
    ],
    searchType: [
        'zipcode',
        'gender',
        'breed',
        'size',
        'age'
    ]
};

const buildASelect = (select, data) => {
    data.forEach(item => {
        let option = document.createElement('option');
        if (typeof item !== 'string') {
            item = String(item)
        }
        option.text = item;
        option.value = item;
        select.add(option);
    })
}

const populateSelects = () => {
    const searchType = document.querySelector('#search-type');
    const age = document.querySelector('#age');
    const size = document.querySelector('#size');

    buildASelect(searchType, SELECT_DATA.searchType);
    buildASelect(size, SELECT_DATA.size);
    buildASelect(age, SELECT_DATA.age);
}

window.addEventListener('load', populateSelects)
