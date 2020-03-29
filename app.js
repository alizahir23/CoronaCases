var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
var output = "";
let lat, long, currentCountry;
const tableBody = document.querySelector('.tbody');
const tableBodyCurrent = document.querySelector('.current');

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
                                        <th>${index + 1}</th>
                                        <td class='country '>${data.country} <span class="badge badge-pill badge-warning">Your Location</span></td>
                                        <td>${data.cases}</td>
                                        <td>${data.deaths}</td>
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
                                    <th>${index + 1}</th>
                                    <td class='country'>${data.country}</td>
                                    <td>${data.cases}</td>
                                    <td>${data.deaths}</td>
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
}
