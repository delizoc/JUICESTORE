// call functions on page load
addpurchaseOrder()

function addpurchaseOrder(){
    document.getElementById("add-purchaseOrder-btn").addEventListener("click", function(event){
        event.preventDefault()
        let oID = document.querySelector('#orderID-input-purchaseOrders');
        let iID = document.querySelector('#itemID-input-purchaseOrders');

        let req = new XMLHttpRequest();
        let data = {};

        data.orderID = oID.value;
        data.itemID = iID.value;
        // console.log(data)

        req.open("POST", '/insert-purchaseOrder', true);
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


async function deletepurchaseOrder(order_id, item_id){
        let payload = {}
        payload.orderID = order_id
        payload.itemID = item_id

        const response = await fetch(`http://${SERVER}:${PORT}/delete-purchaseOrder`, {
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

async function updatepurchaseOrder(edit_button, order_ID, item_ID){
    // enable editing of inputs
    document.getElementById('`puchaseOrders-editOrderID-' + order_ID + '-' + item_ID + '`').disabled = false
    document.getElementById('`purchaseOrders-editItemID-' + order_ID + '-' + item_ID  + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function(event) {
        let payload = {}
        payload.purchaseOrder_id = purchaseOrder_id
        payload.orderID = document.getElementById('`purchaseOrders-editOrderID-' + order_ID + '-' + item_ID + '`').value
        payload.itemID = document.getElementById('`purchaseOrders-editItemID-' + order_ID + '-' + item_ID  + '`').value
        
        const response = await fetch(`http://${SERVER}:${PORT}/update-purchaseOrder`, {
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