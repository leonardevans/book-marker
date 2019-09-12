window.addEventListener("load", fetchBookmarks);

// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // prevent form from submitting
  e.preventDefault();

  //  get form values
  let siteName = document.getElementById("siteName").value;
  let siteURL = document.getElementById("siteURL").value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteURL,
  };

  if (localStorage.getItem("bookmarks") === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //   get bookmark from localstorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //   Add bookmark to array
    bookmarks.push(bookmark);

    //   send it to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById("myForm").reset();

  fetchBookmarks();
}

// delete bookmark
function deleteBookmark(url) {
  //   get bookmarks from local storage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // fetch bookmarks again
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // get output id
  let bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML += `<div class="well">
    <h3>${name}
    <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
    <a onclick="deleteBookmark('${url}')" class="btn btn-danger" target="" href="#">Delete</a>
    </h3>
      </div>
      `;
  }
}

function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("please fill in the form!");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("please use a valid url");
    return false;
  }
  return true;
}
