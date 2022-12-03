"use strict";
document.addEventListener("DOMContentLoaded", function () {
  // getting elements from the DOM
  const animalNames = document.querySelector("#animalNames");
  const animalDetails = document.querySelector("#animalDetails");

  // get data
  const getData = async function () {
    const response = await fetch("http://localhost:3000/characters/");
    const data = await response.json();

    return data;
  };

  // Render animals names
  const renderAnimalNames = async function () {
    const data = await getData();
    data.map((item) => {
      const markUp = `<p>${item.name}</p>`;
      animalNames.insertAdjacentHTML("beforeend", markUp);
    });
  };
  renderAnimalNames();

  // render animal details
  const renderAnimalDetails = async function (e) {
    const data = await getData();
    data.map((item) => {
      if (e.target.innerHTML === item.name) {
        const markUp = `<div class="animalCard">
      <p>${item.name}</p>
      <img src="${item.image}" alt="${item.name}">
      <div class="votes">
        <label>
          <span id="label">Enter no. of votes 0 - 10</span>
          <input id="votesInput" type="number" min="0" max="10">
        </label>
        <p id="vote"><i class="fa-regular fa-heart"></i></p>
        <p id="votesCount">votes: ${item.votes}</p>
      </div>
    </div>`;
        animalDetails.innerHTML = "";
        animalDetails.insertAdjacentHTML("afterbegin", markUp);
      }
    });
  };
  animalNames.addEventListener("click", renderAnimalDetails);

  // render number of votes as par user input
  const renderVotes = async function (e) {
    const data = await getData();
    data.map((item) => {
      if (e.target.classList.contains("fa-heart")) {
        // getting elements from the DOM
        const inputSec = animalDetails.querySelector("label");
        const labelContent = animalDetails.querySelector("#label");
        const heart = document.querySelector(".fa-heart");
        const votesCount = document.querySelector("#votesCount");
        const votesInput = parseInt(document.querySelector("#votesInput").value);
        // Initializing votes
        let votes = item.votes;
        // setting votes range
        if (votesInput >= 0 && votesInput <= 10) {
          labelContent.textContent = "enter no. of votes 0 - 10";
          heart.classList.toggle("red");
          if (heart.classList.contains("red")) {
            votes += votesInput;
            inputSec.style.display = "none";
          } else {
            votes = item.votes;
            inputSec.style.display = "block";
          }
        } else {
          labelContent.textContent = "enter votes within range";
        }
        votesCount.innerHTML = `votes: ${votes}`;
      }
    });
  };

  animalDetails.addEventListener("click", renderVotes);

  // add animals
  const addAnimalBtn = document.querySelector("#addAnimal")
  const form = document.querySelector("form")
  const mainSection = document.querySelector(".mainSection")
  const closeForm = document.querySelector("#cancel")
  
  const addAnimal  = function(e){
    e.preventDefault()
    const addAnimalsSection = document.querySelector("#addAnimalsSection")
    mainSection.style.filter = "blur(10px)"
    addAnimalsSection.style.display = "flex"
    closeForm.addEventListener("click", function(){
      addAnimalsSection.style.display = "none"
      mainSection.style.filter = "blur(0)"
    })
  }

  addAnimalBtn.addEventListener("click", addAnimal)

});
