const baseURL = 'http://localhost:3000/toys';
let addToy = false;
let highestId = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch(baseURL)
  .then(resp => resp.json())
  .then(data => data.forEach(toy => display(toy)));

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function display(toy) {

  const toyFormCollection = document.getElementById("toy-collection");
  const toyDiv = document.createElement('div');
  toyDiv.className = 'card';

  // h2 tag with the toy's name
  const toyNameElement = document.createElement('h2');
  toyNameElement.textContent = toy.name;

  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  const toyImageElement = document.createElement('img');
  toyImageElement.src = toy.image;
  toyImageElement.className = 'toy-avatar'

  // p tag with how many likes that toy has
  const toyLikesElement = document.createElement('p');
  toyLikesElement.textContent = toy.likes + ' likes';

  // button tag with a class "like-btn" and an id attribute set to the toy's id number
  const toyLikesButtonElement = document.createElement('button');
  toyLikesButtonElement.textContent = 'like';
  toyLikesButtonElement.className = 'like-btn';
  toyLikesButtonElement.id = toy.id;
  toyLikesButtonElement.addEventListener('click', e => {
    e.preventDefault();

    const updatedLikesObject = {
      likes: ++toy.likes
    }

    fetch(baseURL + `/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedLikesObject)
    })
    .then(toyLikesElement.textContent = toy.likes + ' likes')

  })

  toyDiv.append(toyNameElement, toyImageElement, toyLikesElement, toyLikesButtonElement);
  toyFormCollection.append(toyDiv);

  //handles highestId for POST
  if (highestId < toy.id) {
    highestId = toy.id
  }
}

document.querySelector('.add-toy-form').addEventListener('submit', e => {
  e.preventDefault();

  const newName = e.target['name'].value;
  const newImage = e.target['image'].value;

  const newToy = {
      "id": ++highestId,
      "name": newName,
      "image": newImage,
      "likes": 0
  }

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
  })

  display(newToy);

  e.target.reset();
})

//test add new toy name: Billy, Goat and Gruff
//test add new toy image: https://static.wikia.nocookie.net/disney/images/d/df/Billy%2C_Goat_and_Gruff_04.jpg/revision/latest/scale-to-width-down/1031?cb=20210124014631
