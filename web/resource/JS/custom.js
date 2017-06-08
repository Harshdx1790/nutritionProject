var contextPath = ""
 var filterArr = {};
contextPath =   window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
var globalData;
 var entriesFlag = 0;

 var villageGlobalMap = {};
 var entriesFlagCount = 1;
function loginValidation(){
 var user = $("#icon_prefix").val();
 var password = $("#Password").val();
 var District = $("#districtSelectBox").val();


 $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getLoginValidation",
                        data: "user=" + encodeURIComponent(user)+ "&password=" +encodeURIComponent(password)+ "&District=" +encodeURIComponent(District),
                    success: function (response) { 
                        var data = "no";
                       
                        
                        if(response.length<5){
                            alert("User Credentials not Matched!")
                        }
                        else{
                    window.location.href = "/nutrition/landingPage.html";
                        }
                    }})
}

function distirctDropdown(){
    
    $.getJSON("resource/data/District.json",function(district){
//        alert("district"+JSON.stringify(district))
        var htmlvar = "";
        htmlvar+=' <div class="input-field col s12" >';
        htmlvar+="<select id='districtSelectBox'>";
        htmlvar+='<option value="" disabled selected>Choose </option>';
        for(var i in district){
        htmlvar+='<option value="'+district[i]["District"]+'">'+district[i]["District"]+'</option>';
        }
        htmlvar+="</select>";
        htmlvar+="<label class='greenC' style='color:#32CD32;font-size: medium;'>Select District</label>";
        htmlvar+="</div>";
        $("#districtDropDown").html(htmlvar);
        $('select').material_select();
    })
}

function getWelcomeData(){
 var user = $("#icon_prefix").val();
 var password = $("#Password").val();
 var District = $("#districtSelectBox").val();
 $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getWelcomeData",
//                        data: "user=" + encodeURIComponent(user)+ "&password=" +encodeURIComponent(password)+ "&District=" +encodeURIComponent(District),
                    success: function (response) { 
                        welcomeDistrict(JSON.parse(response));
                    }})
}

function welcomeDistrict(data){
   var htmlvar = "";
   htmlvar+='<h5 class="breadcrumbs-title right " style="padding-bottom: 1%">Welcome '+data['user']+'</h5>';
   $("#welcomeUser").html(htmlvar);
   htmlvar = "";
   htmlvar+='<option value="'+data['district']+'" selected>'+data['district']+'</option>';
   $("#selectDistrictBox").html(htmlvar);
   $('select').material_select();
   
   filterArr["district"] = data['district'];
   
   var queryFlag = "getBlockData"
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getBlockData",
                    data: "user=" + encodeURIComponent(data['user'])+ "&district=" +encodeURIComponent(data['district'])+ "&queryFlag=" +encodeURIComponent(queryFlag),
                    success: function (response) { 
                        blockLevelData(JSON.parse(response));
//                        welcomeDistrict(JSON.parse(response));
                    }})

 }

function blockLevelData(data){
    var htmlvar = "";
    for(var i in data){
     htmlvar+='<option value="'+data[i]["BlockName"]+'">'+data[i]["BlockName"]+'</option>';   
    }
    $("#selectBlock").append(htmlvar);
    $('#selectBlock').removeAttr('disabled');
    $('select').material_select();
}

function getprojectData(){
   var block = $("#selectBlock").val();
   filterArr["block"] = block;
   var queryFlag = "projectLevelData"
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getProjectLevelData",
                    data:  "filter=" +encodeURIComponent(JSON.stringify(filterArr))+ "&queryFlag=" +encodeURIComponent(queryFlag),
                    success: function (response) { 
                        projectLevelData(JSON.parse(response));

                    }})
}

function projectLevelData(data){
    var htmlvar = "";
      htmlvar+='<option value="" disabled selected>?????</option>';
    for(var i in data){
     htmlvar+='<option value="'+data[i]["FType"]+'">'+data[i]["FType"]+'</option>';   
    }
    $("#selectProject").html(htmlvar);
    $('#test6').removeAttr('disabled');
    $('select').material_select();
}

