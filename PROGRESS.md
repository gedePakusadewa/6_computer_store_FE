new feature
- ~login as visitor (demo)~
  - BE
    - ~add new user as visitor so visitor can use all feature without create new account~
  - FE
    - ~add button login as visitor di login page~
    - ~hide sign up button, admin still can create user by through API~
- add update/delete button
  - add update and delete button in profile
- add notification profile has been updated

bug
- BE
  - delete cart issue production
    - check why delete button not working in cart (user1)
  - url login production
    - when user directly use 6_computer_store_FE/login then it will display 404 but if user use 6_computer_store_FE (without login) then it succeed display login page
  - update constant BE
- FE
  - empty text after new search 
    - when user searct empty field inpuyt after search something else the empty result text still exist
  - notification after action
    - when user click button add to cart, there is no notification/alert that said product already being added
    - when user click delete, there is no notification said item has been deleted
  - calculate total order
    - add function to calculate total order and total price in cart
  - add go back
    - add go back button to dashbaord in detail product
  - style
    - ~update style login~
  - add loading page
    - add loading icon between page                                                           

### day 17
- add blank payment page
- add table for purchasing
- add purchased customer product
- ~add loading between page~
  - ~dashboard~
  - ~profile~
  - ~cart~
  - ~detail product~

### day 16
- ~check delete user already delete cart or not~
  - ~add URL to delete userprofile in FE~
- ~update constant in BE~
- ~Check impact FE from update constant in BE~

### day 15
- ~continue making SP for delete user and delete cart data~
- ~if demo, user cant update/delete in profile~
  - ~add disabled when user is demo~
  - ~add API to check if use is demo or not~
  - ~add validation for update/delete user in BE avoid demo user doing action~
  - ~update postmand for userdemo API~
  - ~update button update/delete when disabled~
- ~add general constant in BE~

### day 14
- add update/delete button
  - ~add update button in profile~
  - ~add delete button in profile~
  - ~add API update~
  - ~dd loading page when updating~
  - add API delete
    - delete user data
    - delete cart data based on user
  - ~add delete confirmation modal~
- profile styling
  - put component in the middle for desktop
  - change color for update button

### day 13
- check bug/add new feature in BE and FE in production/staging
- ~update style login~
- ~add new user as visitor so visitor can use all feature without create new account~
- ~add button login as visitor di login page~
- ~hide sign up button, admin still can create user by through API~

### DAY 12
- ~input  new data for product~
- FE
  - ~fix dashboard color~
  - ~fix product detail style~
  - fix cart style

#### day 11
- FE
  - template https://public-files.gumroad.com/19884uhsywwk4kmvrjoz1ruza82h
  - ~fix profile style~
  - ~fix navbar style~
  - color pallete https://colors.muz.li/palette/66bafe/4795b2/d9f5ff/b3eaff/ffffff
  - fix dashboard style


#### day 10
- FIXING bug
  - BE
    - ~bug response in API get all cart~
    - ~image url bug in search~
      - why is this only happen in search not in dashboard?
  - FE
    - ~fix profile display error~
    - search example of base color for template dashboard etc
      - use this as example color template 
- Make responsive for some specific screen
- finish design and style
- 

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