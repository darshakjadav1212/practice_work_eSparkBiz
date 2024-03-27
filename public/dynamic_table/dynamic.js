document.querySelector("#add_row").addEventListener("click", () => {
    addRow();
    }); 
    
   
    const addRow = () => {
    let row = document.createElement("tr");

        let col_count  = document.getElementById('table_id').rows[0].cells.length;
        // console.log(col_count);
       
for(let i=0;i<col_count;i++){
    let column1 = document.createElement("td");
    const column1text = document.createTextNode(``);
    column1.appendChild(column1text);
    row.appendChild(column1);
    document.querySelector("#table_id").appendChild(row);
}
    };
    

    document.querySelector("#remove_row").addEventListener("click",() => {
        removeRow();
    });

    let removeRow = () => {
        var table = document.getElementById("table_id");
        var row =table.rows.length;
        if (row>2) {
            table.deleteRow(-1);
        }
        
    }


    document.querySelector("#add_col").addEventListener("click",() => {
        addCol();
    });

    let addCol = () => {

        var table = document.getElementById("table_id");
        var row = table.getElementsByTagName("tr");
        for (i = 0; i < row.length; i++) {
        var td = document.createElement('td');

        const text = document.createTextNode(``);
        td.appendChild(text);

        row[i].appendChild(td);
      }
        }

        document.querySelector("#remove_col").addEventListener("click",() => {
            removeCol();
        });

        let removeCol = () => {
            let col_count  = document.getElementById('table_id').rows[0].cells.length;
            if (col_count>2) {
                document.querySelectorAll('tr').forEach(row => row.deleteCell(0));
            }
           
        }
