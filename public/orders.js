// call function on page load
addOrder()


async function addOrder() {
  document.getElementById("add-order-btn").addEventListener("click", async function (event) {
    event.preventDefault()
    let oCust = document.querySelector('#customerID-input-orders');
    let oEmp = document.querySelector('#employeeID-input-orders');
    let oItems = document.querySelector('#itemID-input-orders').options;
    let filteredItems = [];

    for (let item of oItems) {
      if (item.selected) {
        console.log(item.value)
        filteredItems.push(item.value);
      }
    }

    if(!filteredItems > 0){
      alert('Please select atleast 1 item');
      return;
    }

    let data = {};

    data.customerID = oCust.value;
    data.employeeID = oEmp.value;

    try {
      const response = await fetch(`http://${SERVER}:${PORT}/insert-Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status == 200) {
        let newOrder = await fetch(`http://${SERVER}:${PORT}/orders-latest`, {
          method: 'GET'
        }
        )
        let json_response = await newOrder.json();

        const newOrders = await fetch(`http://${SERVER}:${PORT}/insert-PurchaseOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({orderId:json_response.rows[0].orderID,filteredItems})
        });
        if (newOrders.status == 200) {location.reload();}
      } else {
        alert("Error - Order was not processed");
      }
    } catch (err) {
      console.log(err)
    }

  })
}

async function deleteOrder(row_id) {
  let payload = {}
  payload.orderID = row_id

  const response = await fetch(`http://${SERVER}:${PORT}/delete-Order`, {
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


async function updateOrder(edit_button, order_id) {
  // enable editing of inputs
  document.getElementById('`orders-editCustomerID-' + order_id + '`').disabled = false
  document.getElementById('`orders-editEmployeeID-' + order_id + '`').disabled = false

  let edit_button_object = document.getElementById(edit_button)
  edit_button_object.innerText = 'Update'
  // upon clicking update, UPDATE request sent and page reloads
  edit_button_object.onclick = async function (event) {
    let payload = {}
    payload.orderID = order_id
    payload.customerID = document.getElementById('`orders-editCustomerID-' + order_id + '`').value
    payload.employeeID = document.getElementById('`orders-editEmployeeID-' + order_id + '`').value

    const response = await fetch(`http://${SERVER}:${PORT}/update-Order`, {
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

