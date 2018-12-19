document.addEventListener('DOMContentLoaded', () => {

  const giftList = document.querySelector('.gift-list');
  const giftForm = document.getElementById('new-gift-form');

  // fetch
  fetch("http://localhost:3000/gifts")
    .then(function(response){
      return response.json()
    })
    .then(function(giftsData){
      giftsData.forEach(function(gift) {
      // create a "gift" li DOM node
  
      const newListItem = makeNewListItem(gift.name, gift.image, gift.id);
      // newListItem.querySelector('button').addEventListener('click', function(event) {
      // })
      // add the gift to the giftList (DOM Node)
      giftList.appendChild(newListItem);
    })
  })



  // create new gifts using submit
  giftForm.addEventListener('submit', function(event){
    event.preventDefault();
    //grab input values
    const giftNameInput = document.querySelector('#gift-name-input');
    const giftImageInput = document.getElementById('gift-image-input');
    // send request to update backend
    fetch('http://localhost:3000/gifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: giftNameInput.value,
        image: giftImageInput.value
      })
    }).then(function(response){
      giftList.append(makeNewListItem(giftNameInput.value, giftImageInput.value));
      event.target.reset()
    })
    // creating new list items using the inputs values
  })

  // delete using event delgation;
  giftList.addEventListener('click', function(event){
    if (event.target.classList.contains('delete-button')) {
      let id = event.target.parentNode.getAttribute('data-id')
      fetch(`http://localhost:3000/gifts/${id}`, {
        method: 'DELETE'
      }).then(response => {
        event.target.parentNode.remove()
      })
    }

    if (event.target.classList.contains('edit-button')) {
    }
  });

})


/// helper functions:
function makeNewListItem(name, image, id){
  const newListItem = document.createElement('li');
  newListItem.dataset.id = id;
  newListItem.innerHTML = `
      <p>${name}</p>
      <img src="${image}" />
      <button class="delete-button red btn-danger" type="button">delete</button>
      <button class="edit-button" type="button">edit</button>
    `
  return newListItem;
}
