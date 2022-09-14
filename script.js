const Title = document.getElementById('title')
const Price = document.getElementById('price')
const Taxes = document.getElementById('taxes')
const Ads = document.getElementById('ads')
const Discount = document.getElementById('discount')
const Total = document.getElementById('total')
const Count = document.getElementById('count')
const Category = document.getElementById('category')
const Submit = document.getElementById('submit')
const searchInput = document.querySelector('#search')
const form = document.querySelector('form')

const searchTitle = document.querySelector('#searchTitle')
const searchCategory = document.querySelector('#searchCategory')
const Clear = document.querySelector('#clear')

//error msg
const searchError = document.querySelector('#searchInput span')

const Tbody = document.querySelector('table tbody')


//////// create and append td
const createTd = (value) => {
    let td = document.createElement('td')
    td.textContent = value
    return td
}

///load from local storage
//check if the local storage is empty or NOT
let myProducts = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []

// set the initial id value
let idCount = myProducts.length ? myProducts[myProducts.length - 1].id + 1 : 1

const checkInput = (value) => {
    return isNaN(parseInt(value)) ? 0 : parseInt(value)
}

//get total
const getTotal = () => {

    if (checkInput(Price.value) != '') {
        let result = (checkInput(Price.value) + checkInput(Taxes.value) + checkInput(Ads.value)) - checkInput(Discount.value)
        Total.textContent = result
        Total.style.backgroundColor = 'rgb(204, 253, 204)'
    }
    else {
        Total.style.backgroundColor = '#f77575'
        Total.textContent = '--'
    }
}

//the product id to update
let productIndex

//updating state
let updateMode = false

//create product
form.addEventListener('submit', () => {

    let countNum = checkInput(Count.value)
    if (!updateMode) {

        if (countNum) {
            for (let i = 0; i < countNum; i++) {
                let product = {
                    title: Title.value,
                    price: Price.value,
                    tax: Taxes.value,
                    ads: Ads.value,
                    discount: Discount.value,
                    total: Total.textContent,
                    category: Category.value
                }
                product.id = idCount
                addTableRow(product)
                myProducts.push(product)
                idCount++
            }
            clearInputs()
        }

    }
    else {
        myProducts[productIndex].title = Title.value
        myProducts[productIndex].price = Price.value
        myProducts[productIndex].tax = Taxes.value
        myProducts[productIndex].ads = Ads.value
        myProducts[productIndex].discount = Discount.value
        myProducts[productIndex].category = Category.value

        Count.disabled = false
        Submit.textContent = "Create"
        fillTable()
        updateMode = false
    }
    //save data  in local storage
    localStorage.setItem('products', JSON.stringify(myProducts))

    getTotal()
})


//add one table Row tr
const addTableRow = (item) => {
    let tr = document.createElement('tr')

    let id = createTd(item.id)
    let title = createTd(item.title)
    let price = createTd(item.price)
    let tax = createTd(item.tax)
    let ads = createTd(item.ads)
    let discount = createTd(item.discount)
    let total = createTd(item.total)
    let category = createTd(item.category)

    //btns
    let deleteTd = document.createElement('td')
    let deleteBtn = document.createElement('button')
    deleteTd.appendChild(deleteBtn)
    deleteBtn.textContent = 'delete'
    deleteBtn.setAttribute('id', 'delete')
    //delete item event
    deleteBtn.addEventListener('click', () => deleteProduct(item.id, deleteBtn))

    let updateTd = document.createElement('td')
    let updateBtn = document.createElement('button')
    updateTd.appendChild(updateBtn)
    updateBtn.textContent = 'update'
    updateBtn.setAttribute('id', 'update')

    //update item
    updateBtn.addEventListener('click', () => updateProduct(item.id))

    tr.append(id, title, price, tax, ads, discount, total, category, updateTd, deleteTd)
    Tbody.appendChild(tr)
}

//clear inputs
const clearInputs = () => {
    Title.value = ''
    Price.value = ''
    Taxes.value = ''
    Ads.value = ''
    Discount.value = ''
    Total.textContent = ''
    Count.value = ''
    Category.value = ''
}

//read data
const fillTable = () => {
    //remove all the rows
    Tbody.innerHTML = ''
    myProducts.forEach(item => {
        addTableRow(item)
    })

}

//delete
const deleteProduct = (id, btn) => {
    //delete from ui table
    btn.parentElement.parentElement.remove()
    //delete from localStorage
    let itemIndex = myProducts.findIndex(item => item.id == id)
    myProducts.splice(itemIndex, 1)
    localStorage.setItem('products', JSON.stringify(myProducts))
}

//update
const updateProduct = (id) => {
    let itemIndex = myProducts.findIndex(product => product.id == id)
    let targetProduct = myProducts[itemIndex]

    Title.value = targetProduct.title
    Price.value = targetProduct.price
    Taxes.value = targetProduct.tax
    Ads.value = targetProduct.ads
    Discount.value = targetProduct.discount
    Category.value = targetProduct.category

    getTotal()
    Count.disabled = true

    Submit.textContent = "Update"
    productIndex = itemIndex

    updateMode = true
}

fillTable()


// search

const searchProducts = (e) => {

    let foundProducts = []

    if (!searchInput.value) {
        searchError.style.display = 'block'
        return false
    }
    if (e.target.id === 'searchTitle') {
        foundProducts = myProducts.filter(product => product.title.toLowerCase() === searchInput.value.toLowerCase())

        //remove all the rows
        Tbody.innerHTML = ''
        foundProducts.forEach(item => {
            addTableRow(item)
        })
    }
    else if (e.target.id === 'searchCategory') {
        foundProducts = myProducts.filter(product => product.category.toLowerCase() === searchInput.value.toLowerCase())

        //remove all the rows
        Tbody.innerHTML = ''
        foundProducts.forEach(item => {
            addTableRow(item)
        })
    }
    Clear.style.display = 'block'
    searchError.style.display = 'none'

}

searchTitle.addEventListener('click', e => searchProducts(e))
searchCategory.addEventListener('click', e => searchProducts(e))

Clear.addEventListener('click', (e) => {
    fillTable()
    searchInput.value = ''
    e.target.style.display = 'none'
})
//clean data