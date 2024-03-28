var nextbtn = Array.from(document.getElementsByClassName('press'));
var prevbtn = Array.from(document.getElementsByClassName('press1'));
var uid,sid,cid,wid,lid1,lid2,lid3,tid1,tid2,tid3,tid4,rid,prid;

nextbtn.map((next)=>{

    next.addEventListener('click',async()=>{
        let id =next.getAttribute('id');

        let basic_details_section = document.getElementById("basic_details");
            let education_details_section = document.getElementById("education_details");
            let work_experience_section = document.getElementById("work_experience");
            let language_section = document.getElementById("language");
            let technology_section = document.getElementById("technology");
            let references_section = document.getElementById("references");
            let preferences_section = document.getElementById("preferences");

            let basic_details_tab = document.getElementById("0");
            let education_details_tab = document.getElementById("1");
            let work_experience_tab = document.getElementById("2");
            let language_tab = document.getElementById("3");
            let technology_tab = document.getElementById("4");
            let references_tab = document.getElementById("5");
            let preferences_tab = document.getElementById("6");
      
        if (id=="next1") {
            uid =await basicDetails();
            basic_details_section.classList.remove('active');
            education_details_section.classList.add('active');
            basic_details_tab.classList.remove('active');
            education_details_tab.classList.add('active');

        }
       if (id == "next2") {
          await educationDetails(uid);
          education_details_section.classList.remove('active');
          work_experience_section.classList.add('active');
          education_details_tab.classList.remove('active');
          work_experience_tab.classList.add('active');

        }
       if (id == "next3") {
             workExperience(uid);
            work_experience_section.classList.remove('active');
                language_section.classList.add('active');
                work_experience_tab.classList.remove('active');
                language_tab.classList.add('active');

        }
       if (id == "next4") {
             language(uid); 
            language_section.classList.remove('active');
            technology_section.classList.add('active');
            language_tab.classList.remove('active');
            technology_tab.classList.add('active');

        }
       if (id == "next5") {
             technology(uid); 
             technology_section.classList.remove('active');
                references_section.classList.add('active');
                technology_tab.classList.remove('active');
                references_tab.classList.add('active');
        }
       if (id == "next6") {
             references(uid); 
            references_section.classList.remove('active');
            preferences_section.classList.add('active');
            references_tab.classList.remove('active');
            preferences_tab.classList.add('active');

        }
     if (id == "next7") {
             preferences(uid); 

        }
    })
    
})

