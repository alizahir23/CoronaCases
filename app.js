const filter = document.querySelector("#filter");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let output = "";

const tableBody = document.querySelector('.tbody');

fetch("https://corona.lmao.ninja/countries?sort=country", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.sort((a, b) => parseFloat(a.cases) - parseFloat(b.cases));
        result.reverse();
        result.forEach((data, index) => {


            output += `<tr>
                        <th class ="removeMob">${index + 1}</th>
                        <td class='country'>${data.country}</td>
                        <td>${data.cases}</td>
                        <td>${data.deaths}</td>
                       </tr>`;
        })
        tableBody.innerHTML = output;
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
