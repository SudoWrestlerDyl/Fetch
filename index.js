// start by creating data so we don't have to type it in each time
let myWalkers = [];

// define a constructor to create movie objects
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
        myWalkers.push(new DogWalker(document.getElementById("fname").value, document.getElementById("lname").value,
        document.getElementById("email").value, document.getElementById("phone"),
        document.getElementById("experience").value, DaysAvailableToText()
        ));
        document.location.href = "index.html#ListAll";
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("man").value = "";
        document.getElementById("woman").value = "";
        document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteMovie(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to movie list 
    });

// 2 sort button event methods
    document.getElementById("buttonSortTitle").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortGenre").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the youtube video
    document.getElementById("trailer").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });

    document.getElementById("buttonSortComedy").addEventListener("click", function () {
       
        createListSubset("Comedy");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });

    document.getElementById("buttonSortDrama").addEventListener("click", function () {
       
        createListSubset("Drama");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });
// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   // have to use jQuery 
        // clear prior data
        var divMovieList = document.getElementById("divMovieListSubset");
        while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
            divMovieList.removeChild(divMovieList.firstChild);
        };
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneTitle").innerHTML = "The title is: " + movieArray[arrayPointer].Title;
        document.getElementById("oneYear").innerHTML = "Year released: " + movieArray[arrayPointer].Year;
        document.getElementById("oneGenre").innerHTML = "Genre: " + movieArray[arrayPointer].Genre;
        document.getElementById("oneWoman").innerHTML = "Leading Woman: " + movieArray[arrayPointer].Woman;
        document.getElementById("oneMan").innerHTML = "Leading Man: " + movieArray[arrayPointer].Man;
        document.getElementById("oneURL").innerHTML = movieArray[arrayPointer].URL;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divMovieList div it should draw
// to, and if no value is passed in to subset too, I could just include all.

// Dylan: I created a function to determine what days the user selected.
// For the Add a Walker page!

function DaysAvailableToText() {
    var monday = document.getElementById("monday").checked;
    var tuesday = document.getElementById("tuesday").checked;
    var wednesday = document.getElementById("wednesday").checked;
    var thursday = document.getElementById("thursday").checked;
    var friday = document.getElementById("friday").checked;
    var saturday = document.getElementById("satursday").checked;
    var sunday = document.getElementById("sunday").checked;
    
    availableText = "";

    if (monday)
    {
        availableText = "Monday, ";
    }
    else if (tuesday)
    {
        availableText = availableText + "Tuesday, ";
    }
    else if (wednesday)
    {
        availableText = availableText + "Wednesday, ";
    }
    else if (thursday)
    {
        availableText = availableText + "Thursday, ";
    }
    else if (friday)
    {
        availableText = availableText + "Friday, ";
    }
    else if (saturday)
    {
        availableText = availableText + "Saturday, ";
    }
    else if (sunday)
    {
        availableText = availableText + "Sunday, ";
    }


    if (availableText == "")
    {
        finishedText = "[No days selected]";
        return finishedText;
    }
    else
    {
        finishedText = availableText.slice(0, -2) // to get rid of ', '
        return finishedText;
    }
};

function createList() {
    // clear prior data
    var divMovieList = document.getElementById("divMovieList");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');

    movieArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneMovie'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
        ul.appendChild(li);
    });
    divMovieList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneMovie");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });

};

function deleteMovie(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    movieArray.splice(arrayPointer, 1);  // remove 1 element at index 
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < movieArray.length; i++) {
        if (localID === movieArray[i].ID) {
            return i;
        }
    }
}
  

function createListSubset(whichType) {
    // clear prior data
    var divMovieList = document.getElementById("divMovieListSubset");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');

    movieArray.forEach(function (element,) {
        
        if (element.Genre === whichType) {
            // use handy array forEach method
            var li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneMovie');
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
            ul.appendChild(li);
        }
    });
    divMovieList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneMovie");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};

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
