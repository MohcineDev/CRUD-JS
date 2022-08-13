const Title = document.getElementById('title')
const Price = document.getElementById('price')
const Taxes = document.getElementById('taxes')
const Ads = document.getElementById('ads')
const Discount = document.getElementById('discount')
const Total = document.getElementById('total')
const Count = document.getElementById('count')
const Category = document.getElementById('category')
const Submit = document.getElementById('submit')

//get total
const getTotal = () => {
    if (parseInt(Price.value) !== '') {
        let result = (+Price.value + +Taxes.value + +Ads.value) - +Discount.value
        Total.textContent = result
 
    }
}

//create prodact

//save data  in local storage

//clear inputs

//read data

//count

//delete

//update

// search

//clean data