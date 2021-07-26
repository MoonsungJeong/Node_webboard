# Web Board
This is practice project with **Node.js**.

## summary
1. How to set up
2. Project Plan

---
### 1. How to set up



---
### 2. Project Plan
#### 1. Service Definition

General Idea
* Traditional Web Board system
* User can do CRUD
* User can make an Account
* There is a function when you lost your ID/PW
* Users has their own personal Info page to check their information
* User can see other user's brief information when user click other's ID(Ajax)

Admin
* Administrator is existed 
* Admin can access to Admin Page
* Admin Page has Member management and Board management

Board
* There are 3 type of board. Total, Free, Info
* There is a search function
* You can choose search options. Title, Content, Author

Database
* system has four tables in one Database. 1st Members, 2nd Board, 3rd Comment, 4th Message
* Members table is for User Account Information
* Board table is for Post Information
* Comment table is for Comment Information
* Message table is for User Message Information

Chat
* There is a chat function (no DB). Use Socket IO

#### 2. Market Product (Web CMS)
* Wordpress
* Drupal
* Joomla
* XpressEngine
* GNU Board

#### 3. Minimum Visual Product
|   |   |
|--|--|    
|1. Account|- Sign up|
|       |- Log in |
|       |- Lost id/pw |
|2. User   |- CRUD ( post,comment )|
|       |- Log out |
|       |- Personal Info Page |
|       |- Message to others |
|       |- See other user's Info(Ajax) |
|3. Admin  |- Admin login|
|       |- Admin pages |
|       |- Member Management (read Info, delete, message) |
|       |- Board Management (read Info, delete)  |
|4. Board  |- 3 types, Total, Free, Info |
|       |- Search Function ( Filter: Title, Content, Author) |
|5. Chat   |- Main Page. Chat Function (User only) |


#### 4. Technology
HTML, CSS, JavaScript, NodeJS, Mysql

AJax, GmailAPI

NPM: Express, Session-file-store, body-parser, helmet, sock-io, bcrypt, nodemailer, mysql, sanitizeHtml

#### 5. Project Detail Design ( Page, Server, Database)
 * Front Page List
    - Index(main)
    - Log in
    - Sign up
    - ID/PW lost
    - Total Board
    - Free Board
    - Info Board
    - Post
    - Comment
    - Write
    - Update
    - Screen bar 1 ( left )
    - Screen bar 2 ( right )
    - MyPage ( Post, Comment, Message, Info, PW, Dlt )
    - Search bar
    - User box(Info)
    - Message box
    - Admin member
    - Admin board
    - Admin box

* Server Function
    - Sign up
    - Log in
    - Log out
    - Form-check
    - Lost ID 
    - Lost PW
    - CRUD ( post, comment )
    - Socket io ( chat )
    - Message
    - Info
    - User Info
    - Admin
    - Search

* Database
    - Members
    - Board
    - Comment
    - Message

* Front pages
* Server Function 

AC : account, AD : admin, B : board, S : search

       / [get]          : read "main" front page
    AC /sign-up [get]   : 
    AC /sign-up [post]  :
    AC /form-check[post]:
    AC /login [get]     :
    AC /login [post]    :
    AC /logout [get]    :
    AC /lost [get]      :
    AC /lost/id [post]  :
    AC /lost/pw [post]  :
    AC /lost/:keyid[get]:
    AC /lost [post]     :

    B /total/:pageId [get]  :
    B /free/:pageId [get]   :
    B /info/:pageId [get]   :
    B /comment/postId/:pageId [get]:
    B /:boardId/:pageId/:postId [get]:
    B /comment/new [post]   :
    B /comment/:ccodeId [post]:
    B /comment/:ccodeId [delete]:
    B /new [get]            :
    B /new [post]           :
    B /review/:postId [post]:
    B /review/:postId [get] :
    B /review/:postId [put] :
    B /list/:postId [delete]:
    B /cancel [get]         :

    AC /info/page [get]     :
    AC /info/post/:pageNum [get]:
    AC /info/comment/:pageNum [get]:
    AC /info/message/:status/:pageNum [get]:
    AC /info/message [post] :
    AC /info/message/delete [delete]:
    AC /info/message/user [post]:
    AC /info/info [get]     :
    AC /info/info [post]    :
    AC /info/pw [get]       :
    AC /info/pw [post]      :
    AC /info/dlt [get]      :
    AC /info/dlt [post]     :
    AC /user/info [post]    :

    S /:option/:keyword/:pageId [get]:
    S /:option/:keyword/:pageId/:postId [get]:

    AD /member [get]            :
    AD /member/:userId [get]    :
    AD /member/dlt/:userId [get]:
    AD /member/post/:userId [get]:
    AD /member/comment/:userId [get]:
    AD /board [get]             :
    AD /board/dlt/:postId [get] :

    chat : socket io     
