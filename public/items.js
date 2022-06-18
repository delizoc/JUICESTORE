// call functions on page load
addItem()

function addItem(){
    document.getElementById("add-item-btn").addEventListener("click", function(event){
        event.preventDefault()
        let iname = document.querySelector('#name-input');
        let iprice = document.querySelector('#price-input');
        
        let req = new XMLHttpRequest();
        let data = {};
        if (iname.value === "" || iprice.value === ""){
            window.alert("Error - Please double check input fields");
            return;
        }
        data.name = iname.value;
        data.price = iprice.value;
        

        req.open("POST", '/insert-Item', true);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.addEventListener('load', () => {
            if(req.status >= 200 && req.status < 400){
                window.location.reload(true);
            } else{
                alert("Error - Please double check input fields");
            }
        })
        // console.log(req);
        req.send(JSON.stringify(data));
    })
}


function filterItems(){
    let filter_input = document.querySelector('#search-input');
    let current_filter = filter_input.value;
    let items_table = document.querySelector('#myTable-input');
    let items_rows = items_table.getElementsByTagName('tr');
    for (let i = 0; i < items_rows.length; i++){
        // get text value to compare to search string
        let item_td = items_rows[i].getElementsByTagName('td')[1];
        if (item_td != undefined) {
            let item_input_text = item_td.getElementsByTagName('input')[0].value;
            if (item_input_text.toLowerCase().includes(current_filter.toLowerCase()) != true) {
                items_rows[i].style.display = "none"
            }
            else {
                items_rows[i].style.display = ""
            }
        }
    }
    
}


async function deleteItem(row_id){
        let payload = {}
        payload.itemID = row_id

        const response = await fetch(`http://${SERVER}:${PORT}/delete-Item`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(payload)
        })
        if (response.status == 200) {
            window.location.reload(true);
        }  
}


async function updateItem(edit_button, item_id){
    // enable editing of inputs
    document.getElementById('`items-editName-' + item_id + '`').disabled = false
    document.getElementById('`items-editPrice-' + item_id + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function(event) {
        let payload = {}
        payload.itemID = item_id
        payload.name = document.getElementById('`items-editName-' + item_id + '`').value
        payload.price = document.getElementById('`items-editPrice-' + item_id + '`').value
        console.log(payload.name);
        console.log(payload.price);
        
        const response = await fetch(`http://${SERVER}:${PORT}/update-Item`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
        })
        // reload page upon success to reset buttons to disabled and show new values
        if (response.status == 200) {
            window.location.reload(true)
        } else {
            alert("Error - Please double check for valid input fields")
            window.location.reload(true)
        }
    }
}