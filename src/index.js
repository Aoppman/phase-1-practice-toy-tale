const API = "http://localhost:3000/toys";

let addToy = false;

/* 
const newEl = (el) => document.createElement(el)

const nidEl = (id) => document.getElementById(id)

// one liner functions to clean up excess code

*/


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))
    data.likes = 0
    
    // When a user submits the toy form, two things should happen:
    
    // A POST request should be sent to http://localhost:3000/toys
    // and the new toy added to Andy's Toy Collection.
    // If the post is successful, the toy should be added to the DOM
    // without reloading the page.


    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data)
    })
    .then((resp) => resp.json())
    .then((data) => renderCard(data))
  });

  fetch(API)
    .then((response) => response.json())
    .then(renderToys);

  function renderToys(toyList) {
    console.log(toyList);

    /*function updateLikes(toyCards) {
      fetch(API, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(likeAdder)
      })
      .then((resp) => resp.json())
      .then(toyCards => console.log(toy))

    } */
    


    // Each card should have the following child elements:

    // h2 tag with the toy's name
    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    // p tag with how many likes that toy has
    //button tag with a class "like-btn" and an id attribute set to the toy's id number

    const toyCards = toyList.map((toy) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const h2 = document.createElement("h2");
      h2.textContent = toy.name;

      //card.appendChild(h2)

      const img = document.createElement("img");
      img.classList.add("toy-avatar", "test-img");
      img.src = toy.image;

      //card.appendChild(img)
      let likeCount = `${toy.likes}`

      const p = document.createElement("p");
      p.textContent = `${likeCount} Likes`;

      //card.appendChild(p)

      const button = document.createElement("button");
      button.classList.add("Like-btn");
      button.setAttribute("id", `${toy.id}`);
      button.textContent = "Like ❤️";


      
      
      card.append(h2, img, p, button);
      // use "append" vs "appendChild" to append multiple
      // items at once
      document.querySelector("#toy-collection").appendChild(card);
      
      card.querySelector(".Like-btn").addEventListener("click", () => {
        let likeAdder = likeCount++
        card.querySelector("p").textContent = `${likeAdder} Likes` 
        //updateLikes(card)  
      })
      
    });
  }

  addBtn.addEventListener("click", () => {
    console.log("clicking button");
    // hide & seek with the form
    addToy = !addToy; // Toggling addToy from false to true with each click
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

