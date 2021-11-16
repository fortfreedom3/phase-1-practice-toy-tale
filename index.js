let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(resp=> resp.json())
  .then(toys=> {
    toys.forEach((toy)=>{
      renderToy(toy)
    })
  })
})

function renderToy(toy) {
  //create Elements
  const cardDiv = document.createElement("div");
  const header = document.createElement("h2");
  const image = document.createElement("img");
  const likes = document.createElement("p");
  const button = document.createElement("button");

  //add attributes
  cardDiv.className = "card";
  image.className = "toy-avatar";
  button.className = "like-btn";

  //add info
  header.textContent = toy.name;
  image.src = toy.image;
  likes.textContent = toy.likes + " Likes";
  button.id = `"${toy.id}"`;
  button.textContent = "Like "
  cardDiv.append(header, image, likes, button);

  //append 
  const collection = document.querySelector("#toy-collection")
  collection.append(cardDiv)
}

const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }

  fetch("http://localhost:3000/toys", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
      Accept: "application/json"
		},
		body: JSON.stringify(newToy),
	})
  .then(resp=>resp.json())
  .then(toy=>renderToy(toy))
  e.target.reset();
}

);


// function newToy(e) {
  

//   const newToyName = document.getElementsByName("name").value;
//   const newToyImage = document.getElementsByName("image").value;
  
//   console.log(newToyName)
//   console.log(newToyImage);

 
// }

// const toyForm = document.querySelector(".container");

// toyForm.addEventListener("submit", newToy);
