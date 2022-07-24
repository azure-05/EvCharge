// JS File

// var addItemId = 0; 
	//function addToCart (item) {
		//addItemId += 1; 
		//var selectedItem = document.createElement('div');
		//selectedItem.classList.add('cartImg');
		//selectedItem.setAttribute('id', addItemId);
		//var img = document.createElement('img');
		//img.setAttribute('src', item.children[0].currentSrc);
		//var title = document.createElement('img')
		//title.innerText = item.children[1].innerText;
		//var label = document.createElement('div');
		//label.innerText = item.children[1].children[0].innerText;
		//var select = document.createElement('span');
		//var cartItems = document.getElementById('title');
		//selectedItem.append(img);
		//cartItems.append(selectedItem);
		
	//}
	
	//const cartIcon = document.querySelector('.cart-arrow-down')
	//const wholeCartWindow = document.querySelector('.whole-cart-window')
	
	//cartIcon.addEventListener('mouseover', ()=>{
		//if(wholeCartWindow.classList.contains('hide'))
		//wholeCartWindow.classList.remove('hide')
	//})
	
	class CartItem{
		constructor(name, desc, img, price){
			this.name = name
			this.img = img
			this.price = price
			this.quantity = 1	
		}
	}
	
	class LocalCart{
		static key = 'cartItems'
		
		static getLocalCartItems(){
			let cartMap = new Map()
			const cart = localStorage.getItem(key)
			if(cart===null || cart.length===0) return cartMap
				return new Map(Object.entries(JSON.parse(cart)))
		}
		
		static addItemToLocalCart(id, item){
			let cart = LocalCart.getLocalCartItems()
			if(cart.has(id)){
				let mapItem = cart.get(id)
				mapItem.quantity +=1
				cart.set(id, mapItem)
			}
			else
				cart.set(id, item)
			localStorage.setItem(key, JSON.stringify(Object.fromEntries(cart)))
			updateCartUI()
		}
		
		static removeItemFromCart(id){
			let cart = LocalCart.getLocalCartItems()
			if(cart.has(id)){
				let mapItem = cart.get(id)
				if(mapItem.quantity>1){
					mapItem.quantity -=1
					cart.set(id, mapItem)
				}
				else
					cart.delete(id)
			}
			if (cart.lenght===0)
				localStorage.clear()
			else
			localStorage.setItem(key, JSON.stringify(Object.fromEntries(cart)))
			updateCartUI()
			
		}
	}
	
	const addToCartBtns = document.querySelectorALL('.product-button')
	addToCartBtns.forEach( (btn)=>{
		btn.addEventListener('click', addItemFunction)
	})
	
	//function addItemFunction(e){
		//const id = e.target.parentElement.parentElement.getAttribute("data-id")
		//const img = e.target.parentElement.previousElementSibling.src("data-id")
		
		//console.log(img)
	//}
	
	function addItemFunction(e){
    const id = e.target.parentElement.parentElement.getAttribute("data-id")
    const img = e.targetparentElement.previousElementSibling.src
    const name = e.target.parentElement.previousElementSibling.textContent
    let price = e.target.parentElement.children[0].textContent
    price = price.replace("Price: $", '')
    const item = new CartItem(name, img, price)
    LocalCart.addItemToLocalCart(id, item)
 console.log(price)
}