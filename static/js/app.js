//initial population of the table from data.js
var htmlTableData = populateTable(data);

//select all input tags used for filtering
var filterInput = d3.selectAll(".input-filter");

//initial pupulation of the dropdown lists for all the input tags
filterInput._groups[0].forEach(input =>{
    populateDropDown(data, input.list.id, input.list.id)
})

//clear all filters button
var btnClear = d3.select("#clear-filter")

//restore initial condition on button click
btnClear.on("click", function(){
    htmlTableData = populateTable(data)
    filterInput._groups[0].forEach(input =>{
        populateDropDown(data, input.list.id, input.list.id)
        input.value = ""
    })
})



//generate datalist for autocomplete dropdown list
filterInput.on("keydown", function(){
    let typedValue = autoCompleteFilterValue(this);
    let autoCompleteFilteredData = filterCriteria(htmlTableData, this.list.id, typedValue)
    populateDropDown(autoCompleteFilteredData, this.list.id, this.list.id)
    
})

//populate html table in function of value inserted in the input tag
filterInput.on("change", function(){
    //use all values from input tags to filter the data
    let filterValue;
    let filteredData = data;
    filterInput._groups[0].forEach(object => {
        filterValue = object.value;
        tagID = object.list.id;
        filteredData = filterCriteria(filteredData, tagID, filterValue);
    })
    //populate html table with data filtered from all tags
    htmlTableData = populateTable(filteredData)
    //repopulate dropdown lists with data populated in the html table
    filterInput._groups[0].forEach(object => {
        //avoiding the dropdown population of the field in use
        if (object !== this){
            populateDropDown(htmlTableData, object.list.id, object.list.id)
        }
    })
})

//filter an object collection by a key, using a string for value
function filterCriteria(objectCollection, objectKey, filterElement){
    return objectCollection.filter(function(item){
        return item[objectKey].startsWith(filterElement,0)
    })
}

// populating the html table function
function populateTable(objectCollection){
    // emptying initial table
    d3.selectAll("#ufo-table>tbody>tr").remove()
    // iterating through each row of data and adding row to table
    objectCollection.forEach(rowData => {
        var tblBody = d3.select("#ufo-table>tbody");
        tblRow = tblBody.append("tr");
        //iterating through each property of data and adding value to cell
        Object.entries(rowData).forEach(cellData =>{
            tblCell = tblRow.append("td")
            tblCell.text(cellData[1])
        })
    });
    return objectCollection
}

//returns the value stored in an input tag to feed a filter function
function autoCompleteFilterValue(htmlTag){
    //get the last key typed
    var lastKeyTyped = d3.event.key
    if(lastKeyTyped != "Backspace"){
        //get the text stored in the input box
        var stringStored = htmlTag.value.concat(lastKeyTyped)
    }
    else{
        //remove the last key stored (when pressing backspace)
        var stringStored = htmlTag.value.substring(0, htmlTag.length - 1);
    }
    // return the whole string from the input box
    return stringStored
}


//pupulate dropdown on a datalist using a list defined from a collection of objects and a key 
function populateDropDown(objectCollection, objectKey, htmlDataListID){
    //create list of unique drop-down items
    dropDownList = []
    objectCollection.forEach(item => {
        if (dropDownList.includes(item[objectKey]) === false){
            dropDownList.push(item[objectKey]);
        }
    })

    //remove all options
    d3.selectAll(`#${htmlDataListID}>option`).remove()
    var dropDown = d3.select(`#${htmlDataListID}`);
    dropDownList.forEach(item => { 
        option = dropDown.append("option")._groups[0][0];
        option.text = item;

        })
}








