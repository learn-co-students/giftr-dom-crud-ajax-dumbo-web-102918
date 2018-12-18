document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')

  // fetching the gifts
  const giftAdapter = new GiftAdapter()

  giftAdapter.giftList(function(data){

    const giftList = new GiftList(data, ".gift-list")
    giftList.render()
    // slap the gifts on the dom
  
  });

})
