
document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})


function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => {
        putDogs(data)
    })
}

function putDogs(dataArray) {
    let tableBody = document.getElementById('table-body')
    for (const data of dataArray) {
        let dogRow = document.createElement('tr')
        let dogEdit = document.createElement('td')
        let dogButton = document.createElement('button')
        dogEdit.class = 'dog-edit'
        dogButton.innerText = 'Edit'
        dogButton.class = 'dog-button'
        let dogArray = Object.values(data)
        for (const d of dogArray.slice(1)) {
            let dogData = document.createElement('td')
            dogData.id = dogArray[0]
            dogData.innerText = d
            dogRow.appendChild(dogData)
        }
        tableBody.appendChild(dogRow)
        dogEdit.appendChild(dogButton)
        dogRow.appendChild(dogEdit)
        dogButton.addEventListener('click', function() {
            editDog(data)
            handleSubmit(data, dogRow)
        })
    }
}

function editDog(data) {
    let dogForm = document.getElementById('dog-form')
    let dogName = dogForm[0]
    let dogBreed = dogForm[1]
    let dogSex = dogForm[2]
    dogName.value = data.name
    dogBreed.value = data.breed
    dogSex.value = data.sex
}


function handleSubmit(data, dogRow) {  
    let dogForm = document.getElementById('dog-form')
    let submitButton = dogForm[3]
    submitButton.addEventListener('click', function(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify()
        })
        .then(resp => resp.json())
        .then(d => updateDog(d, dogRow))
    })
}

function updateDog(d, dogRow) {
    let dogForm = document.getElementById('dog-form')
    let dogName = dogForm[0]
    let dogBreed = dogForm[1]
    let dogSex = dogForm[2]
    d.name = dogName.value
    d.breed = dogBreed.valued
    d.sex = dogSex.value
    let chartName = dogRow.childNodes[0]
    let chartBreed = dogRow.childNodes[1]
    let chartSex = dogRow.childNodes[2]
    chartName.innerText = dogName.value
    chartBreed.innerText = dogBreed.value
    chartSex.innerText = dogSex.value
}