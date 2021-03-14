// start by creating data so we don't have to type it in each time
let myWalkers = [];

// define a constructor to create Walker objects
let DogWalker = function (pFirst, pLast, pEmail, pPhone, pExperience, pDays) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.FirstName = pFirst;
    this.LastName = pLast;
    this.Email = pEmail;
    this.Phone = pPhone;
    this.Experience = pExperience;
    this.Days = pDays; //Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday
}


document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        var firstName = document.getElementById("fname").value;
        var lastName = document.getElementById("lname").value;
        var emailAddress = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phone").value;
        var experience = document.getElementById("experience").value;
        var daysAvailable = DaysAvailableToText()
        if (firstName != "" && lastName != "" && emailAddress != "" && phoneNumber != "" && experience != "" && daysAvailable != "")
        {
            myWalkers.push(new DogWalker(document.getElementById("fname").value, document.getElementById("lname").value,
            document.getElementById("email").value, document.getElementById("phone").value,
            document.getElementById("experience").value, DaysAvailableToText()
            ));
            document.location.href = "index.html#ListAll";

            alert(firstName + " " + lastName + " has been added!");

            // Clears information for next time you add a walker
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("experience").value = "";
            document.getElementById("daysForm").reset();
        }
        else
        {
            alert("Please completely fill out the form.");
        }
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("experience").value = "";
        document.getElementById("daysForm").reset();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteWalker(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to the walker list 
    });
// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });

    // need one for our WalkerInformation page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#WalkerInformation", function (event) {   // have to use jQuery 
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneName").innerHTML = "Name: " + myWalkers[arrayPointer].FirstName + " " + myWalkers[arrayPointer].LastName;
        document.getElementById("oneEmail").innerHTML = "Email: " + myWalkers[arrayPointer].Email;
        document.getElementById("onePhone").innerHTML = "Phone number: " + myWalkers[arrayPointer].Phone;
        document.getElementById("oneExperience").innerHTML = "Experience: " + myWalkers[arrayPointer].Experience;
        document.getElementById("oneDays").innerHTML = "Days available: " + myWalkers[arrayPointer].Days + ".";
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divDogWalkers div it should draw
// to, and if no value is passed in to subset too, I could just include all.

// Dylan: I created a function to determine what days the user selected.
// For the Add a Walker page!

function DaysAvailableToText() {
    var monday = document.getElementById("monday").checked;
    var tuesday = document.getElementById("tuesday").checked;
    var wednesday = document.getElementById("wednesday").checked;
    var thursday = document.getElementById("thursday").checked;
    var friday = document.getElementById("friday").checked;
    var saturday = document.getElementById("saturday").checked;
    var sunday = document.getElementById("sunday").checked;
    
    availableText = "";

    if (monday)
    {
        availableText = "Monday, ";
    }
    if (tuesday)
    {
        availableText = availableText + "Tuesday, ";
    }
    if (wednesday)
    {
        availableText = availableText + "Wednesday, ";
    }
    if (thursday)
    {
        availableText = availableText + "Thursday, ";
    }
    if (friday)
    {
        availableText = availableText + "Friday, ";
    }
    if (saturday)
    {
        availableText = availableText + "Saturday, ";
    }
    if (sunday)
    {
        availableText = availableText + "Sunday, ";
    }


    if (availableText == "")
    {
        return availableText;
    }
    else
    {
        finishedText = availableText.slice(0, -2) // to get rid of ', '
        return finishedText;
    }
};

function createList() {
    // clear prior data
    var divWalkerList = document.getElementById("divWalkerList");
    while (divWalkerList.firstChild) {    // remove any old data so don't get duplicates
        divWalkerList.removeChild(divWalkerList.firstChild);
    };

    var ul = document.createElement('ul');

    myWalkers.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneWalker'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.FirstName + " " + element.LastName + " | Experience: " + element.Experience + " | Available: " + element.Days + ".";
        ul.appendChild(li);
    });
    divWalkerList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneWalker");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#WalkerInformation";
    
        });
    });

};

function deleteWalker(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    myWalkers.splice(arrayPointer, 1);  // remove 1 element at index 
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < myWalkers.length; i++) {
        if (localID === myWalkers[i].ID) {
            return i;
        }
    }
}


/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
