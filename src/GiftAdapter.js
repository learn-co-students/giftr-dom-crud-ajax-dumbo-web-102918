class GiftAdapter {

  giftList(callback){
    fetch("http://localhost:3000/gifts")
      .then(res => res.json())
      .then(callback)
  }

}