prevbtn.map((next)=>{

    next.addEventListener('click',async()=>{
        let id =next.getAttribute('id');

        let basic_details_section = document.getElementById("basic_details");
            let education_details_section = document.getElementById("education_details");
            let work_experience_section = document.getElementById("work_experience");
            let language_section = document.getElementById("language");
            let technology_section = document.getElementById("technology");
            let references_section = document.getElementById("references");
            let preferences_section = document.getElementById("preferences");

            let basic_details_tab = document.getElementById("0");
            let education_details_tab = document.getElementById("1");
            let work_experience_tab = document.getElementById("2");
            let language_tab = document.getElementById("3");
            let technology_tab = document.getElementById("4");
            let references_tab = document.getElementById("5");
            let preferences_tab = document.getElementById("6");
      
       
       if (id == "prev2") {
          education_details_section.classList.remove('active');
          education_details_tab.classList.remove('active');
          basic_details_section.classList.add('active');
          basic_details_tab.classList.add('active');

        }
      else if (id == "prev3") { 
            work_experience_section.classList.remove('active');
            work_experience_tab.classList.remove('active');
            education_details_section.classList.add('active');
            education_details_tab.classList.add('active');

        }
     else  if (id == "prev4") {
            language_section.classList.remove('active');
            language_tab.classList.remove('active');
            work_experience_section.classList.add('active');
            work_experience_tab.classList.add('active');

        }
     else  if (id == "prev5") {
            technology_section.classList.remove('active');
            technology_tab.classList.remove('active');
            language_section.classList.add('active');
            language_tab.classList.add('active');
        }
    else   if (id == "prev6") {    
            references_section.classList.remove('active');
            references_tab.classList.remove('active');
            technology_section.classList.add('active');
            technology_tab.classList.add('active');

        }
   else  if (id == "prev7") {
        preferences_section.classList.remove('active');
        preferences_tab.classList.remove('active');
        references_section.classList.add('active');
        references_tab.classList.add('active');
        }
    })
    
})

    async function basicDetails(){
    first_name = document.getElementById('first_name').value;
    last_name = document.getElementById('last_name').value;
    deg1 = document.getElementById('deg1').value;
    address_1 = document.getElementById('address_1').value;
    address_2 = document.getElementById('address_2').value;
    email = document.getElementById('email').value;
    phone_number = document.getElementById('phone_number').value;
    city = document.getElementById('city').value;
    state = document.getElementById('state').value;
    relationship = document.getElementById('relationship').value;
    zip_code = document.getElementById('zip_code').value;
    date_of_birth = document.getElementById('date_of_birth').value;
    gender = document.getElementsByName('gender');
    let genderValue ;

    var basic_details;
    for (let index = 0; index < gender.length; index++) {
        
        if (gender[index].checked) {
            genderValue =gender[index].value;
        }
    }

    if (uid != undefined) {
         basic_details ={
            first_name : first_name,
            last_name : last_name,
            deg1 :deg1,
            address_1 : address_1,
            address_2 :address_2,
            email : email,
            phone_number : phone_number,
            gender : genderValue,
            city : city,
            state : state,
            relationship :relationship,
            zip_code :zip_code,
            date_of_birth :date_of_birth,
            uid : uid
        }
    }
    else{
        basic_details ={
            first_name : first_name,
            last_name : last_name,
            deg1 :deg1,
            address_1 : address_1,
            address_2 :address_2,
            email : email,
            phone_number : phone_number,
            gender : genderValue,
            city : city,
            state : state,
            relationship :relationship,
            zip_code :zip_code,
            date_of_birth :date_of_birth
        }
    }
  
    console.log(first_name,last_name,deg1,address_1,address_2,email
        ,phone_number,city,state,relationship,zip_code,date_of_birth,genderValue,basic_details);

     let op = await fetch(`http://localhost:3001/home/basic_details`,{
        method : 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(basic_details), 
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
       return data.id;
    })
    console.log(op);
     return op;
    }

    async function educationDetails(uid){

    ssc_name = document.getElementById('ssc_name').value;
    ssc_passing_year = document.getElementById('ssc_passing_year').value;
    ssc_percentage = document.getElementById('ssc_percentage').value;
    hsc_name = document.getElementById('hsc_name').value;
    hsc_passing_year = document.getElementById('hsc_passing_year').value;
    hsc_percentage = document.getElementById('hsc_percentage').value;
    b_course_name = document.getElementById('b_course_name').value;
    b_university = document.getElementById('b_university').value;
    b_passing_year = document.getElementById('b_passing_year').value;
    b_percentage = document.getElementById('b_percentage').value;
    m_course_name = document.getElementById('m_course_name').value;
    m_university = document.getElementById('m_university').value;
    m_passing_year = document.getElementById('m_percentage').value;
    m_percentage = document.getElementById('m_percentage').value;
    userId = uid;
    var education_details;
    console.log(userId);
      if (sid != undefined && cid != undefined  ) {
        education_details = {
            ssc_name : ssc_name,
            ssc_passing_year : ssc_passing_year,
            ssc_percentage : ssc_percentage,
            hsc_name :hsc_name,
            hsc_passing_year : hsc_passing_year,
            hsc_percentage : hsc_percentage,
            b_course_name : b_course_name,
            b_university :b_university,
             b_passing_year : b_passing_year,
             b_percentage : b_percentage,
             m_course_name : m_course_name,
             m_university : m_university,
             m_passing_year  : m_passing_year,
             m_percentage : m_percentage,
             id : userId ,
             sid :sid,
             cid :cid
         }
      }  
      else{
        education_details = {
            ssc_name : ssc_name,
            ssc_passing_year : ssc_passing_year,
            ssc_percentage : ssc_percentage,
            hsc_name :hsc_name,
            hsc_passing_year : hsc_passing_year,
            hsc_percentage : hsc_percentage,
            b_course_name : b_course_name,
            b_university :b_university,
             b_passing_year : b_passing_year,
             b_percentage : b_percentage,
             m_course_name : m_course_name,
             m_university : m_university,
             m_passing_year  : m_passing_year,
             m_percentage : m_percentage,
             id : userId 
         }
      }
   

    console.log(education_details);

    let op1 = await fetch(`http://localhost:3001/home/education_details`,{
        method : 'post',
        headers: {'Content-Type':'application/json' },
        body: JSON.stringify(education_details), 
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
       sid =data.sid;
       cid = data.cid;
    })
   console.log(sid,cid);
}

    async function workExperience(uid){
        company_name = document.getElementById('company_name').value;
        deg2 = document.getElementById('deg2').value;
        from = document.getElementById('from').value;
        to = document.getElementById('to').value;
        userId = uid;
        console.log(userId);
        
        if (wid != undefined) {
            var work_experience = {
                company_name : company_name,
                deg2 : deg2,
                from : from,
                to : to,
                id : userId,
                wid:wid
               }
        }
        else{
            var work_experience = {
                company_name : company_name,
                deg2 : deg2,
                from : from,
                to : to,
                id : userId
               }
        }
        

         console.log(work_experience);

         let op2 = await fetch(`http://localhost:3001/home/work_experience`,{
            method : 'post',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(work_experience), 
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
           wid =data.wid;
        })
       console.log(wid);

    }

    async function language(uid){
        hindi = document.getElementById('hindi').value;
        english = document.getElementById('english').value;
        gujrati = document.getElementById('gujrati').value;
        hindiclass = document.getElementsByClassName('hindi');
        englishclass = document.getElementsByClassName('english');
        gujraticlass = document.getElementsByClassName('gujrati');
        let hindiread,hindiwrite,hindispeak;
        let englishread,englishwrite,englishspeak;
        let gujratiread,gujratiwrite,gujratispeak;
  
        for (let i = 0; i < hindiclass.length; i++) {
          if (hindiclass[i].value == "read" && hindiclass[i].checked) {
                hindiread = hindiclass[i].value;
          }
          
           if (hindiclass[i].value == "write" && hindiclass[i].checked) {
            hindiwrite = hindiclass[i].value;
            }
             if (hindiclass[i].value == "speak" && hindiclass[i].checked) {
                hindispeak = hindiclass[i].value;
            }
            
        }

        for (let i = 0; i < englishclass.length; i++) {
            if (englishclass[i].value == "read" && englishclass[i].checked) {
                  englishread = englishclass[i].value;
            }
          
             if (englishclass[i].value == "write" && englishclass[i].checked) {
              englishwrite = englishclass[i].value;
              }
             
               if (englishclass[i].value == "speak" && englishclass[i].checked) {
                  englishspeak = englishclass[i].value;
              }
             
          }

          for (let i = 0; i < gujraticlass.length; i++) {
            if (gujraticlass[i].value == "read" && gujraticlass[i].checked) {
                  gujratiread = gujraticlass[i].value;
            }
           
             if (gujraticlass[i].value == "write" && gujraticlass[i].checked) {
              gujratiwrite = gujraticlass[i].value;
              }
            
               if (gujraticlass[i].value == "speak" && gujraticlass[i].checked) {
                  gujratispeak = gujraticlass[i].value;
              }
              
          }
        
        userId = uid;
        console.log(userId);
        if (lid1 != undefined || lid2 == undefined || lid3 ==undefined) {
            var language = {
                hindi : hindi,
                hindiread : hindiread,
                hindiwrite : hindiwrite,
                hindispeak : hindispeak,
                english :  english,
                englishread : englishread,
                englishwrite : englishwrite,
                englishspeak : englishspeak,
                gujrati : gujrati,
                gujratiread : gujratiread,
                gujratiwrite : gujratiwrite,
                gujratispeak : gujratispeak,
                id : userId,
                lid1 :lid1,
                lid2 : lid2,
                lid3 : lid3
               }
        }
        else{
            var language = {
                hindi : hindi,
                hindiread : hindiread,
                hindiwrite : hindiwrite,
                hindispeak : hindispeak,
                english :  english,
                englishread : englishread,
                englishwrite : englishwrite,
                englishspeak : englishspeak,
                gujrati : gujrati,
                gujratiread : gujratiread,
                gujratiwrite : gujratiwrite,
                gujratispeak : gujratispeak,
                id : userId
               }
        }
        

         console.log(language);

         let op3 = await fetch(`http://localhost:3001/home/language`,{
            method : 'post',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(language), 
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
           lid1 =data.lid1;
           lid2 =data.lid2;
           lid3 =data.lid3;
        })
       console.log(lid1,lid2,lid3);
    }

    async function technology(uid){
        php = document.getElementById('php').value;
        phplevel = document.getElementsByClassName('phplevel');
        mysql = document.getElementById('mysql').value;
        mysqllevel = document.getElementsByClassName('mysqllevel');
        laravel = document.getElementById('laravel').value;
        laravellevel = document.getElementsByClassName('laravellevel');
        oracle = document.getElementById('oracle').value;
        oraclelevel = document.getElementsByClassName('oraclelevel');

        let phpval,mysqval,laravelval,oracleval;

        for (let i = 0; i < phplevel.length; i++) {
          
            if (phplevel[i].checked) {
                phpval = phplevel[i].value;
            }
        }

        for (let i = 0; i < mysqllevel.length; i++) {
          
            if (mysqllevel[i].checked) {
                mysqval = mysqllevel[i].value;
            }
        }

        for (let i = 0; i < laravellevel.length; i++) {
          
            if (laravellevel[i].checked) {
                laravelval = laravellevel[i].value;
            }
        }

        for (let i = 0; i < oraclelevel.length; i++) {
          
            if (oraclelevel[i].checked) {
                oracleval = oraclelevel[i].value;
            }
        }


        userId = uid;
        console.log(userId);
        // console.log(phplevel,mysqllevel,oraclelevel,laravellevel);
        if (tid1 != undefined || tid2 != undefined || tid3 != undefined || tid4 != undefined) {
            var technology = {
                php : php,
                phplevel : phpval,
                mysql : mysql,
                mysqllevel : mysqval,
                laravel : laravel,
                laravellevel : laravelval,
                oracle : oracle,
                oraclelevel : oracleval,
                id : userId,
                tid1 :tid1,
                tid2 : tid2,
                tid3 : tid3,
                tid4 : tid4
             } 
        }else{
            var technology = {
                php : php,
                phplevel : phpval,
                mysql : mysql,
                mysqllevel : mysqval,
                laravel : laravel,
                laravellevel : laravelval,
                oracle : oracle,
                oraclelevel : oracleval,
                id : userId
             } 
        }
      

         console.log(technology);

         let op3 = await fetch(`http://localhost:3001/home/technology`,{
            method : 'post',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(technology), 
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
           tid1 =data.tid1;
           tid2 =data.tid2;
           tid3 =data.tid3;
           tid4 =data.tid4;
        })
       console.log(tid1,tid2,tid3,tid4);
    }

    async function references(uid){
        ref_name = document.getElementById('ref_name').value;
        ref_contact_no = document.getElementById('ref_contact_no').value;
        relation = document.getElementById('relation').value;
        
        userId = uid;
        console.log(userId);
      
        if (rid != undefined) {
            var references = {
                ref_name : ref_name,
                ref_contact_no : ref_contact_no,
                relation : relation,
                id : userId,
                rid:rid
             }
        }
        else{
            var references = {
                ref_name : ref_name,
                ref_contact_no : ref_contact_no,
                relation : relation,
                id : userId
             }
        }
       

         console.log(references);

         let op4 = await fetch(`http://localhost:3001/home/references`,{
            method : 'post',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(references) 
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
           rid =data.rid;
        })
       console.log(rid);
    }

    async function preferences(uid){
        preference_location = document.getElementById('preference_location').value;
        notice_period = document.getElementById('notice_period').value;
        current_ctc = document.getElementById('current_ctc').value;
        exp_ctc = document.getElementById('exp_ctc').value;
        department = document.getElementById('department').value;
        
        userId = uid;
        console.log(userId);
      
        if (prid != undefined) {
            var preferences = {
                preference_location : preference_location ,
                notice_period : notice_period,
                current_ctc : current_ctc,
                exp_ctc : exp_ctc,
                department : department,
                id : userId,
                prid : prid
             }
        }
        else
        {
            var preferences = {
                preference_location : preference_location ,
                notice_period : notice_period,
                current_ctc : current_ctc,
                exp_ctc : exp_ctc,
                department : department,
                id : userId
             }
        }
        

         console.log(preferences);

         let op4 = await fetch(`http://localhost:3001/home/preferences`,{
            method : 'post',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(preferences), 
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            prid =data.prid;
        })
       console.log(prid);
    }

    