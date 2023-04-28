let getClass = className => document.querySelector(className);
let searchMovie = document.querySelector(`.field__search`);
const getMovie = async () => {
        const response = await fetch('http://www.omdbapi.com/?s=' + searchMovie.value + `&plot=full&apikey=fefc7869`);
        const data = await response.json();
        if (searchMovie.value.length == 0) {
                alert(`поле пусте`)

        }
        if (getClass(`.container`).children.length > 0 && searchMovie.value.length != 0) {
                while (getClass(`.container`).firstChild) {
                        getClass(`.container`).removeChild(getClass(`.container`).lastChild);
                }
        }
        for (let i = 0; i < data.Search.length; i++) {
                getClass(`.container`).appendChild(createNewMovie(data.Search[i].Poster, data.Search[i].Title, data.Search[i].Type, data.Search[i].Year))
        }
        createNewData(data)
           getClass(`.movie_container`).addEventListener('click', function () {
                getClass(`.movie_container`).classList.add(`hide`);
                getClass(`.ratings__this`).innerHTML = '<b>Ratings:</b><br>'
        })
        searchMovie.value = ''
}

function createNewData(data) {
        document.querySelectorAll(`.details`).forEach((elem, key) => {
                elem.addEventListener(`click`, function () {
                        getClass(`.movie_container`).classList.remove('hide')
                        let getID = data.Search[key].imdbID
                        return fetch(`http://www.omdbapi.com/?i=` + getID + `&apikey=fefc7869`)
                                .then(response => response.json())
                                .then(data => {
                                        console.log(data)
                                        getClass(`.img__poster_big`).src = data.Poster
                                        getClass(`.title__this`).textContent = data.Title
                                        getClass(`.rated__this`).textContent = data.Rated + ' ' + data.Year + ' ' + data.Genre
                                        getClass(`.plot__this`).textContent = data.Plot
                                        getClass(`.written__this`).innerHTML = '<b>Written by:</b>' + ' ' + data.Writer
                                        getClass(`.directed__this`).innerHTML = '<b>Directed by:</b>' + ' ' + data.Director
                                        getClass(`.starring__this`).innerHTML = '<b>Starring:</b>' + ' ' + data.Actors
                                        getClass(`.boxOffice__this`).innerHTML = '<b>BoxOffice:</b>' + ' ' + data.BoxOffice
                                        getClass(`.awards__this`).innerHTML = '<b>Awards:</b>' + ' ' + data.Awards
                                        data.Ratings.forEach(element => {
                                                getClass(`.ratings__this`).innerHTML += element.Source + ' ' + element.Value + '<br>'
                                        })
                                })
                })
        })
}

function createNewMovie(poster, title, type, year, id) {
        let parentDiv = document.createElement(`div`)
        parentDiv.className = 'movie'
        let childImg = document.createElement(`img`)
        childImg.className = 'img__poster'
        childImg.setAttribute(`src`, poster)
        let childTitle = document.createElement(`p`)
        childTitle.className = `title`
        childTitle.textContent = title;
        let childType = document.createElement(`p`)
        childType.className = `type`
        childType.textContent = type;
        let childYear = document.createElement(`p`)
        childYear.className = `year`
        childYear.textContent = year;
        let childButton = document.createElement(`button`)
        childButton.className = `details`
        childButton.textContent = 'More details';
        parentDiv.appendChild(childImg)
        parentDiv.appendChild(childTitle)
        parentDiv.appendChild(childType)
        parentDiv.appendChild(childYear)
        parentDiv.appendChild(childButton)
        return parentDiv;
}