function disableProjectInfo(){ 
    if($("#test6").is(':checked')) {
        var project_name = $("#selectBlock").val();
        var htmlvar = "";
        htmlvar +='<i class="material-icons prefix" >work</i>';
        htmlvar +='<input disabled type="text" value="'+project_name+'" id="project_name" >';
        htmlvar +='<label class="greenC" for="project_name" style="color:#32CD32;font-size: medium;"></label>';
        
        $("#project_name_Div").html(htmlvar)
        
    }else{
         var htmlvar = "";
        htmlvar +='<i class="material-icons prefix" >work</i>';
        htmlvar +='<input disabled type="text"  id="project_name" >';
        htmlvar +='<label class="greenC" for="project_name" style="color:#32CD32;font-size: medium;">Project Name</label>';
        $("#project_name_Div").html(htmlvar)
     $('#project_name').removeAttr('disabled');
    }
    $('#selectProject').removeAttr('disabled');
    $('#selectProjectType').removeAttr('disabled');
    $('select').material_select();
   
}

function getPHCData(){
     var prjectType = $("#selectProject").val();
   filterArr["prjectType"] = prjectType;
   var queryFlag = "phcLevelData"
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getProjectLevelData",
                    data:  "filter=" +encodeURIComponent(JSON.stringify(filterArr))+ "&queryFlag=" +encodeURIComponent(queryFlag),
                    success: function (response) { 
//                        projectLevelData(JSON.parse(response));
                    phcLevelData(JSON.parse(response));
                    }})
}
function phcLevelData(data){ 
    var htmlvar = "";
      htmlvar+='<option value="" disabled selected>?????</option>';
    for(var i in data){
     htmlvar+='<option value="'+data[i]["PHCName"]+'">'+data[i]["PHCName"]+'</option>';   
    }
    $("#selectPHCName").html(htmlvar);
    $('#selectPHCName').removeAttr('disabled');
    $('select').material_select();
}
function getSubCentreData(){
     var PHCName = $("#selectPHCName").val();
   filterArr["PHCName"] = PHCName;
   var queryFlag = "subcenterLevelData"
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getProjectLevelData",
                    data:  "filter=" +encodeURIComponent(JSON.stringify(filterArr))+ "&queryFlag=" +encodeURIComponent(queryFlag),
                    success: function (response) { 
//                        projectLevelData(JSON.parse(response));
                    subCentreData(JSON.parse(response));
                    }})
}
function subCentreData(data){ 
    var htmlvar = "";
      htmlvar+='<option value="" disabled selected>?????</option>';
    for(var i in data){
     htmlvar+='<option value="'+data[i]["SubCenter"]+'">'+data[i]["SubCenter"]+'</option>';   
    }
    $("#selectSubcenter").html(htmlvar);
    $('#selectSubcenter').removeAttr('disabled');
    $('select').material_select();
}
function getVillageData(){
     $( "#dialogEntry" ).trigger( "click" );
     var SubCenter = $("#selectSubcenter").val();
   filterArr["SubCenter"] = SubCenter;
   var queryFlag = "villageLevelData"
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=getProjectLevelData",
                    data:  "filter=" +encodeURIComponent(JSON.stringify(filterArr))+ "&queryFlag=" +encodeURIComponent(queryFlag),
                    success: function (response) { 
//                        projectLevelData(JSON.parse(response));
                    villageLveleData(JSON.parse(response));
                    }})
}
function villageLveleData(data){ 
    var htmlvar = "";
    globalData = data;
      htmlvar+='<option value="" disabled selected>?????</option>';
    for(var i in data){
     htmlvar+='<option value="'+data[i]["Village"]+'">'+data[i]["Village"]+'</option>';   
    }
    $("#selectVillage").html(htmlvar);
    $('#selectVillage').removeAttr('disabled');
    $('select').material_select();
}

function datePickerLabel(){ alert("hello")
    var htmlvar = "";
    
    $("#datePickerLabel").html("");
}

