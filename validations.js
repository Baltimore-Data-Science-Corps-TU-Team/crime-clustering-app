function validateForm(){

    var fromDate = new Date(window.document.forms["options"]["fromDate"].value);
    var toDate = new Date(window.document.forms["options"]["toDate"].value);
    var crime = window.document.forms["options"]["crime"].value;
    var optionsValid = true;

    if (fromDate >= toDate){
        window.alert("From date must be before to date.");

        //additional date range validations here

        optionsValid = false;
    }

    console.log(fromDate);
    console.log(toDate);
    console.log(crime);

    return optionsValid;
}