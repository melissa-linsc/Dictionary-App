const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const result = document.getElementById('result')

const sound = document.getElementById('sound')

const btn = document.getElementById('search-btn')

btn.addEventListener('click', () => {
    let inputWord = document.getElementById('input-word').value
    fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        result.innerHTML = `
        <div class="word">
                <h3>${inputWord}</h3>
                <button onclick='playSound()' id='sound-btn'>
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p id='phonetic'>${data[0].phonetics[0].text}</p>
            </div>
            <p class="definition">
                1. ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example" id='word-example'>
                ${data[0].meanings[0].definitions[0].example}
            </p>`;

        const example = document.getElementById('word-example')
        if (data[0].meanings[0].definitions[0].example == null) {
            example.innerHTML = 'No Example Found.'
        }

        const phonetic = document.getElementById('phonetic')
        if (data[0].phonetics[0].text == null ) {
            phonetic.innerHTML = ''
        }

        const soundBtn = document.getElementById('sound-btn')
        if ( data[0].phonetics[0].audio != '') {
            sound.setAttribute('src',`${data[0].phonetics[0].audio}`)
            console.log(sound)
        }
        else if ( data[0].phonetics[1].audio != '') {
            sound.setAttribute('src',`${data[0].phonetics[1].audio}`)
            console.log(sound)
        }
        else {
            soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
            sound.setAttribute('src',``)
        }
  
    })
    .catch( () => {
        result.innerHTML = `<h3>No word found!<h3>`
    })
})

function playSound() {
    sound.play();
}

