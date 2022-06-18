function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 let id=document.getElementById("id_row"+no);
 let name=document.getElementById("name_row"+no);
 let color=document.getElementById("price_row"+no);
 
	
 let id_data=id.innerHTML;
 let name_data=name.innerHTML;
 let price_data=price.innerHTML;


	
 id.innerHTML="<input type='text' id='id_text"+no+"' value='"+id_data+"'>";
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"'>";
 price.innerHTML="<input type='text' id='color_text"+no+"' value='"+price_data+"'>";

}

function save_row(no)
{
 let id_val=document.getElementById("id_text"+no).value;
 let name_val=document.getElementById("name_text"+no).value;
 let price_val=document.getElementById("price_text"+no).value;


 document.getElementById("id_row"+no).innerHTML=id_val;
 document.getElementById("name_row"+no).innerHTML=name_val;
 document.getElementById("price_row"+no).innerHTML=price_val;
 

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 let new_id=document.getElementById("new_id").value;
 let new_name=document.getElementById("new_name").value;
 let new_color=document.getElementById("new_price").value;

 
 let table=document.getElementById("data_table");
 let table_len=(table.rows.length)-1;
 let row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='id_row"+table_len+"'>"+new_id+"</td><td id='name_row"+table_len+"'>"+new_name+"</td><td id='price_row"+table_len+"'>"+new_color+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_id").value="";
 document.getElementById("new_name").value="";
 document.getElementById("new_color").value="";
}