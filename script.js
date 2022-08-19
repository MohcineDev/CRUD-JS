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

let i = 0

//////// create and append td
const createTd = (value) => {
    let td = document.createElement('td')
    td.textContent = value
    return td
}

///load from local storage
let myProducts = JSON.parse(localStorage.getItem('products'))
console.log(myProducts);

const fillTable = () => {

    myProducts.forEach(item => {
        let tr = document.createElement('tr')

        let id = createTd(item.id)
        let title = createTd(item.title)
        let price = createTd(item.price)
        let tax = createTd(item.tax)
        let ads = createTd(item.ads)
        let discount = createTd(item.discount)
        let total = createTd(item.total)
        let count = createTd(item.count)
        let category = createTd(item.category)

        tr.append(id, title, price, tax, ads, discount, total, count, category)
        Tbody.appendChild(tr)
    })
}

fillTable()

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
        id: i,
        title: Title.value,
        price: Price.value,
        tax: Taxes.value,
        ads: Ads.value,
        discount: Discount.value,
        total: Total.textContent,
        count: Count.value,
        category: Category.value
    }
    let tr = document.createElement('tr')

    myProducts.push(product)
    i++

    localStorage.setItem('products', JSON.stringify(myProducts))


    let id = createTd(product.id)
    let title = createTd(product.title)
    let price = createTd(product.price)
    let tax = createTd(product.tax)
    let ads = createTd(product.ads)
    let discount = createTd(product.discount)
    let total = createTd(product.total)
    let count = createTd(product.count)
    let category = createTd(product.category)

    tr.append(id, title, price, tax, ads, discount, total, count, category)

    Tbody.appendChild(tr)
})

//save data  in local storage

//clear inputs

//read data

//count

//delete

//update

// search

//clean data