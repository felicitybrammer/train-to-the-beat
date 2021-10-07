var folderList=[];
var dragitem;
/**click function for add folder*/
document.getElementById('addFolder').onclick = function addFolder(){
// console.log("you clicked me, add folder");
var folderName = $('.folderName').val();//get folder name
document.querySelector('.folderName').value = '';
if(folderName.length==0){
    var errormessage = "please enter a valid name";
    var messagebox = document.getElementById("messagebox");
    messagebox.innerHTML = errormessage;
    messagebox.setAttribute("style","color: red; font-size: medium;");
}
else{
var messagebox = document.getElementById("messagebox");
messagebox.innerHTML='';
folderList.push(folderName);
localStorage.setItem("folderList",folderList);
localrefresh();
}
}
/**make sure won't erase history first when refresh the page */
function init(){
  var folderlisttemp = localStorage.getItem("folderList");
if(folderlisttemp!=null){
var temp = folderlisttemp.split(',');
for(var i =0; i<temp.length;i++){
    var fn = temp[i];
    if(fn!=undefined){
      folderList.push(fn);
}
}
}
}
/** let the song added to the new folder
 * change to different folder name of local storage temp[0]
*/
function clickfunction(click_id){
  var id = click_id;
  var tempid = id.split(',');
  var folderid = tempid[0]+tempid[1];
  var tempname = tempid[0];
  var tempartist = tempid[1];
  var select = document.getElementById(folderid+"select");
  var resultfolder = select.options[select.selectedIndex].text;
  console.log(tempid[0]+"artist:"+tempid[1]);
  console.log("folder: "+resultfolder);
  for(var i=0; i<localStorage.length;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
    var songname = temp[1];
    var songartist = temp[2];
    if(songname == tempname && songartist==tempartist){
      localStorage.removeItem(i);
      var templist =[];
      templist.push(resultfolder);
      templist.push(songname);
      templist.push(songartist);
      localStorage.setItem(i,templist);
    }
    }
}
localrefresh();
}
/**refesh local display to let the new folder showing to the dropdown list  */
function localrefresh(){
  var songArea = document.getElementById("songList"); 
  songArea.innerHTML = '';
  var folderArea = document.getElementById("folder");
  folderArea.innerHTML='';
  displaylocal();
  displayfolders();
}
/**display the selection -> drop down list, and clickable submit button
 * input, class name: inputclass
 * option, class name: optionclass
 * select, classname: selectclass
 */
function displayselection(songname,songartist){
  var songArea = document.getElementById("songList");
  var div = document.createElement("div");
  //var form = document.createElement("form");
  //form.setAttribute("id",songname+songartist+"form");
  var label = document.createElement("label");
  label.innerHTML = "select folder";
  var select = document.createElement("select");
  select.setAttribute("class","selectclass");
  select.setAttribute("id",songname+songartist+"select");
  var folderlisttemp = localStorage.getItem("folderList");
  if(folderlisttemp!=null){
  var temp = folderlisttemp.split(',');

  for(var i =0; i<temp.length;i++){
      var folderName = temp[i];
      if(folderName!=undefined){
        var option = document.createElement("option");
        option.setAttribute('value',folderName);
        option.setAttribute('class','optionclass')
        option.innerHTML = folderName;
        select.appendChild(option)
        var input = document.createElement("input");
      input.setAttribute("id",songname+","+songartist+","+"input");
        //console.log(input.id);
      input.setAttribute("onclick","clickfunction(this.id)");
      input.setAttribute("class","inputclass");
      input.setAttribute("type","submit");
      input.setAttribute("value","submit");
      input.setAttribute("style","display:inline;");   
      }
    }
    div.appendChild(input);
  }
  label.appendChild(select);
  //div.appendChild(form);
  div.appendChild(label);
  songArea.appendChild(div);
}
/**
 * 
 * @param {*} folder_id 
 * display into another html file
 */
