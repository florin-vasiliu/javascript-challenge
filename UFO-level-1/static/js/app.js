// from data.js
var tableData = data;

// selecting filter button
var button = d3.select("#filter-btn");
// selecting input field
var inputField = d3.select("#datetime");
// selecting dateFilter input
var dateFilterInput = d3.select("#date-filter");

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

//define filter criteria function
function filterDateCriteria(data, filterElement){
    return data.filter(function(date){
        return date.datetime.startsWith(filterElement,0)
    })
}

// function for handling filter button
function handleClick(){
    //defining filtering value and returning the filtered data
    var filterValue = inputField.property("value")
    var filteredData = filterDateCriteria(data, filterValue)
    // defining which data to print
    if (filterValue.length === 0) {
        populateTable(data)
    }
    else{
        populateTable(filteredData)
    }
    
}

//button event handler
button.on("click", handleClick)

function dateFilterValue(){
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

//initial population of the table
populateTable(data);

// //input field event handler
// dateFilterInput.on("keydown", function(){
//     let filterValue = dateFilterValue();
//     let filteredData = filterDateCriteria(data, filterValue)
//     populateTable(filteredData)
// })

//generate datalist for selection
dateFilterInput.on("keydown", function(){
    let filterValue = dateFilterValue();
    let filteredData = filterDateCriteria(data, filterValue)
    populateDropDown(filteredData, "datetime")
})

dateFilterInput.on("change", function(){
    let filterValue = dateFilterInput._groups[0][0].value;
    let filteredData = filterDateCriteria(data, filterValue)
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
    d3.selectAll("#date-time>option").remove()
    var dropDown = d3.select("#date-time");

    dropDownList.forEach(item => { 
        option = dropDown.append("option")._groups[0][0];
        option.text = item;

        })
}