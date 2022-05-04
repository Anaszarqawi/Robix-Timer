function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = $(".searchBar")
    filter = input.val()
    ul = $(".scores")
    li = $(".scores .score")

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        value = $(li[i]).text()
        console.log(value);
        if (value.indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}