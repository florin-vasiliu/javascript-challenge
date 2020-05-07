// from data.js
var tableData = data;

// selecting filter button
var button = d3.select("#filter-btn");
// selecting input field
var inputField = d3.select("#datetime");

// populating table function
function populateTable(dataToDisplay){
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

// adding event listener function for input field
function handleInputChange(){
    filterElement = d3.event.target.value
    //console.log(filterElement)
    return filterElement
}

function filterDateCriteria(data, filterElement){
    return data.filter(function(date){
        return date.datetime === filterElement
    })
}
var filteredData = filterDateCriteria(data, "1/1/2010")
console.log(filteredData)

inputField.on("change", handleInputChange)


populateTable(data);