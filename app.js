var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
var output = "";
let lat, long, currentCountry, d;
const tableBody = document.querySelector('.tbody');


fetch("https://corona.lmao.ninja/countries?sort=country", requestOptions)
    .then(response => response.json())
    .then(result => {



        // Your Location



        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            // fetching location

            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
                .then(response => {

                    console.log("location fetched");
                    return response.json();

                })
                .then(data => {

                    currentCountry = data.countryName;
                    return currentCountry;

                })
                .then(countryName => {

                    result.forEach((data, index) => {
                        if (data.country == countryName) {

                            output = `<tr class="current">
                                        <th class=" ">${index + 1}</th>
                                        <td class='country '>${data.country} <span class="badge badge-pill badge-warning">Your Location</span></td>
                                        <td>${data.cases.toLocaleString()}</td>
                                        <td>${data.todayCases.toLocaleString()}</td>
                                        <td>${data.deaths.toLocaleString()}</td>
                                        <td>${data.todayDeaths.toLocaleString()}</td>
                                        <td>${data.recovered.toLocaleString()}</td>
                                        <td>${data.casesPerOneMillion}</td>
                                        <td>${data.deathsPerOneMillion}</td>
                                    </tr>`;

                            tableBody.innerHTML = output;

                        }
                    })

                    return result;

                })
                .then(result => {



                    console.log(result)

                    result.sort((a, b) => parseFloat(a.cases) - parseFloat(b.cases));
                    result.reverse();
                    result.forEach((data, index) => {


                        output += `<tr>
                                    <th class=" ">${index + 1}</th>
                                    <td class='country'>${data.country}</td>
                                    <td>${data.cases.toLocaleString()}</td>
                                    <td>${data.todayCases.toLocaleString()}</td>
                                    <td>${data.deaths.toLocaleString()}</td>
                                    <td>${data.todayDeaths.toLocaleString()}</td>
                                    <td>${data.recovered.toLocaleString()}</td>
                                    <td>${data.casesPerOneMillion}</td>
                                    <td>${data.deathsPerOneMillion}</td>
                                   </tr>`;
                    })
                    tableBody.innerHTML = output;
                })


        })



    })

    .then(myInput.addEventListener('keyup', filterCountries))
    .catch(error => console.log('error', error));


function filterCountries() {

    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];

        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};



navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    // fetching location

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
        .then(response => {


            return response.json();

        })
        .then(data => {

            currentCountry = data.countryCode;
            return currentCountry;

        })
        .then(country => {
            fetch(`https://thevirustracker.com/free-api?countryNewsTotal=${country}`)
                .then(response => response.json())
                .then(data => {


                    let newsItems = data.countrynewsitems;

                    console.log(data);

                    let lastIndex = countProperties(newsItems[0]);
                    let output = "";
                    let i = 1;
                    lastIndex--;
                    while (i < 6) {

                        output += `
                        <div class="card newsCard" ">
                        <img class="card-img-top" src="${newsItems[0][lastIndex].image}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">${newsItems[0][lastIndex].time}</p>
                            <h5 class="card-title">${newsItems[0][lastIndex].title}</h5>
                            <a href="${newsItems[0][lastIndex].url}" target="_blank" class="btn btn-primary w-100">View Full Story</a>
                        </div>
                      </div>
                        `;

                        i++;
                        lastIndex--;
                    }

                    document.querySelector('.newsCards').innerHTML = output;
                })
        })
})

function countProperties(obj) {
    console.log(Object.keys(obj).length);
    return Object.keys(obj).length;
}