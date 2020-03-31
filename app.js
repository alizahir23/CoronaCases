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
                    result.sort((a, b) => parseFloat(a.cases) - parseFloat(b.cases));
                    result.reverse();
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


        }, error => {
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

    .then(myInput.addEventListener('keyup', filterCountries))
    .catch(error => console.log('error', error));


function filterCountries(e) {

    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    var x = window.matchMedia("(max-width: 479px)");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];


        if (td) {
            txtValue = td.textContent || td.innerText;
            if (filter) {   //removes news grid while searching on smaller

                matchingMediaQuerryForNewsGrid(x);
            } else {
                document.querySelector('.newsGrid').style.display = "";
            }
            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

};

// Getting News
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
                    let i = 1;
                    console.log(data)
                    let newsItems = data.countrynewsitems;

                    var x = window.matchMedia("(max-width: 479px)");

                    i = matchingMediaQuerry(x);

                    let lastIndex = countProperties(newsItems[0]);
                    let output = "";

                    lastIndex--;
                    while (i > 0) {

                        document.querySelector('.newsCards').innerHTML += `
                        <div class="card newsCard" ">
                        <img class="card-img-top" src="${newsItems[0][lastIndex].image}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">${newsItems[0][lastIndex].time}</p>
                            <h5 class="card-title">${newsItems[0][lastIndex].title}</h5>
                            <a href="${newsItems[0][lastIndex].url}" target="_blank" class="btn btn-primary w-100">View Full Story</a>
                        </div>
                      </div>
                        `;

                        i--;
                        lastIndex--;
                    }


                })
        })
}, err => {
    // if location declined
    document.querySelector('.alertContainer').innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
            <strong>${err.message}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;

    fetch(`https://thevirustracker.com/free-api?countryNewsTotal=US`)
        .then(response => response.json())
        .then(data => {
            let i = 1;
            console.log(data)
            let newsItems = data.countrynewsitems;

            var x = window.matchMedia("(max-width: 479px)");

            i = matchingMediaQuerry(x);

            let lastIndex = countProperties(newsItems[0]);
            let output = "";

            lastIndex--;
            while (i > 0) {

                document.querySelector('.newsCards').innerHTML += `
                        <div class="card newsCard" ">
                        <img class="card-img-top" src="${newsItems[0][lastIndex].image}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">${newsItems[0][lastIndex].time}</p>
                            <h5 class="card-title">${newsItems[0][lastIndex].title}</h5>
                            <a href="${newsItems[0][lastIndex].url}" target="_blank" class="btn btn-primary w-100">View Full Story</a>
                        </div>
                      </div>
                        `;

                i--;
                lastIndex--;
            }


        })
})

// Global Totals

fetch('https://corona.lmao.ninja/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let lastUpdate = timeAgo(data.updated);

        document.querySelector('.globalTotals').innerHTML = `
        <span class="badge badge-warning">Total Cases: ${data.cases.toLocaleString()}</span>
        <span class="badge badge-danger">Total Deaths: ${data.deaths.toLocaleString()}</span>
        <span class="badge badge-success">Total Recovered: ${data.recovered.toLocaleString()}</span>
        <span class="badge badge-info">Active Cases: ${data.active.toLocaleString()}</span>
        <span class="badge badge-light">Last Updated: ${lastUpdate}</span>
        `;
    })


function countProperties(obj) {
    console.log(Object.keys(obj).length);
    return Object.keys(obj).length;
}
function matchingMediaQuerry(x) {
    if (x.matches) { // If media query matches
        return 5;
    } else {
        return 25;
    }
}

function matchingMediaQuerryForNewsGrid(x) {
    if (x.matches) { // If media query matches
        document.querySelector('.newsGrid').style.display = "none";
    }
}

// last updated time stamp

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}


// --- Main function
function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}

// sorting table

function sortTableByColumn(table, column, asc = true) {
    const tbody = table.tBodies
}