function checkfolder(folder_id){
  var id = folder_id;
  console.log(id);
  localStorage.setItem("pageName",id);

}
//var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
/**display localstorage of songs and artist, in the default folder */
function displaylocal(){
    var songArea = document.getElementById("songList"); 
for(var i=0; i<localStorage.length;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
   // console.log("key: "+key);
    //console.log("item: "+songitem);
    
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
      if(temp[0]=="default"){
    var songname = temp[1];
    var songartist = temp[2];
    }

    if(songname!=undefined){
    var div = document.createElement("div");
    div.setAttribute("id",i);
    div.setAttribute("class",song)
    //div.setAttribute("draggable",true);//
    songArea.appendChild(div);

    var song = document.createElement("p");
    song.setAttribute("style","line-height: 200%;");
    song.innerHTML = "Song: "+songname+'&nbsp &nbsp &nbsp &nbsp &nbsp'+" Artist: "+songartist;
    div.appendChild(song);
    console.log(songname);
    //var form = document.createElement("form");
    //div.appendChild(form);
    //label
    displayselection(songname,songartist);
    }
  }
}
}
/* draggable
$(document).ready (function(){
  $('#songList div').draggable({
    helper:'clone',
    revert: "valid",
  })
})
*/


/**display folders */
function displayfolders(){
  
    var folderlisttemp = localStorage.getItem("folderList");
    if(folderlisttemp!=null){
    var temp = folderlisttemp.split(',');
    var folderArea = document.getElementById("folder");

    for(var i =0; i<temp.length;i++){
        var folderName = temp[i];
        if(folderName!=undefined){
    
/*droppable
    document.getElementById(folderName).droppable({
      drop:function(event, ui){
        $('#folder').append(ui.draggable);
        //song 1- test1 -> 
        console.log(event.target.id);
      },

    })
    */
        //d name
        /**the folder list class name: displayfolder */
        var folderTitlea = document.createElement("a");
        folderTitlea.setAttribute("id",folderName);
        folderTitlea.setAttribute("onclick","checkfolder(this.id)");
        folderTitlea.setAttribute("href","./songdetail.html")
    var folderTitle = document.createElement("li");
    folderTitle.innerHTML=folderName;
    //folderTitle.setAttribute("id",folderName);
    //folderTitle.setAttribute("onclick","checkfolder(this.id)");
    folderTitle.setAttribute("class","displayfolder");
    folderTitle.setAttribute("style","margin-top:5px;text-align:center");
    folderTitlea.appendChild(folderTitle);
    folderArea.appendChild(folderTitlea)
    
    
}
    }
}
}

/** functions*/
init();
displaylocal();
displayfolders();



    
  /** display for the weather API */ 
    document.getElementById('locationBtn').onclick = function checkWeather() {
        console.log('button clicked');

        var city = $('.locationText').val();
        console.log(city);
        //document.querySelector('.locationText').value = '';

        fetch(
            'http://api.weatherapi.com/v1/current.json?key=44ade762643049cc9b433612210610&q='+city+'&aqi=no')
        .then(function(response) {
        return response.json();
        })
        .then (function(data) {
        console.log(data);
        var weatherContainerEl = document.getElementById('weather-container');
        weatherContainerEl.innerHTML = '';
        var currentTitle = document.createElement('h2');
        var currentWeather = document.createElement('p');
        currentTitle.innerHTML = 'Current Weather Conditions in ' + city + ':';
        currentWeather.innerHTML = 'Temp in Celsius:'+data.current.temp_c+' C'+'Feels like:'+data.current.feelslike_c+' C'+'Precipitation:'+data.current.precip_mm+' mm';
       
        // currentTitle.setAttribute(
        // currentWeather.setAttribute('innerHTML', data.current);
        weatherContainerEl.appendChild(currentTitle);
        weatherContainerEl.appendChild(currentWeather);
        })
        .catch(error => "error");
    };    