function insertData(){
    var district = $("#selectDistrictBox").val();
    var block = $("#selectBlock").val();
    var subcenter = $("#selectSubcenter").val();
    var project_name = $("#project_name").val();
    var ProjectType = $("#selectProjectType").val();
    var PHCName = $("#selectPHCName").val();
    var mOfficerName = $("#Medical-characters-demo").val();
    var mOfficerMobile = $("#phone-Medical").val();
    var cOfficerName = $("#Child-characters-demo").val();
    var cOfficerMobile = $("#phone-Child").val();
    var ANMName = $("#characters-demo").val();
    var ANMMobile = $("#phone-ANM").val();
    var Village = $("#selectVillage").val();
    var villageAssemblyName = $("#villageAssemblyName").val();
    var villageHeadName = $("#villageHeadName").val();
    var villageHeadMobile = $("#village_Head_Mobile").val();
    var awwName = $("#awwName").val();
    var awwMobile = $("#awwMobile").val();
    var ashaName = $("#ashaName").val();
    var ashaMobile = $("#ashaMobile").val();
    var ServantName = $("#Servant_Name").val();
    var Servantmobile = $("#Servant_mobile").val();
    var datePicker = $("#datePicker").val();
    var Place = $("#Place").val();
    var insertDataMap = {};
    var insertDataMap1 = {};
    var insertDataArr = [];
    insertDataMap["district"] = district;
    insertDataMap["block"] = block;
    insertDataMap["subcenter"] = subcenter;
    insertDataMap["project_name"] = project_name;
    insertDataMap["ProjectType"] = ProjectType;
    insertDataMap["PHCName"] = PHCName;
    insertDataMap["mOfficerName"] = mOfficerName;
    insertDataMap["mOfficerMobile"] = mOfficerMobile;
    insertDataMap["cOfficerName"] = cOfficerName;
    insertDataMap["cOfficerMobile"] = cOfficerMobile;
    insertDataMap["ANMName"] = ANMName;
    insertDataMap["ANMMobile"] = ANMMobile;
    insertDataMap["datePicker"] = datePicker;
    
    insertDataMap1["district"] = district;
    insertDataMap1["block"] = block;
    insertDataMap1["Village"] = Village;
    insertDataMap1["villageAssemblyName"] = villageAssemblyName;
    insertDataMap1["villageHeadName"] = villageHeadName;
    insertDataMap1["villageHeadMobile"] = villageHeadMobile;
    insertDataMap1["awwName"] = awwName;
    insertDataMap1["awwMobile"] = awwMobile;
    insertDataMap1["ashaName"] = awwName;
    insertDataMap1["ashaMobile"] = ashaMobile;
    insertDataMap1["ServantName"] = ServantName;
    insertDataMap1["Servantmobile"] = Servantmobile;
    insertDataMap1["datePicker1"] = datePicker;
    insertDataMap1["Place"] = Place;
    insertDataMap1["subcenter"] = subcenter;
    insertDataMap1["datePicker"] = datePicker;
    var tableFlag = "nutrition_data" ;
    var tableFlag1 = "nutrition_village_data" ;
//    alert(JSON.stringify(Object.keys(villageGlobalMap["1"][0])))
    var keys = Object.keys(villageGlobalMap["1"][0]);
    
    var htmlvar = "";
        htmlvar+="<table class='bordered striped highlight centered responsive-table'>";
        htmlvar+="<thead>";
        htmlvar+="<tr style='background-color: royalblue;color: white;'>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>जिला</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>विकास खण्ड / ब्लॉक</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>गांव का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>ग्राम सभा (पंचायत ) का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>ग्राम प्रधान का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>ग्राम प्रधान का मोबाइल न</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>आंगनवाड़ी कार्यकत्री का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>आंगनवाड़ी कार्यकत्री का मोबाइल न</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>आशा का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>आशा का मोबाइल न</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>मुख्य सेविका का नाम</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>मुख्य सेविका का मोबाइल न.</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>वी० एच ० एन ० डी ० का दिन</th>"
        htmlvar+="<th style='border: 1px solid #e7e7e7;'>वी० एच ० एन ० डी ० का स्थान</th>"
        
        htmlvar+="</tr>"
        htmlvar+="</thead>"
    for(var v in villageGlobalMap){
       
       
        htmlvar+="<tr>";
            for(var t in keys){
                if(keys[t]!="subcenter" && keys[t]!="datePicker" )
        htmlvar+="<td style='border: 1px solid #e7e7e7;'>"+villageGlobalMap[v][0][keys[t]]+"</td>";
            }
        htmlvar+="</tr>";
    }
        htmlvar+="</table>";
    
    $("#entryTable").html(htmlvar)
    $( "#dialogEntry2" ).trigger( "click" );
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap))+"&tableFlag=" +encodeURIComponent(tableFlag),
                    success: function (response) { 
//                        $.ajax({
//                    type: "POST",
//                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
//                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap1))+ "&tableFlag=" +encodeURIComponent(tableFlag1),
//                    success: function (response) { 
//                        alert(response)
//    }})
    }})
}
function insertVillageData(){
    var district = $("#selectDistrictBox").val();
    var block = $("#selectBlock").val();
    var subcenter = $("#selectSubcenter").val();
    var project_name = $("#project_name").val();
    var ProjectType = $("#selectProjectType").val();
    var PHCName = $("#selectPHCName").val();
    var mOfficerName = $("#Medical-characters-demo").val();
    var mOfficerMobile = $("#phone-Medical").val();
    var cOfficerName = $("#Child-characters-demo").val();
    var cOfficerMobile = $("#phone-Child").val();
    var ANMName = $("#characters-demo").val();
    var ANMMobile = $("#phone-ANM").val();
    var Village = $("#selectVillage").val();
    var villageAssemblyName = $("#villageAssemblyName").val();
    var villageHeadName = $("#villageHeadName").val();
    var villageHeadMobile = $("#village_Head_Mobile").val();
    var awwName = $("#awwName").val();
    var awwMobile = $("#awwMobile").val();
    var ashaName = $("#ashaName").val();
    var ashaMobile = $("#ashaMobile").val();
    var ServantName = $("#Servant_Name").val();
    var Servantmobile = $("#Servant_mobile").val();
    var datePicker = $("#datePicker").val();
    var Place = $("#Place").val();
    var insertDataMap = {};
    var insertDataMap1 = {};
    var insertDataArr = [];
    insertDataMap["district"] = district;
    insertDataMap["block"] = block;
    insertDataMap["subcenter"] = subcenter;
    insertDataMap["project_name"] = project_name;
    insertDataMap["ProjectType"] = ProjectType;
    insertDataMap["PHCName"] = PHCName;
    insertDataMap["mOfficerName"] = mOfficerName;
    insertDataMap["mOfficerMobile"] = mOfficerMobile;
    insertDataMap["cOfficerName"] = cOfficerName;
    insertDataMap["cOfficerMobile"] = cOfficerMobile;
    insertDataMap["ANMName"] = ANMName;
    insertDataMap["ANMMobile"] = ANMMobile;
    insertDataMap["datePicker"] = datePicker;
    
    insertDataMap1["district"] = district;
    insertDataMap1["block"] = block;
    insertDataMap1["Village"] = Village;
    insertDataMap1["villageAssemblyName"] = villageAssemblyName;
    insertDataMap1["villageHeadName"] = villageHeadName;
    insertDataMap1["villageHeadMobile"] = villageHeadMobile;
    insertDataMap1["awwName"] = awwName;
    insertDataMap1["awwMobile"] = awwMobile;
    insertDataMap1["ashaName"] = awwName;
    insertDataMap1["ashaMobile"] = ashaMobile;
    insertDataMap1["ServantName"] = ServantName;
    insertDataMap1["Servantmobile"] = Servantmobile;
    insertDataMap1["datePicker1"] = datePicker;
    insertDataMap1["Place"] = Place;
    insertDataMap1["subcenter"] = subcenter;
    insertDataMap1["datePicker"] = datePicker;
    var tableFlag1 = "nutrition_village_data" ;
    $("#villageAssemblyName").val("");
    $("#villageHeadName").val("");
    $("#village_Head_Mobile").val("");
    $("#awwName").val("");
    $("#awwMobile").val("");
    $("#ashaName").val("");
    $("#ashaMobile").val("");
    $("#Servant_Name").val("");
    $("#Servant_mobile").val("");
    $("#Place").val("");
    $("#selectVillage").html("");
    $("#datePicker").html("")
    var htmlvar = "";
    htmlvar+='<option value="" disabled selected>?????</option>';
    for(var i in globalData){
     htmlvar+='<option value="'+globalData[i]["Village"]+'">'+globalData[i]["Village"]+'</option>';   
    }
    $("#selectVillage").html(htmlvar);
    $('#selectVillage').removeAttr('disabled');
    htmlvar = "";
    htmlvar+='<option value=""  selected>?????</option>';
    htmlvar+='<option value=""  selected>चुनाव</option>'
    htmlvar+='<option value="प्रथम बुधवार ">प्रथम बुधवार </option>'
    htmlvar+='<option value="द्वितीय बुधवार ">द्वितीय  बुधवार </option>'
    htmlvar+='<option value="द्वितीयशनिवार ">द्वितीय  शनिवार </option>'
    htmlvar+='<option value="तृतीय बुधवार">तृतीय बुधवार </option>'
    htmlvar+='<option value="तृतीय शनिवार ">तृतीय शनिवार </option>'
    htmlvar+='<option value="चतुर्थ बुधवार">चतुर्थ बुधवार </option>'
    htmlvar+=' <option value="चतुर्थ शनिवार ">चतुर्थ शनिवार </option>'
    htmlvar+=' <option value="अन्य">अन्य</option>'
    $("#datePicker").html(htmlvar)
    $('select').material_select();
     var villageGlobalArr=[];
    if(!(entriesFlagCount>entriesFlag)){
        villageGlobalArr.push(insertDataMap1)
       villageGlobalMap[entriesFlagCount] = villageGlobalArr;
                 $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap1))+ "&tableFlag=" +encodeURIComponent(tableFlag1),
                    success: function (response) { 
                        alert(entriesFlagCount +" Village Data Saved Successfully!")
                        entriesFlagCount++;
    }})
    }else{
        alert(entriesFlag +" entries already saved!")
        $("#submitButton").removeClass("disabled")
        $("#saveButton").prop('disabled', true).addClass('disabled').off( "click" );
    }
    
    
          
}

