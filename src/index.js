//
// When the page loads,
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("hello world!");

  const dogBar = document.getElementById("dog-bar");
  const dogInfo = document.getElementById("dog-info");
  // append an empty img, h2, and button

  // use fetch
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((data) => populateDogSpans(data));

  // pupArray -[
  //        {
  //            "id": 1,
  //            "name": "Mr. Bonkers",
  //            "isGoodDog": true,
  //            "image": "img.jpg"
  //          }
  //        ...
  //        ]
  // ??
  function populateDogSpans(pupArray) {
    // for every pup in this array,
    pupArray.forEach((pup) => {
      // extract the data
      // pup.name
      // add a span with the pup's name to dog-bar
      let dogSpan = document.createElement("span");
      // pup.name?
      dogSpan.innerText = pup.name;

      // append dogSpan to dogBar
      dogBar.append(dogSpan);

      // When a user clicks on a pup's span in the div#dog-bar,
      dogSpan.addEventListener("click", (e) => {
        // we could clear out dogInfo, or we can replace the attributes of currently existing elements

        // console.log(pup);
        // we could re-fetch, or just use pup object available to us in this scope
        // how to fetch this pup from the backend?
        fetch(`http://localhost:3000/pups/${pup.id}`)
          .then((response) => response.json())
          .then((data) => changeCentralDisplay(data));
      });
    });
  }

  function changeCentralDisplay(pupResponseObj) {
    dogInfo.innerHTML = "";
    // pup's info (image, name, and isGoodDog status)
    // should show up in the div with the id of "dog-info".
    // target the middle, dogInfo
    // create img, h2, and button  element
    const img = document.createElement("img");

    img.src = pupResponseObj.image;

    const h2 = document.createElement("h2");
    h2.textContent = pupResponseObj.name;

    const btn = document.createElement("button");

    // if isGoodDog is true, Good Dog!
    if (pupResponseObj.isGoodDog === true) {
      btn.innerText = "Good Dog!";
    } else {
      // otherwise, bad dog
      btn.innerText = "Bad Dog!";
    }

    // The button's text should change from Good to Bad or Bad to Good
    btn.addEventListener("click", (e) => {
      // // if first char is 'G', change text to Bad Dog!
      // if (e.target.innerText[0] === "G") {
      //   e.target.innerText = "Bad Dog!";
      // } else {
      //   // otherwise, change to Good Dog!
      //   e.target.innerText = "Good Dog!";
      // }

      // PATCH to the backend
      fetch(`http://localhost:3000/pups/${pupResponseObj.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          // title: "foo",
          isGoodDog: !pupResponseObj.isGoodDog,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => changeCentralDisplay(json));

      // rerun central display
    });

    // The corresponding pup object in the database should be updated to reflect the new isGoodDog value

    dogInfo.append(img, h2, btn);
  }
});

// to get all of the pup data from your server.

// When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).
