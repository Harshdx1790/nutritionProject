/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var globalManualData = [];
var userDetailsArr = [];
var jsonData =[];
var optionFlag = "";
function switchFunc(id){
    optionFlag = id
    if(id=="manual"){
        $("#Recomend").removeClass("disabled");
        $(".manual").removeAttr("disabled");
        $(".upload").attr("disabled","true");
        $(".manual").removeClass("disabled");
        $(".uploadDiv").css("background-color","#dfdfdf")
        $("#tableDiv").html("");
    }else{
        $(".manual").addClass("disabled");
        $(".manual").attr("disabled","true")
        $(".upload").removeAttr("disabled");
        $(".uploadDiv").css("background-color","#fff")
        $(".uploadDiv").css("color","#fff")
    }

}

function browseCSV(path){
    var theFiles = path.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath;
    
    var directory = document.getElementById("file-7"); 
    $.get("resource/data/UploadCSVOutput.csv",function(data){
        jsonData = csvJSON(data)
    })
    $("#Recomend").removeClass("disabled");
}

function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
   
    for (var i = 1; i < lines.length-1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
        
        obj[headers[j].toString().replace("\r","")] = currentline[j].replace("\r","");
    }
    result.push(obj);
    }
    return result; //JavaScript object
//    return JSON.stringify(result); //JSON
}

function buildTable(data){ 
    $("#tableDiv").html("");
    $('#floatBarsG').css("display","block"); 
    var key = Object.keys(data[0]);
    var htmlvar ="";
    htmlvar +="<table id='tableid' class='table cell-border compact hover stripe' >"
    htmlvar +="<thead>"
    htmlvar +="<tr id='trtable' style='background-color:#1e88e5;color:white'>"
    for(var k in key){
    htmlvar +="<th>"+key[k].toString().replace("_"," ").replace("_"," ")+"</th>"
    }
    htmlvar +="</tr>"
    htmlvar +="</thead>"
    htmlvar +="<tbody>"
    for(var i in data){
    htmlvar +="<tr>"
        for(var j in key){
         
    htmlvar +="<td>"+data[i][key[j]]+"</td>"
        }
    htmlvar +="</tr>"
    }
    htmlvar +="</tbody>"
    htmlvar +="</table>"
    setTimeout(function(){
    $('#floatBarsG').css("display","none");
    $("#tableDiv").html(htmlvar);
    $('#tableid').DataTable({
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
//    $("#trtable").attr("title",);
    }, 5000);
    
}

function recommend(){
    if(optionFlag =="upload"){
       buildTable(jsonData)
    }else{
    
 var investor_id = $("#Investor_ID").val();
 var Current_Scheme = $("#Current_Scheme").val();
 var Occupation_Type = $("#Occupation_Type").val();
 var State = $("#State").val();
 var Age = $("#Age").val();
 var Last_Transaction_Amt = $("#Last_Transaction_Amt").val();
 var Last_Transaction_Date = $("#Last_Transaction_Date").val();
 
 $.get("resource/data/EnterValues.csv",function(data){
    jsonData =  csvJSON(data)
    console.log(JSON.stringify(jsonData))
    for(var i in jsonData){
     var dataMap = {}; 
     
     dataMap["S.No:"] = jsonData[i]["S.No:"];
     dataMap["investor_id"] = investor_id;
     dataMap["Recommended scheme"] = jsonData[i]["Recommended scheme"];
     dataMap["Score Card (Lower the better)"] = jsonData[i]["Score Card (Lower the better)"];
     dataMap["Intervention Time (In Days)"] = jsonData[i]["Intervention Time (In Days)"];
     
     globalManualData.push(dataMap);
    }
 
 buildTable(globalManualData)
 })
 
}
}

function userDetailsInfo(){
    $("#upload").removeAttr("disabled")
    $("#manual").removeAttr("disabled")
        var userName = $("#user_name").val();
    var password = $("#password").val();
    var htmlvar = "";
//    alert(userName+""+password);
    $.getJSON("resource/json/userInfo.json",function(data){
        var userDetailsMap = {};
        var counter = 0;
       for(var i in data){
           
           if(data[i]["Username"]==userName && data[i]["password"]==password){
               userDetailsMap["Username"] = userName;
               userDetailsMap["password"] = password;
               userDetailsArr.push(userDetailsMap)
               htmlvar += "<div >";
               htmlvar += "<a class='dropdown-button ' href='#' data-activates='dropdown1'>"+data[i]["Username"]+"</a>";
               htmlvar += " <ul id='dropdown1' class='dropdown-content'  style='font-size: smaller;'>";
               htmlvar += " <li></li>";
               htmlvar += " <li style='border-bottom: 1px solid #d4d4d4;'><a align='center' style=''><i class='material-icons prefix'>account_circle</i> "+data[i]["Username"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>First Name: "+data[i]["firstName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>Last Name: "+data[i]["lastName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'><i class='material-icons prefix'>phone</i> "+data[i]["Mobile"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: smaller;'><i class='material-icons prefix'>email</i> "+data[i]["Email"]+"</a></li>";
               htmlvar += "</ul>";
               htmlvar += "</div>";
               document.cookie = JSON.stringify(userDetailsArr);
               $("#userLoginUI2").html(htmlvar);
               $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
               $(".hideClass").css("display","none");
               $("#userLoginUI1").css("display","block");
               $("#userLoginUI2").css("display","block");
               counter++;
              break;
           }else{
            
           }
       }
       if(counter==0){
           alert("user credentials not matched!")
       }
    });
}