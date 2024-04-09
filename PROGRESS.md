bug
- BE
  - bug response in API get all cart
  - bug image url yang nggk tampil, nggak makek awalan media

- FE
  - fix profile display error
  - search example of base color for template dashboard etc

#### day 9
- BE
  - add new data product

- FE
  - ~add text empty search result~
  - fix display of dashboard
    - change to use "mobile first"
    - ~add review star icon~
    - ~add rupiah symbol and dot in currency number~

#### day 8
- BE
  - ~add API to search computer part~

- FE
  - ~add search bar~

#### day 7
- BE
  - ~create API to delete cart item~
  - add API to search computer part

- FE
  - add search bar

#### day 6
- BE
  - ~create new API to get cart product~
  - ~create new serialiser for this API~
  - create API to delete cart item

- FE
  - ~display all cart from API get cart~
  - ~Add function to calculate total price in cart page~
  - ~Add delete function to delete one item from cart page~

##### DAy 5
- BE
  - ~Add API "add to cart"~
  - Add API get cart product
    - Using SP instead of django ORM
      - ref https://www.youtube.com/watch?v=Kvf8Bj343Ds
        - kayaknya konsep SP itu sama kayak di C#/ASP.NET, bisa bikin di DB terus panggil nama SP ini di server, i choose using function instead of SP
        - try to call function from DB through django backend    

- FE
  - ~add function "add to cart" using existing API~

##### Day 4
- FE
  - ~implement query paramter react~
  - ~display proudt detail~
  - ~Add cart page~

- BE
  - Add API "add to cart"

##### Day 3
- FE
  - ~display all product with button detail, price, name, review~
  - add page to display product detail {PENDING}
  - ~Add simple page profile using API~
  
- BE
  - ~Add new APi to get product detail base on product id~
  - ~Add API to get user username and email~

##### Day 2
- BE
  - add product to DB
  - create API to get product item

##### Day 1
- ~frontend~
  - create login/signup page 
  - connect login/sign up page ke BE
- BE
  - add product to DB
  - create API to get product item

issue and solution
- what is the best way for now to upload image?
  - for now just upload it to local server