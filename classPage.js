// Get the course name
const urlParams = new URLSearchParams(window.location.search);
const courseNameParam = urlParams.get('course');

// Load the data
fetch(`./data.json`)
    .then(response => response.json())
    .then(data => loadClassPage(data, courseNameParam))
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Load the class information
function loadClassPage(data, courseNameParam) {
    // Find the specific class
    const selectedClass = data.user.classes.find(course => course.className === courseNameParam);
    if (selectedClass) {
        document.getElementById('class-name').textContent = selectedClass.className;

        const classImage = document.createElement('img');
        classImage.src = selectedClass.classImgURL;
        classImage.alt = selectedClass.className + " Image";
        document.getElementById('class-image').appendChild(classImage);

        const recentQuestionsBtn = document.getElementById('recentQuestionsBtn');
        const unansweredQuestionsBtn = document.getElementById('unansweredQuestionsBtn');

        recentQuestionsBtn.addEventListener('click', () => displayQuestions(selectedClass.posts));
        unansweredQuestionsBtn.addEventListener('click', () => displayUnansweredQuestions(selectedClass.posts));

        // default
        displayQuestions(selectedClass.posts);

    } else {
        // Handle when the selected class is not found
        console.error('Selected class not found:', courseNameParam);
    }
}

// Function to display all questions
function displayQuestions(posts) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    posts.forEach(post => {
        const questionElement = createQuestionElement(post);
        questionsContainer.appendChild(questionElement);
    });
}

// Function to display unanswered questions
function displayUnansweredQuestions(posts) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    posts.forEach(post => {
        if (post.responses.length === 0) {
            const questionElement = createQuestionElement(post);
            questionsContainer.appendChild(questionElement);
        }
    });
}

// Create HTML elements for a question
function createQuestionElement(post) {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const authorElement = document.createElement('div');
    authorElement.classList.add('author');
    authorElement.innerHTML = `
        <img src="${post.profilePictureURL}" alt="Profile Picture" class="profile-pic">
        <span class="username">${post.author}</span>`;

    const questionTextElement = document.createElement('div');
    questionTextElement.classList.add('question-text');
    questionTextElement.textContent = post.question;

    const viewAnswersButton = document.createElement('button');
    viewAnswersButton.classList.add('btn', 'btn-primary', 'view-answers-btn');
    viewAnswersButton.textContent = 'View Answers';

    questionElement.appendChild(authorElement);
    questionElement.appendChild(questionTextElement);
    questionElement.appendChild(viewAnswersButton);

    return questionElement;
}

// Event listener for the View Answer buttons
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('view-question-btn')) {
        console.log("View Answer button clicked!");
    }
});

// Event listener for About section
document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'about.html';
  });