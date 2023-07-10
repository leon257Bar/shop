
class Api {
    
    constructor () {
    this.url = 'https://64957212b08e17c917921f46.mockapi.io/products';
    }
    
    async responseData(response) {
        const data = await response.json()
        return data
    }

    async getAllProductsApi () {
        const response = await fetch(this.url)
        return this.responseData(response)
    }

    async getProductsInCategory(category) {
    const response = await fetch(`${this.url}?category=${category}`)
    return this.responseData(response)
    }

    async getProductsSearch(value) {
        const response = await fetch(`${this.url}?search=${value}`)
    return this.responseData(response)
    }

    async getSortProducts(field, order) {
        const response = await fetch(`${this.url}?sortby=${field}&order=${order}`)
    return this.responseData(response)
    }
}