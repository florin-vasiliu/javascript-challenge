// from data.js
var tableData = data;


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


populateTable(data);