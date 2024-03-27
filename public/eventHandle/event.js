function myFunction_innerHtml() {
    document.getElementById("f1").innerHTML = "I have changed!";
    alert('Text Changed!!');
  }

  function myFunction_Date() {
    document.getElementById("f2").innerHTML = Date();
    alert('Showing Time and Date!!!');
  }
  function mOver(obj) {
    obj.innerHTML = "Thank You";
    alert('Mouse OVER!!!');
  }
  
  function mOut(obj) {
    obj.innerHTML = "Mouse Over Me";
    alert('Mouse Out!!!');
  }
  function mDown(obj) {
    obj.style.backgroundColor = "#1ec5e5";
    obj.innerHTML = "Mouse Down";
   
  }
  
  function mUp(obj) {
    obj.style.backgroundColor="#D94A38";
    obj.innerHTML = "Mouse up";
  }

  function mymessage() {
    alert("This message was triggered from the onload event");
  }

  let vid = document.getElementById("myVideo");
vid.onplay = function() {
  alert(    "The video has started to play");
};
vid.onpause = function(){
    alert(    "The video has paused");
}

function myFunctionkeydown() {
    document.getElementById("demo").innerHTML = "You pressed a key inside the input field";
    alert("Key DownM Alert!!")
  }

  function myFunctionkeyup() {
    let x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
    alert('key up!!')
  }
  