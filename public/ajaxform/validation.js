function validateForm(){
    var fnameVal = document.form1.first_name.value;
    var lnameVal = document.form1.last_name.value;
    var desginationVal = document.form1.deg1.value;
    var emailVal = document.form1.email.value;
    var phoneVal = document.form1.phone_no.value;
    var date_of_birthVal = document.form1.date_of_birth.value;
    var ssc_nameVal = document.form1.ssc_name.value;
    var ssc_passing_yearVal = document.form1.ssc_passing_year.value;
    var ssc_percentageVal = document.form1.ssc_percentage.value;
    var hsc_nameVal = document.form1.hsc_name.value;
    var hsc_passing_yearVal = document.form1.hsc_passing_year.value;
    var hsc_percentageVal = document.form1.hsc_percentage.value;
    var b_course_nameVal = document.form1.b_course_name.value;
    var b_universityVal = document.form1.b_university.value;
    var b_passing_yearVal = document.form1.b_passing_year.value;
    var b_percentageVal = document.form1.b_percentage.value;
    var preference_locationVal = document.form1.preference_location.value;
    var notice_periodVal = document.form1.notice_period.value;
    var expected_ctcVal = document.form1.expected_ctc.value;
    var current_ctcVal = document.form1.current_ctc.value;
    var departmentVal = document.form1.department.value;
   
   
   if (notNullAllowed(fnameVal,lnameVal,desginationVal,emailVal,phoneVal,date_of_birthVal
   ,ssc_nameVal,ssc_passing_yearVal,ssc_percentageVal,
   hsc_nameVal,hsc_passing_yearVal,hsc_percentageVal,
   b_course_nameVal,b_passing_yearVal,b_percentageVal,b_universityVal,preference_locationVal
   ,notice_periodVal,expected_ctcVal,current_ctcVal,departmentVal) == false) {
    return false;
   }
   else{
    return true;
   }
    
  }

  function ValidateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!input.match(validRegex)) {
    var error = document.getElementById('error');
    error.innerText = "Invalid email address!"
    document.form1.email.focus();
    return false;
  } else {
    return true;
  }
}

function ValidateDate(input) {
  var validRegex = /^\d{4}-\d{2}-\d{2}$/; 
  
  if (!input.match(validRegex)) {
    var error = document.getElementById('error');
    error.innerText = "Invalid Date Format.. Please follow YYYY-MM-DD Format!"
    document.form1.date_of_birth.focus();
    return false;
  } else {
    return true;
  }
}

function ValidatePhone(input) {
  var validRegex =  /^\+?([0-9]{3})\)?[ -]?([0-9]{3})[ -]?([0-9]{4})$/
  if (!input.match(validRegex)) {
    var error = document.getElementById('error');
    error.innerText = "Please Enter Valid Phone Number like,(9876543210,9876543210,987 654 3210,987-654-3210)!"
    document.form1.phone_no.focus();
    return false;
  } else {
    return true;
  }
}

function notNullAllowed(fnameVal,lnameVal,desginationVal,emailVal,phoneVal,date_of_birthVal
,ssc_nameVal,ssc_passing_yearVal,ssc_percentageVal,
   hsc_nameVal,hsc_passing_yearVal,hsc_percentageVal,
   b_course_nameVal,b_passing_yearVal,b_percentageVal,b_universityVal,preference_locationVal
   ,notice_periodVal,expected_ctcVal,current_ctcVal,departmentVal) {
if (fnameVal == null || fnameVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "First Name can't be blank!"
  document.form1.first_name.focus();
return false;  
}
else if (lnameVal == null || lnameVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "Last Name can't be blank!"
  document.form1.last_name.focus();
return false;  
}
else if (desginationVal == null || desginationVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "Designation can't be blank!"
  document.form1.deg1.focus();
return false;  
}
else if (emailVal == null || emailVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "Email can't be blank!"
  document.form1.email.focus();
return false;  
}
 else if (ValidateEmail(emailVal) == false) {
  return false;
}
else if (phoneVal == null || phoneVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "Phone can't be blank!"
  document.form1.phone_no.focus();  
return false;  
}
else if (ValidatePhone(phoneVal) == false) {
  return false;
}
else if (date_of_birthVal == null || date_of_birthVal ==""){  
  var error = document.getElementById('error');
  error.innerText = "Date of Birth can't be blank!"
  document.form1.date_of_birth.focus();  
return false;  
}
else if (ValidateDate(date_of_birthVal) == false) {
  return false;
}
else if (ssc_nameVal == null || ssc_nameVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "SSC Details can't be blank!"
  document.form1.ssc_name.focus();  
return false;  
}
else if (ssc_passing_yearVal == null || ssc_passing_yearVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "SSC Details can't be blank!"
  document.form1.ssc_passing_year.focus();  
return false;  
}
else if (ssc_percentageVal == null || ssc_percentageVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "SSC Details can't be blank!"
  document.form1.ssc_percentage.focus();  
return false;  
}
else if (hsc_nameVal == null || hsc_nameVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "HSC Details can't be blank!"
  document.form1.hsc_name.focus();  
return false;  
}
else if (hsc_passing_yearVal == null || hsc_passing_yearVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "HSC Details can't be blank!"
  document.form1.hsc_passing_year.focus();  
return false;  
}
else if (hsc_percentageVal == null || hsc_percentageVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "HSC Details can't be blank!"
  document.form1.hsc_percentage.focus();  
return false;  
}
else if (b_course_nameVal == null || b_course_nameVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "Bechlor Details can't be blank!"
  document.form1.b_course_name.focus();  
return false;  
}
else if (b_universityVal== null || b_universityVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "Bechlor Details can't be blank!"
  document.form1.b_university.focus();  
return false;  
}
else if (b_passing_yearVal == null || b_passing_yearVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "Bechlor Details can't be blank!"
  document.form1.b_passing_year.focus();  
return false;  
}
else if (b_percentageVal == null || b_percentageVal ==""){  
  var error = document.getElementById('error1');
  error.innerText = "Bechloer Details can't be blank!"
  document.form1.b_percentage.focus();  
return false;  
}
else if (preference_locationVal == null || preference_locationVal ==""){  
  var error = document.getElementById('error2');
  error.innerText = "Preference Location can't be blank!"
  document.form1.preference_location.focus();  
return false;  
}
else if (notice_periodVal == null || notice_periodVal ==""){  
  var error = document.getElementById('error2');
  error.innerText = "Notice Period can't be blank!"
  document.form1.notice_period.focus();  
return false;  
}
else if (current_ctcVal == null || current_ctcVal ==""){  
  var error = document.getElementById('error2');
  error.innerText = "Current CTC can't be blank!"
  document.form1.current_ctc.focus();  
return false;  
}
else if (expected_ctcVal == null || expected_ctcVal ==""){  
  var error = document.getElementById('error2');
  error.innerText = "Expected CTC can't be blank!"
  document.form1.expected_ctc.focus();  
return false;  
}
else if (departmentVal == null || departmentVal ==""){  
  var error = document.getElementById('error2');
  error.innerText = "Department can't be blank!"
  document.form1.department.focus();  
return false;  
}
else{
  return true;
}
}

function getId(){
  let id = prompt("Please Enter the user Id..!");
  console.log(id);
  if(id){
    window.location.href=`/update/${id}`
  }
  
}