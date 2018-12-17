document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  let giftNameInput = document.querySelector(".gift-name-input")
  let giftImageInput = document.querySelector(".gift-image-input")
  let giftId = document.querySelector(".gift-id")

  const giftList = document.querySelector('.gift-list');
  const giftForm = document.getElementById('new-gift-form');
  const editGiftForm = document.getElementById('edit-gift-form');

  editGiftForm.addEventListener("submit", function(event){
    event.preventDefault();
    let giftId = event.target.querySelector(".gift-id").value
    fetch(`http://localhost:3000/gifts/${ giftId }`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // "id": giftId,
        "name": giftNameInput.value,
        "image": giftImageInput.value
      })
    }).then(res => {
      document.querySelector(".modal").style.display = "none";
      let li = document.querySelector("[data-id='1']")
      li.querySelector(".gift-name").innerText = giftNameInput.value
      li.querySelector(".gift-image").src = giftImageInput.value
    })
  })


  // show all gifts on to the page
  // iterate over gifts (data)
  fetch("http://localhost:3000/gifts")
    .then(res => res.json())
    .then(data => { 
      data.forEach(function(gift) {
        // create a "gift" li DOM node
        const newListItem = makeNewListItem(gift.name, gift.image, gift.id);
        // newListItem.querySelector('button').addEventListener('click', function(event) {
        //   console.log('clicked!')
        // })
        // add the gift to the giftList (DOM Node)
        giftList.appendChild(newListItem);
      });
  });


  // create new gifts using submit
  giftForm.addEventListener('submit', function(event){
    event.preventDefault();
    //grab input values
    const giftNameInput = document.getElementById('gift-name-input');
    const giftImageInput = document.getElementById('gift-image-input');

    // creating new list items using the inputs values
    //TODO fix this to pass in the ID
    giftList.append(makeNewListItem(giftNameInput.value, giftImageInput.value));
    event.target.reset()
  })

  // delete using event delgation;
  giftList.addEventListener('click', function(event){
    if (event.target.classList.contains('delete-button')) {
      event.target.parentNode.remove()
    }

    if (event.target.classList.contains('edit-button')) {
      //pop the modal
      document.querySelector(".modal").style.display = "block";
      let button = event.target;
      let parentLi = button.parentNode;
      let giftNameElement = parentLi.querySelector(".gift-name")

      let giftName = giftNameElement.innerText
      let giftImageUrl = parentLi.querySelector(".gift-image").src

      giftNameInput.value = giftName
      giftImageInput.value = giftImageUrl
      giftId.value = parentLi.dataset.id
    }
  });

})


/// helper functions:
function makeNewListItem(name, image, id){
  const newListItem = document.createElement('li');
  newListItem.dataset.id = id;
  newListItem.omar = "good-question";

  newListItem.innerHTML = `
      <p class="gift-name">${name}</p>
      <img class="gift-image" src="${image}" />
      <button class="delete-button red btn-danger" type="button">delete</button>
      <button class="edit-button" type="button">edit</button>
    `
  
  return newListItem;
}
