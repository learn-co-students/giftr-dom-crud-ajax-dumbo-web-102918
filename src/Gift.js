class Gift {

  constructor(singleGift) {
    this.gift = singleGift;
  }

  html() {
    return `<li data-id="${ this.gift.id }">
      <h2>${ this.gift.name }</h2>
      <img src="${ this.gift.image }" />
    </li>`
  }


}