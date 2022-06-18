// call function on page load
addAccount()

function addAccount(){
    document.getElementById("add-account-btn").addEventListener("click", function(event){
        event.preventDefault()
        let custID = document.querySelector('#customerID-input-accounts');
        let cemail = document.querySelector('#email-input');
        let address = document.querySelector('#address-input');
        

        let req = new XMLHttpRequest();
        let data = {};

        data.customerID = custID.value;
        data.email = cemail.value;
        data.address = address.value;
        
        req.open("POST", '/insert-Account', true);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.addEventListener('load', () => {
            if(req.status >= 200 && req.status < 400){
                window.location.reload(true);
            } else{
                alert("Error - Please double check input fields");
            }
        })
        req.send(JSON.stringify(data));
    })
}

async function deleteAccount(row_id){
    let payload = {}
    payload.accountID = row_id

const response = await fetch(`http://${SERVER}.engr.oregonstate.edu:${PORT}/delete-Account`, {
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


async function updateAccount(edit_button, acc_ID){
// enable editing of inputs
    document.getElementById('`accounts-editCustomerID-' + acc_ID + '`').disabled = false
    document.getElementById('`accounts-editEmail-' + acc_ID + '`').disabled = false
    document.getElementById('`accounts-editAddress-' + acc_ID + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function(event) {
        let payload = {}
        payload.accountID = acc_ID
        payload.customerID = document.getElementById('`accounts-editCustomerID-' + acc_ID + '`').value
        if(document.getElementById('`accounts-editEmail-' + acc_ID + '`').value === ""){
            payload.email = null
        }else{
            payload.email = document.getElementById('`accounts-editEmail-' + acc_ID + '`').value
        }
        if(document.getElementById('`accounts-editAddress-' + acc_ID + '`').value ===""){
            payload.address = null
        }else{
            payload.address = document.getElementById('`accounts-editAddress-' + acc_ID + '`').value
        }

        const response = await fetch(`http://${SERVER}.engr.oregonstate.edu:${PORT}/update-Account`, {
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