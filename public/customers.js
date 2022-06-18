// call functions on page load
console.log(PORT);
addCustomer()

function addCustomer(){
    document.getElementById("add-cust-btn").addEventListener("click", function(event){
        event.preventDefault()
        let firstname = document.querySelector('#custFirstName-input');
        let lastname = document.querySelector('#custLastName-input');

        let req = new XMLHttpRequest();
        let data = {};
        
        

        
        data.fname = firstname.value;
        data.lname = lastname.value;
        if (data.fname === "" || data.lname === ""){
            console.log(data)
            window.alert("Error - Please double check input fields");
            return;
        }
        else{
            req.open("POST", '/insert-Customer', true);
            req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            req.addEventListener('load', () => {
                if(req.status >= 200 && req.status < 400){
                    window.location.reload(true);
                } else{
                    alert("Error - Please double check input fields");
                }
            })
            req.send(JSON.stringify(data));
        }
    })
}


async function deleteCustomer(row_id){
        let payload = {}
        payload.customerID = row_id

        const response = await fetch(`http://${SERVER}:${PORT}/delete-Customer`, {
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


async function updateCustomer(edit_button, cust_id){
    // enable editing of inputs
    document.getElementById('`customers-editFirstName-' + cust_id + '`').disabled = false
    document.getElementById('`customers-editLastName-' + cust_id + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function(event) {
        let payload = {}
        payload.customerID = cust_id
        payload.fname = document.getElementById('`customers-editFirstName-' + cust_id + '`').value
        payload.lname = document.getElementById('`customers-editLastName-' + cust_id + '`').value
        
        const response = await fetch(`http://${SERVER}:${PORT}/update-Customer`, {
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