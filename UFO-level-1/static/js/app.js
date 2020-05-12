// from data.js
var tableData = data;

// populating table function
function populateTable(dataToDisplay){
    // emptying initial table
    d3.selectAll("#ufo-table>tbody>tr").remove()
    // iterating through each row of data and adding row to table
    dataToDisplay.forEach(rowData => {
        var tblBody = d3.select("#ufo-table>tbody");
        tblRow = tblBody.append("tr");
        //iterating through each property of data and adding value to cell
        Object.entries(rowData).forEach(cellData =>{
            tblCell = tblRow.append("td")
            tblCell.text(cellData[1])
        })
    });
}

//initial population of the table
populateTable(data);

var dateFilterInput = d3.selectAll(".input-filter");

//define filter criteria function
function filterCriteria(objectList, objectProperty, filterElement){
    return objectList.filter(function(item){
        return item[objectProperty].startsWith(filterElement,0)
    })
}



function autoCompleteFilterValue(){
    //get the last key typed
    var lastKeyTyped = d3.event.key
    
    //setting special behaviour for backspace
    if(lastKeyTyped != "Backspace"){
        //get the text stored in the input box
        var stringStored = dateFilterInput._groups[0][0].value.concat(lastKeyTyped)
    }
    else{
        var stringStored = dateFilterInput._groups[0][0].value.substring(0, dateFilterInput.length - 1);
    }
    //console.log(stringStored);
    // return the whole string from the input box
    return stringStored
}



//generate datalist for autocomplete
dateFilterInput.on("keydown", function(){
    let filterValue = autoCompleteFilterValue();
    let filteredData = filterCriteria(data, "datetime", filterValue)
    populateDropDown(filteredData, "datetime")
    console.log(this)
})

//filter table
dateFilterInput.on("change", function(){
    let filterValue = dateFilterInput._groups[0][0].value;
    let filteredData = filterCriteria(data, "datetime", filterValue)
    console.log(filterValue, filteredData)
    populateTable(filteredData)
})


function populateDropDown(objectList, objectProperty){
    //create list of unique drop-down items
    dropDownList = []
    objectList.forEach(item => {
        if (dropDownList.includes(item[objectProperty]) === false){
            dropDownList.push(item[objectProperty]);
        }
    })

    //remove all options
    d3.selectAll("#date-dropdown>option").remove()
    var dropDown = d3.select("#date-dropdown");
    console.log(dropDown)
    dropDownList.forEach(item => { 
        option = dropDown.append("option")._groups[0][0];
        console.log(dropDown)
        option.text = item;

        })
}