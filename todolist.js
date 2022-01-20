function getnupdate() {
    console.log("updating list...");
    tl = document.getElementById("title").value;
    dec = document.getElementById("description").value;
    if(localStorage.getItem('itemsJson')==null)
    {
        itemsJsonArray = [];
        itemsJsonArray.push([tl , dec]);
        localStorage.setItem('itemsJson' , JSON.stringify(itemsJsonArray));
    }
    else
    {
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr); 
        itemsJsonArray.push([tl , dec]);
        localStorage.setItem('itemsJson' , JSON.stringify(itemsJsonArray));
    }
    update();
}
function update() {
    if(localStorage.getItem('itemsJson')==null)
    {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson' , JSON.stringify(itemsJsonArray));
    }
    else
    {
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr); 
    }
    //add items in the table
    let str = "";
    let tableBody = document.getElementById("tbody");
    itemsJsonArray.forEach((element , index) => {
        str += `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-danger btn-sm" onclick = "deleted(${index})">Delete</button></td>
            </tr> `;
        });

        tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click" , getnupdate);
update();

function deleted(itemIndex) {
    console.log("Delete",itemIndex);
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    //Delete item index from list
    itemsJsonArray.splice(itemIndex , 1);
    localStorage.setItem('itemsJson' , JSON.stringify(itemsJsonArray));
    update();
}

//clear function
function clearStr() {
    if(confirm("Do you really wanna clear list?")){
    console.log("Clearing the storage");
    localStorage.clear();
    update();
    }
}