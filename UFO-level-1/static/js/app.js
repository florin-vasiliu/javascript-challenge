// from data.js
var tableData = data;

// selecting filter button
var button = d3.select("#filter-btn");
// selecting input field
var inputField = d3.select("#datetime");

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
        return date.datetime === filterElement
    })
}


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

button.on("click", handleClick)

// adding event listener function for input field
/*
function handleInputChange(){
    filterElement = d3.event.target.value
    //console.log(filterElement)
    return filterElement
}
inputField.on("change", handleInputChange)
*/

populateTable(data);