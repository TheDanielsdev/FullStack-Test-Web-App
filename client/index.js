//for getting or reading or making get request
document.addEventListener('DOMContentLoaded' , function (){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadTable(data['data']));

    fetchNames();

});



//for post request
const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    
    window.location.reload();

   if(nameInput.value == "") {
    alert('Field Cannot be empmty');
   } else {
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoColumn(data['data']));
   }
   nameInput.value = "";
}


function insertRowIntoColumn(data) {

}


//for getting or reading or making get request
function loadTable(data) {
    const table = document.querySelector('table tbody'); 
    const div  = document.querySelector('#div');     

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'>No Data</td></tr>"
        return;
    } else {
        let tableHtml = "";
        data.forEach(function ({id, name, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleDateString()}</td>`;
        tableHtml += "</tr>";
        });
    
        table.innerHTML = tableHtml;
        let divHtml = "";
        data.forEach(function ({id, name, date_added}) {
            divHtml += "<div>";
            divHtml += `<p>${name + date_added}</p>`;
            divHtml += "</div>";
        })
        div.innerHTML = table.Html;
    }
  
    
}






function fetchNames() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadDiv(data['data']));
}
function loadDiv(data) {
  
    const divItem  = document.querySelector('#div');     

    if(data.length === 0) {
        divItem.innerHTML = "<p>No Data</p>";
        return;
    } else {
        const divItem  = document.getElementById('div'); 
        const newDiv = document.createElement('div');
        console.log('add');
        newDiv.classList.add('div-shadow');
        divItem.appendChild(newDiv);




        let divHtml = "";
        data.forEach(function ({id, name, date_added}) {
            divHtml += "<p>";
            divHtml += `<H3>${name}</H3>`;
            divHtml += `<H3>${date_added}</H3>`;
            divHtml += "</p>";
                        
           
        })
       newDiv.innerHTML = divHtml;
    }
  
    
}

const addCommentBtn = document.querySelector('#add-comment-btn');
addCommentBtn.onclick = function() {
    const nameInput = document.querySelector('#commentName-input');
    const commentIput = document.querySelector('#comment-input');
    const name = nameInput.value;
    const comment = commentIput.value;
    
   if(nameInput.value == "") {
    alert('Field Cannot be empmty');
   } else {
    fetch('http://localhost:5000/insert/comment', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({names : name, comments: comment })
    })
    .then(response => response.json())
    .then(data => console.log(data));
   }
   nameInput.value = "";
   commentIput.value = "";
}


function insertRowIntoCol(data) {

}
