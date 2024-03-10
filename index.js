document.getElementById('dropdownMenuButton').addEventListener('click', function () {
  var menu = document.getElementById('dropdownMenu');
  var isOpen = menu.classList.contains('show');
  if (isOpen) {
    menu.classList.remove('show');
  } else {
    menu.classList.add('show');
  }
});

//Load the Data
fetch(`./data.json`)
  .then(response => response.json())
  .then(data => loadUserHomePage(data));


function loadUserHomePage(data) {
  //-------------------Loading The User Name at the Navigation Bar-----------------//
  let userGreeting = document.getElementById("user-greeting");
  let name = data.user.userName;
  userGreeting.innerHTML = `Hello ${name}!`;


  //-------------------Loading the Course Content--------------------//
  let courseList = data.user.classes;
  console.log(courseList);

  for (let course of courseList) {
    let courseName = course.className;
    let courseDescription = course.classDescription;
    let url = course.classImgURL;

    //---------------Main Page--------------------------//
    let card = document.getElementById("course-container");
    let addCard = document.createElement('div');
    addCard.classList.add('col-md-4');
    addCard.classList.add('mb-4');
    addCard.innerHTML = `<div class="card" style="width: 18rem;">
                          <div class="card-img-container">
                              <img class="card-img-top" src="${url}" alt="Image Not Available">
                          </div>
                            <div class="card-body">
                              <h5 class="card-title">${courseName}</h5>
                              <p class="card-text">${courseDescription}</p>
                              <a href="#" class="btn btn-primary" style="align-content: center;">View</a>
                             </div>
                             </div>`;

    card.appendChild(addCard);

    // Go to class's page when "view" button is clicked
    document.querySelectorAll('.btn-primary').forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          const courseName = this.parentNode.querySelector('.card-title').innerText;
          window.location.href = `classPage.html?course=${encodeURIComponent(courseName)}`;
      });
  });

    //--------------Navigation Bar---------------------------//
    let navList = document.getElementById("navbar-course-list");
    let addListItem = document.createElement('li');
    addListItem.classList.add('nav-item');
    addListItem.innerHTML = `<a class="nav-link" aria-current="page" href="classPage.html?course=${encodeURIComponent(courseName)}">${courseName}</a>`;
    navList.appendChild(addListItem);

  }
}

document.getElementById('about-link').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'about.html';
});


