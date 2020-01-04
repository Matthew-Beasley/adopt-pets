const SELECT_DATA =
{
    breeds: [

    ],

    size: [
        'small',
        'medium',
        'large'
    ],

    gender: [
        'male',
        'female'
    ],

    age: [
        'puppy',
        'adolescent',
        'adult',
        'senior'
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

    const age = document.querySelector('#age');
    const size = document.querySelector('#size');

    buildASelect(size, SELECT_DATA.size);
    buildASelect(age, SELECT_DATA.age);
}

window.addEventListener('load', populateSelects)
