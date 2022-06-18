// call functions on page load
addpurchaseOrder()

const createOrder = async (order, item) => {
    try {
        const newOrders = await fetch(`http://${SERVER}:${PORT}/insert-PurchaseOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId: order, filteredItems: [item] })
        });
        return newOrders;
    } catch (error) {
        window.alert("Cannot add duplicate items to an order");
        console.log(error)
        return { status: "fail" };
    }
}

function addpurchaseOrder() {
    document.getElementById("add-purchaseOrder-btn").addEventListener("click", function (event) {
        event.preventDefault();
        let oID = document.querySelector('#orderID-input-purchaseOrders');
        let iID = document.querySelector('#itemID-input-purchaseOrders');
        let data = {};

        data.orderID = oID.value;
        data.itemID = iID.value;
        createOrder(data.orderID, data.itemID).then((res) => {
            if (res.status >= 200 && res.status < 400) {
                window.location.reload(true);
            }
        }).catch((err) => {
            alert("Can't add a duplicate item to an order");
        })
    });
}



async function deletepurchaseOrder(order_id, item_id) {
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

async function updatePurchaseOrder(edit_button, order_ID, item_ID) {
    // enable editing of inputs
    console.log(order_ID, item_ID)
    console.log(document.getElementById('`puchaseOrders-editOrderID-' + order_ID + '-' + item_ID + '`'))
    document.getElementById('`puchaseOrders-editOrderID-' + order_ID + '-' + item_ID + '`').disabled = false
    document.getElementById('`purchaseOrders-editItemID-' + order_ID + '-' + item_ID + '`').disabled = false
    let edit_button_object = document.getElementById(edit_button)
    edit_button_object.innerText = 'Update'
    // upon clicking update, UPDATE request sent and page reloads
    edit_button_object.onclick = async function (event) {
        let payload = {}
        payload.new_orderID = document.getElementById('`purchaseOrders-editOrderID-' + order_ID + '-' + item_ID + '`').value
        payload.new_itemID = document.getElementById('`purchaseOrders-editItemID-' + order_ID + '-' + item_ID + '`').value
        payload.old_orderID = order_ID
        payload.old_itemID = item_ID
        const response = await fetch(`http://${SERVER}:${PORT}/update-purchaseOrder`,
            {
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