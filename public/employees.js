// call functions on page load
addEmployee()

function addEmployee(){
    document.getElementById("add-employee-btn").addEventListener("click", function(event){
        event.preventDefault()
        let efname = document.querySelector('#employeeFname-input');
        let elname = document.querySelector('#employeeLname-input');
        let eposition = document.querySelector('#employeePosition-input');
        let ephoneNumber = document.querySelector('#employeePhoneNumber-input');


        let req = new XMLHttpRequest();
        let data = {};

        data.fname = efname.value;
        data.lname = elname.value;
        data.position = eposition.value;
        data.phoneNumber = ephoneNumber.value;

        req.open("POST", '/insert-Employee', true);
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


async function deleteEmployee(row_id){
        let payload = {}
        payload.employeeID = row_id

        const response = await fetch(`http://${SERVER}.engr.oregonstate.edu:${PORT}/delete-Employee`, {
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


async function updateEmployee(edit_button, emp_id){
    // enable editing of inputs
    document.getElementById('`employees-editFirstName-' + emp_id + '`').disabled = false
    document.getElementById('`employees-editLastName-' + emp_id + '`').disabled = false
    document.getElementById('`employees-editPosition-' + emp_id + '`').disabled = false
    document.getElementById('`employees-editPhoneNumber-' + emp_id + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function(event) {
        let payload = {}
        payload.employeeID = emp_id
        payload.fname = document.getElementById('`employees-editFirstName-' + emp_id + '`').value
        payload.lname = document.getElementById('`employees-editLastName-' + emp_id + '`').value
        payload.position = document.getElementById('`employees-editPosition-' + emp_id + '`').value
        payload.phoneNumber = document.getElementById('`employees-editPhoneNumber-' + emp_id + '`').value
        
        const response = await fetch(`http://${SERVER}.engr.oregonstate.edu:${PORT}/update-Employee`, {
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