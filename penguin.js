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


var penpromise=d3.json("classData.json");

var successFCN=function(classData){
    console.log("Data  collected", classData);
    drawTable(classData);
}
var failFCN=function(errorMSG){
    console.log("OOPS",errorMSG);
}
penpromise.then(successFCN,failFCN);


