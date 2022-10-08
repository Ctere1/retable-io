<h1 align="center">
  <br>
  <a ><img src="https://barn2.com/wp-content/uploads/2020/06/748123_Featured-image-for-Barn2-back-in-stock-notification_Op3_061720.png" alt="Markdownify" width="200"></a>
  <br>
  Stock Management API
  <br>
</h1>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> 
</p>

## Features

* Create a Product
  - Create a product with unique "id" (mandatory), "name" and "inventory". API does not allow to create duplicate product with same "id".
* Update a product
  - Update the product's "name" and "inventory". "id" is mandatory to update the product. "id" can not be updated.
* Get all products  
  - Returns all the products array with product count.
* Get a single product
  - Returns a single product object by "id".
* Delete a product
  - Delete a product by "id".

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Ctere1/retable-io
# Go into the repository
$ cd retable-io
# Install dependencies
$ npm install
# Run the app
$ npm start
```

## Credits

This software uses the following open source packages:

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Axios](https://github.com/axios/axios)
