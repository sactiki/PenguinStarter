var clearTable=function(){
    d3.selectAll("#peninfo tbody tr")
    .remove();
}


//start of draw tables
var drawTable=function(classData){
//selecting the table
var rows= d3.select("#peninfo tbody")
    .selectAll("tr")
    .data(classData)
    .enter()
    .append("tr")

//images 
  rows.append("td")
        .append("img")
        .attr("src", function(name){
        return "imgs/"+ name.picture
    })
  
//mean of quizzes
 var getgrade=function(name){
    return name.grade
}

rows.append("td")
    .append("p")
    .text(function(name){
   var quizesdata=name.quizes;
    var listgrades=quizesdata.map(getgrade);
    var quizesmean=d3.mean(listgrades);
    return quizesmean
});
    
    //hw means
rows.append("td")
    .append("p")
    .text(function(name){
    var hwdata=name.homework;
    var listhwgrades=hwdata.map(getgrade);
    var hwmean=d3.mean(listhwgrades);
    return hwmean
});

    
    //tests mean
rows.append("td")
    .append("p")
    .text(function(name){
    var testdata=name.test;
    var listtestgrades=testdata.map(getgrade);
    var testmean=d3.mean(listtestgrades);
    return testmean
});

    //final grade
rows.append("td")
    .append("p")
    .text(function(name){
    var finaldata=name.final;
    var finalgrade=finaldata.map(getgrade);
    return finalgrade
})
}


//attempt at getting qmeans
var getgrade=function(name){
    return name.grade
}
var quizesmean=function(name){
   var quizesdata=name.quizes;
    var listgrades=quizesdata.map(getgrade);
    var quizesmean=d3.mean(listgrades);
    return quizesmean
}

//attempt at getting final grades
var finalgrade=function(name){
    var finaldata=name.final;
    var finalgrade=finaldata.map(getgrade);
    return finalgrade
}


//attempt at getting hw grades
var hwmean=function(name){
    var hwdata=name.homework;
    var listhwgrades=hwdata.map(getgrade);
    var hwmean=d3.mean(listhwgrades);
    return hwmean
}


//attempt at getting test means
var tmean=function(name){
    var testdata=name.test;
    var listtestgrades=testdata.map(getgrade);
    var testmean=d3.mean(listtestgrades);
    return testmean
}

//start of sorter
var sorter=function(classData){
   d3.select("#qmean")
    .on("click",function(){
       classData.sort(function(a,b){
           var aqmean = quizesmean(a);
           var bqmean = quizesmean(b);
            if (aqmean > bqmean){return -1}
            else if(aqmean < bqmean){return 1}
            else{return 0;}
                            })
       
     clearTable();
    drawTable(classData);
   })
    d3.select("#finalgrade")
    .on("click",function(){
        classData.sort(function(a,b){
         var afinal = finalgrade(a);
        var bfinal= finalgrade(b);
            if(afinal<bfinal){return 1}
            else if(afinal>bfinal){return -1}
            else{return 0}   
        })
       clearTable();
        drawTable(classData);
    })
    d3.select("#hwmean")
    .on("click",function(){
        classData.sort(function(a,b){
            var ahw=hwmean(a);
            var bhw=hwmean(b);
            if(ahw<bhw){return 1}
            else if(ahw>bhw){return -1}
            else{return 0}
        })
        clearTable();
        drawTable(classData); 
    })
    d3.select("#tmean")
    .on("click",function(){
        classData.sort(function(a,b){
            var ta=tmean(a);
            var tb=tmean(b);
            if (ta<tb){return 1}
            else if (ta>tb){return -1}
            else{return 0}
        })
        clearTable();
        drawTable(classData);
    })
    
    
    
    
}


var penpromise=d3.json("classData.json");

var successFCN=function(classData){
    console.log("Data  collected", classData);
    drawTable(classData);
    sorter(classData);
}
var failFCN=function(errorMSG){
    console.log("OOPS",errorMSG);
}
penpromise.then(successFCN,failFCN);


