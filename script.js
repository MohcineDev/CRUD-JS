const Title = document.getElementById('title')
const Price = document.getElementById('price')
const Taxes = document.getElementById('taxes')
const Ads = document.getElementById('ads')
const Discount = document.getElementById('discount')
const Total = document.getElementById('total')
const Count = document.getElementById('count')
const Category = document.getElementById('category')
const Submit = document.getElementById('submit')

const Tbody = document.querySelector('table tbody')

let idCount = 0

//////// create and append td
const createTd = (value) => {
    let td = document.createElement('td')
    td.textContent = value
    return td
}

///load from local storage
//check if the local storage is empty or NOT
let myProducts = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []

console.log(myProducts);



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

//create product


Submit.addEventListener('click', () => {
    let product = {
        id: idCount,
        title: Title.value,
        price: Price.value,
        tax: Taxes.value,
        ads: Ads.value,
        discount: Discount.value,
        total: Total.textContent,
        category: Category.value
    }

    myProducts.push(product)
    idCount++

    //save data  in local storage
    localStorage.setItem('products', JSON.stringify(myProducts))

    addTableRow(product)

    clearInputs()
})


//read data
const fillTable = () => {

    myProducts.forEach(item => {
        addTableRow(item)
    })
}

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

    tr.append(id, title, price, tax, ads, discount, total, category)
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


fillTable()

//count

//delete

//update

// search

//clean data