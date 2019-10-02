# E - Commerce

Exercise project

All the endpoints API can be access from:
```jacascript
http://localhost:3000
```


* [User](#users)
  * [Sign Up](#sign-up)
  * [Sign In](#sign-in)
  * [Add Cart](#add-cart)
  * [Get Cart](#get-cart)
  * [Delete Cart](#delete-cart)
* [Product](#product)
  * [Create](#create)
  * [Find All](#find-all)
  * [Update](#update)
  * [Delete](#delete)
* [Another Error](#another-error)


## Users
+ ### Sign Up
  Method : `POST`<br>
  Endpoint : `/user/signup`

  #### _Request_ :
  * body:
    ```javascript
    {
      fullname: String(required),
      username: String(required),
      email: String(required),
      password: String(required)
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
        "must have fullname"
      ]
    }
    ```

+ ### Sign In
  Method : `POST`<br>
  Endpoint : `/user/signin`

  #### _Request_ :
  * body:
    ```javascript
    {
      email: String(required),
      password: String(required),
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 400
    ```javascript
    {
      code: 401,
      message: "Wrong username / password",
    }
    ```

+ ### Add Cart
  Method : `POST`<br>
  Endpoint : `/user/cart`

  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * body:
    ```javascript
    {
      product_id: Number(required)
      count: Number(optional)
    }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'added to cart!' }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "product_id not valid"
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided",
      "name": "ValidationError"
    }
    ```

+ ### Get Cart
  Method : `GET`<br>
  Endpoint : `/user/cart`

  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * body:
    ```javascript
    {
      product_id: Number(required)
      count: Number(optional)
    }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    [
      {
        "count": 11,
        "status": false,
        "_id": "5d62123313555d735b1ea4ce",
        "product": {
          "_id": "5d5ffbd47f4f75162e44d4be",
          "name": "nasgor",
          "stock": 90,
          "price": 10000,
          "description": "tisu ggwp",
          "img_url": "https://i0.wp.com/resepkoki.id/wp-content/uploads/2016/10/Resep-Nasgor-sapi.jpg?fit=3264%2C2448&ssl=1",
          "createdAt": "2019-08-23T14:44:36.440Z",
          "updatedAt": "2019-08-23T14:44:36.440Z"
        },
        "total_payment": 110000
      }
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided",
      "name": "ValidationError"
    }
    ```

+ ### Checkout Cart
  Method : `POST`<br>
  Endpoint : `/user/cart/checkout`

  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * body:
    ```javascript
    {
      cart_id: Number(required)
    }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'checkout success!' }
    ```
  - 401 (unauthentication)
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided",
      "name": "ValidationError"
    }
    ```
  - 401 (unauthorize)
    ```javascript
    {
      "code": 401,
      "message": "Unauthorize"
    }
    ```

+ ### Delete Cart
  Method : `DELETE`<br>
  Endpoint : `/user/cart`

  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * body:
    ```javascript
    {
      cart_id: Number(required)
    }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'cart deleted!' }
    ```
  - 401 (unauthentication)
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided",
      "name": "ValidationError"
    }
    ```
  - 401 (unauthorize)
    ```javascript
    {
      "code": 401,
      "message": "Unauthorize"
    }
    ```


## Product
+ ### Create
  Method : `POST`<br>
  Endpoint : `/product/create`
  
  #### _Request_ :
  * body:
    ```javascript
    {
      name: String(required),
      stock: Number(required),
      price: Number(required),
      description: String(required),
      image: String(required)
    }
    ```

  #### _Response_ :
  - 200
  ```javascript
  {
    "_id": "5d5ffbf0180c3f167c03afc2",
    "name": "tisu",
    "stock": 90,
    "price": 10000,
    "img_url": "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
    "createdAt": "2019-08-23T14:45:04.769Z",
    "updatedAt": "2019-08-23T14:45:04.769Z"
  }
  ```
  - 400
  ```javascript
  {
    "code": 400,
    "message": [
      "name product is required"
    ]
  }
  ```
  - 401
  ```javascript
  {
    code: 401,
    name: "ValidationError",
    message: "jwt must be provided"
  }
  ```

+ ### Find All
  Method : `GET`<br>
  Endpoint : `/product`
  
  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```

  #### _Response_ :
  - 200
  ```javascript
  [
    {
      "_id": "5d5ffbf0180c3f167c03afc2",
      "name": "tisu",
      "stock": 90,
      "price": 10000,
      "img_url": "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
      "createdAt": "2019-08-23T14:45:04.769Z",
      "updatedAt": "2019-08-23T14:45:04.769Z"
    }
  ]
  ```
  - 401
  ```javascript
  {
    code: 401,
    name: "ValidationError",
    message: "jwt must be provided"
  }
  ```

+ ### Find One
  Method : `GET`<br>
  Endpoint : `/product/:id`
  
  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * params : 
    ```javascript
    { id: PRODUCT_ID }
    ```

  #### _Response_ :
  - 200
  ```javascript
  {
    "_id": "5d5ffbf0180c3f167c03afc2",
    "name": "tisu",
    "stock": 90,
    "price": 10000,
    "img_url": "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
    "createdAt": "2019-08-23T14:45:04.769Z",
    "updatedAt": "2019-08-23T14:45:04.769Z"
  }
  ```
  - 401
  ```javascript
  {
    code: 401,
    name: "ValidationError",
    message: "jwt must be provided"
  }
  ```

+ ### Update
  Method  : `Put`<br>
  Endpoint  : `/product/:id`
  
  #### _Request_ :
  * headers : 
    ```javascript
    { token: ADMIN_TOKEN }
    ```
  * params : 
    ```javascript
    { id: PRODUCT_ID }
    ```
  * body : 
    ```javascript
    {
      name: String required,
      stock: Number required,
      price: Number required,
      img_url: String required
    }
    ```

  #### _Response_ :
  - 200
  ```javascript
  {
    "_id": "5d5ffbf0180c3f167c03afc2",
    "name": "tisu",
    "stock": 10,
    "price": 5000,
    "img_url": "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
    "createdAt": "2019-08-23T14:45:04.769Z",
    "updatedAt": "2019-08-23T14:45:04.769Z"
  }
  ```
  - 400
  ```javascript
  {
    code: 400,
    message: "name, stock, price, img_url not allowed null"
  }
  ```
  - 401
  ```javascript
  {
    code: 401,
    name: "ValidationError",
    message: "jwt must be provided"
  }
  ```

+ ### Delete
  Method : `Delete`<br>
  Endpoint : `/product/:id`
  
  #### _Request_ :
  * headers : 
    ```javascript
    token: ADMIN_TOKEN
    ```
  * params : 
    ```javascript
    id: PRODUCT_ID
    ```

  #### _Response_ :
  - 200
  ```javascript
  {
    "message": "product has been deleted"
  }
  ```
  - 401
  ```javascript
  {
    code: 401,
    name: "ValidationError",
    message: "jwt must be provided"
  }
  ```

## Another Error
  + Our mistake report this error
  ```javascript
  {
    code: 500,
    message: 'internal server error'
  }
  ```