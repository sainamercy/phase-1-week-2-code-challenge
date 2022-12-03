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
        const markUp = `<div class="animalCard"><p>${item.name}</p>
    <img src="${item.image}" alt="${item.name}">
    <div class="votes"><p id="vote">vote <i class="fa-regular fa-heart"></i></p>
    <p id="votesCount">votes: ${item.votes}</p></div></div>`;
        animalDetails.innerHTML = "";
        animalDetails.insertAdjacentHTML("afterbegin", markUp);
      }
    });
  };
  animalNames.addEventListener("click", renderAnimalDetails);

  const renderVotes = async function (e) {
    const data = await getData();
    data.map((item) => {
      if (e.target.classList.contains("fa-heart")) {
        const heart = document.querySelector(".fa-heart");
        const votesCount = document.querySelector("#votesCount");
        let votes = item.votes;
        heart.classList.toggle("red");
        if (heart.classList.contains("red")) {
          votes++;
        } else {
          votes = item.votes;
        }
        votesCount.innerHTML = `votes: ${votes}`;
      }
    });
  };

  animalDetails.addEventListener("click", renderVotes);
});
