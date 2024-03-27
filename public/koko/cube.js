document.getElementById("one").addEventListener("click",performe);

function performe(){
    score++;
    document.getElementById("one").removeEventListener("click",performe);
    document.getElementById("one").id= "";
  addRow();
  addCol();
  random_bg_color();
  set_Function();
}


const addRow = () => {
  let row = document.createElement("tr");
 
  let col_count = document.getElementById("table_id").rows[0].cells.length;
    
  for (let i = 0; i < col_count; i++) {
    let column = document.createElement("td");
    row.appendChild(column);
    document.querySelector("#table_id").appendChild(row);
  
  }
 
};

let addCol = () => {
  var table = document.getElementById("table_id");
  var row = table.getElementsByTagName("tr");
  for (i = 0; i < row.length; i++) {
    var td = document.createElement("td");
    row[i].appendChild(td);
  }
};

function random_bg_color() {
    var x = Math.floor(Math.random() * 256+1);
    var y = Math.floor(Math.random() * 256+1);
    var z = Math.floor(Math.random() * 256+1);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    // document.body.style.background = bgColor;  

    var cells = document.getElementsByTagName('td');

    for(var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = bgColor;
    }
    }

    function set_Function(){
        var cell_array = document.getElementsByTagName('td');
        var cells  = document.getElementById("table_id").rows[0].cells.length;
        col_count = cells*cells;
        console.log(col_count)
        let x = Math.floor((Math.random() * col_count) + 1);
        console.log(x);
        
        cell_array[x].id = "one";   
        document.getElementById('one').addEventListener("click",performe);
    }

 let time = 11, score = 0;

 var stop= setInterval(myTimer, 1000);
 function myTimer() {
    if (time==0) {
        // alert('Your Score :'+score);
        alert('Your Score :'+score)
        time=11;
    }
    time--;
    document.getElementById("demo").innerText=time;
    
  }

  document.getElementById("start").addEventListener("click",()=>{
    location.reload();
  });

