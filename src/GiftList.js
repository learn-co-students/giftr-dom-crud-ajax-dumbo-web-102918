class GiftList {

  constructor(listOGifts, selector) {
    this.listOGifts = listOGifts;
    this.selector = selector
  }

  giftInstances() {
    return this.listOGifts.map(dumbGift => new Gift(dumbGift))
  }


  html(){
    // return this.listOGifts.map(function(dumbGiftObjectFromFetch){
    //   const giftInstance = new Gift(dumbGiftObjectFromFetch);
    //   return giftInstance.html();
    // })
    return this.giftInstances().map(gift => gift.html())
  }

  render(){
    document.querySelector(this.selector).innerHTML 
      = this.html().join("")
  }



}