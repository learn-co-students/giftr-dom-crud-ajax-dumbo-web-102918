document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  const giftList = document.querySelector('.gift-list');
  const giftForm = document.getElementById('new-gift-form');


  // show all gifts on to the page
  // iterate over gifts (data)
  gifts.forEach(function(gift) {
    // create a "gift" li DOM node
    const newListItem = makeNewListItem(gift.name, gift.image);
    // newListItem.querySelector('button').addEventListener('click', function(event) {
    //   console.log('clicked!')
    // })
    // add the gift to the giftList (DOM Node)
    giftList.appendChild(newListItem);
  })



  // create new gifts using submit
  giftForm.addEventListener('submit', function(event){
    event.preventDefault();
    //grab input values
    const giftNameInput = document.getElementById('gift-name-input');
    const giftImageInput = document.getElementById('gift-image-input');

    // creating new list items using the inputs values
    giftList.append(makeNewListItem(giftNameInput.value, giftImageInput.value));
    event.target.reset()
  })

  // delete using event delgation;
  giftList.addEventListener('click', function(event){
    if (event.target.classList.contains('delete-button')) {
      event.target.parentNode.remove()
    }

    if (event.target.classList.contains('edit-button')) {
      console.log('edit!');
    }
  });



})




/// helper functions:
function makeNewListItem(name, image){
  const newListItem = document.createElement('li');

  newListItem.innerHTML = `
      <p>${name}</p>
      <img src="${image}" />
      <button class="delete-button red btn-danger" type="button">delete</button>
      <button class="edit-button" type="button">edit</button>
    `
  
  return newListItem;
}
