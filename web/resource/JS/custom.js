var contextPath = ""
 var filterArr = {};
contextPath =   window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
var globalData;
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
        htmlvar+="<label style='font-size: medium;'>Select District</label>";
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
        htmlvar +='<label for="project_name" style="font-size: medium;"></label>';
        
        $("#project_name_Div").html(htmlvar)
        
    }else{
         var htmlvar = "";
        htmlvar +='<i class="material-icons prefix" >work</i>';
        htmlvar +='<input disabled type="text"  id="project_name" >';
        htmlvar +='<label for="project_name" style="font-size: medium;">Project Name</label>';
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
    
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap))+"&tableFlag=" +encodeURIComponent(tableFlag),
                    success: function (response) { 
                        $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap1))+ "&tableFlag=" +encodeURIComponent(tableFlag1),
                    success: function (response) { 
                        alert(response)
    }})
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
    htmlvar+='<option value="प�?रथम ब�?धवार ">प�?रथम ब�?धवार </option>'
    htmlvar+='<option value="प�?रथम शनिवार ">प�?रथम शनिवार </option>'
    htmlvar+='<option value="द�?वितीय ब�?धवार ">द�?वितीय  ब�?धवार </option>'
    htmlvar+='<option value="द�?वितीयशनिवार ">द�?वितीय  शनिवार </option>'
    htmlvar+='<option value="तृतीय ब�?धवार ">तृतीय ब�?धवार </option>'
    htmlvar+='<option value="तृतीय शनिवार ">तृतीय शनिवार </option>'
    htmlvar+='<option value="चत�?र�?थ ब�?धवार ">चत�?र�?थ  ब�?धवार </option>'
    htmlvar+=' <option value="चत�?र�?थ शनिवार ">चत�?र�?थ  शनिवार </option>'
    htmlvar+=' <option value="अन�?य">अन�?य</option>'
    $("#datePicker").html(htmlvar)
    $('select').material_select();
    
    
                    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=setInsertLevelData",
                    data:  "insertData=" +encodeURIComponent(JSON.stringify(insertDataMap1))+ "&tableFlag=" +encodeURIComponent(tableFlag1),
                    success: function (response) { 
                        
    			alert("Village Data Saved Successfully!")
    }})
}

function logout(){
    $.ajax({
                    type: "POST",
                    url:  contextPath+"/AdminSubmit.do?parameter=logout",
                    success: function (response) { 
                     window.location.href = contextPath;    
    }})
    
}