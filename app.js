import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsettings = {
    databaseURL: "Your_DataBase_Url",
}

const app = initializeApp(appsettings)
const db = getDatabase(app)
const dbRef = ref(db,"itemsdb")

console.log(app);

const itemFieldEl = document.getElementById('item-field')
const addButtonEl = document.getElementById('add-button')
const cartitemsEl = document.getElementById('cart-items')

addButtonEl.addEventListener("click", function() {
  let itemEl = itemFieldEl.value
  push(dbRef, itemEl)
  clearitemFieldEl()
})

function clearitemFieldEl() {
  itemFieldEl.value = ""
}

onValue(dbRef, function(snapshot) {

    if (snapshot.exists()) {
        let data = Object.entries(snapshot.val())
        clearcartitemsEl()

        for (let key in data) {
            let currentItem = data[key]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            renderCartItems(currentItem)
        }
    }
    else {
        cartitemsEl.innerHTML = "No items here...Yet"
    }
    
})

function clearcartitemsEl() {
    cartitemsEl.innerHTML = ""
}

function renderCartItems(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {

        let locationdbref = ref(db, `itemsdb/${itemID}`)
        
        remove(locationdbref)
    })

    cartitemsEl.append(newEl)
}