function logout(){
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=logout",
                    success: function (response) { 
                     window.location.href = contextPath;    
    }})
    
}

function changePassword(){
   var user =  $("#user_name").val();
   var Old_Pwd =  $("#Old_Pwd").val();
   var New_Pwd =  $("#New_Pwd").val();
   var Confirm_Pwd =  $("#Confirm_Pwd").val();
   var tableFlag = "changePassword";
   if(New_Pwd==Confirm_Pwd){
       $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=changePassword",
                    data:  "userID=" +encodeURIComponent(user)+ "&password=" +encodeURIComponent(Old_Pwd)+ "&newPassword=" +encodeURIComponent(New_Pwd)+ "&tableFlag=" +encodeURIComponent(tableFlag),
                    success: function (response) { 
                            alert(response)
        }})
   }else{
       alert("please enter valid password");
   }
}

function confirmPassword(){
    var newPD = $("#New_Pwd").val();
    var confirmPD = $("#Confirm_Pwd").val();
    if(newPD!=confirmPD){
        $("#notConfirmLabel").css("display","block");
        $("#ConfirmLabel").css("display","none");
    }else{
        $("#notConfirmLabel").css("display","none"); 
        $("#ConfirmLabel").css("display","block");
        
    }
    
}

function villageEntriesDetails(){
    entriesFlag = $("#entriesText").val();
    
}