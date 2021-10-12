# Web Board
This is practice project with **Node.js**.

## summary
1. How to set up
2. Project Plan
3. Extra

---
### 1. How to set up
#### 1-1. File list to set up

* init_template.js
* public/js/script_init.js
* db.txt
* web_board_data.sql

#### 1-2. Process to set up
##### ①. "npm install" to install modules into node_modules
##### ②. Copy "init_template.js" and paste as "init.js"
##### ③. Fill in the "connect" and "db" section of "init.js" (depend on your IP address)
##### Example : 
    connect:{
        hostname:'192.168.1.223',
        port:'3000',
        address:'http:192.168.1.223:3000'
    },
    db:{
        host:'127.0.0.1',
        user:'root',
        password:'P@ssw0rd',
        database:'web_board'
    },
##### ④. Fill in the hostname of "script_init.js" 
##### Example : 
    hostname : 'http://192.168.1.223:3000'
##### ⑤. Use SQL in "db.txt" to set up database structure
##### ⑥. Use SQL in "web_board_data.sql" to insert example data into database
#### 1-3. Email function (/lost/pw - Password search)
##### Fill in the "email" of "init.js" 
##### Gmail API is used
##### refer this website: https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
    email:{
            address:'',
            clientId:'',
            clientSecret:'',
            refreshToken:'',
            accessToken:''
    },
##### address is "Email Address"
---
### 2. Project Plan
#### 2-1. Service Definition

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

#### 2-2. Market Product (Web CMS)
* Wordpress
* Drupal
* Joomla
* XpressEngine
* GNU Board

#### 2-3. Minimum Visual Product
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

#### 2-4. Technology
HTML, CSS, JavaScript, NodeJS, Mysql

AJax, GmailAPI

NPM: Express, Session-file-store, body-parser, helmet, sock-io, bcrypt, nodemailer, mysql, sanitizeHtml

#### 2-5. Project Detail Design ( Page, Server, Database)
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

* Front page (No photos)
* Server Function 

AC : account, AD : admin, B : board, S : search

       / [get]          : read "main" front page
    AC /sign-up [get]   : read "sign up" page
    AC /sign-up [post]  : create new member and redirect to "login" page
    AC /form-check[post]: check columns (ID, Nick) of "sign up" page
    AC /login [get]     : read "login" page
    AC /login [post]    : "login" proccess. If(true), redirect to "main" page
    AC /logout [get]    : expire login session
    AC /lost [get]      : read "lost" page
    AC /lost/id [post]  : lost-id process
    AC /lost/pw [post]  : lost-pw process
    AC /lost/:keyid[get]: keyId check. If(true), read pw-reset page 
    AC /lost [post]     : key check. If(true), update pw-reset redirect to "main" page

    B /total/:pageId [get]  : read "total board"
    B /free/:pageId [get]   : read "free board"
    B /info/:pageId [get]   : read "info board"
    B /comment/postId/:pageId [get]: read "comment of postId" + pageId
    B /:boardId/:pageId/:postId [get]: read "post(postId)" in boardId + pageId
    B /comment/new [post]   : create new "comment"
    B /comment/:ccodeId [post]: create new "sub-comment" of comment (ccodeId)
    B /comment/:ccodeId [delete]: delete "comment" (ccodeId)
    B /new [get]            : read "new post" page
    B /new [post]           : "new post" process
    B /review/:postId [post]: post-user check review ok
    B /review/:postId [get] : read "post review" page
    B /review/:postId [put] : update post process
    B /list/:postId [delete]: delete post process
    B /cancel [get]         : "review cancel" process

    AC /info/page [get]     : read "MyPage" page
    AC /info/post/:pageNum [get]: read "Mypage-post" page
    AC /info/comment/:pageNum [get]: read "Mypage-comment" page
    AC /info/message/:status/:pageNum [get]: read "Mypage-message" page
    AC /info/message [post] : "message send" process
    AC /info/message/delete [delete]: "message delete" process
    AC /info/message/user [post]: user-info search for message
    AC /info/info [get]     : read "Mypage-info" page
    AC /info/info [post]    : "info change" process
    AC /info/pw [get]       : read "Mypage-pw" page
    AC /info/pw [post]      : "pw change" process
    AC /info/dlt [get]      : read "Mypage-dlt" page
    AC /info/dlt [post]     : "Account dlt" process
    AC /user/info [post]    : user-info search for brief

    S /:option/:keyword/:pageId [get]: search function
    S /:option/:keyword/:pageId/:postId [get]: read post in search function

    AD /member [get]            : read "admin member" page
    AD /member/:userId [get]    : read "member(userId) info"
    AD /member/dlt/:userId [get]: delete "member(userId)"
    AD /member/post/:userId [get]: read "post" of member(userId)
    AD /member/comment/:userId [get]: read "comment" of member(userId)
    AD /board [get]             : read "admin board" page
    AD /board/dlt/:postId [get] : delete "post(postId)"

    chat: socket.io

    chat : socket io     

* Database Tables

|Members|   |   |   |   |
|-- |------------|--------------|---------------|-----|    
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|
| P |Member_code |mcode         |Number(5,0)    |N.N  |
|   |Account     |uid           |Varchar(20)    |N.N  |
|   |Password    |upwd          |Varchar(60)    |N.N  |
|   |Name        |uname         |Varchar(30)    |N.N  |
|   |NickName    |unickname     |Varchar(30)    |N.N  |
|   |Email       |email         |Varchar(30)    |N.N  |
|   |SignupDate  |udate         |Datetime       |N.N  |
|   |SignupIp    |uip           |Varchar(15)    |NULL |
|   |BirthDate   |birthdate     |Datetime       |NULL |
|   |AuthJson    |uauth         |Json           |NULL |

|Board|   |   |   |   |
|-- |------------|--------------|---------------|-----|    
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|
| P |Post_code   |pcode         |Int(10)        |N.N, Auto Incresement|
|   |Board_code  |bcode         |Number(5,0)    |N.N  |
| F |Member_code |mcode         |Number(5,0)    |N.N  |
|   |Title       |btitle        |Varchar(100)   |N.N  |
|   |Content     |bcontent      |Text           |N.N  |
|   |BoardDate   |bdate         |Datetime       |N.N  |
|   |BoardIp     |bip           |Varchar(15)    |NULL |
|   |Count       |bcount        |Number(5,0)    |N.N,  Default 0|
|   |Likes       |blikes        |Number(4,0)    |N.N,  Default 0|
|   |Post_pwd    |ppwd          |Varchar(60)    |NULL, Default NULL|
|   |Author      |author        |Varchar(30)    |NULL, Default NULL|

|Comment|   |   |   |   |
|-- |------------|--------------|---------------|-----|    
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|
| P |IndexComment|ccode         |Int(10)        |N.N, Auto Incresement|
| F |Post_code   |pcode         |Int(10)        |N.N  |
| F |Member_code |mcode         |Number(5,0)    |N.N  |
|   |Comment     |comment       |varchar(100)   |N.N  |
|   |Class (parent,child)|cclass|Number(1,0)    |N.N  |
|   |Order (sequence in a group)|corder|Number(4,0)|N.N|
|   |GroupNum (IndexComment, parent's index for child)|groupnum|Number(4,0)|N.N|
|   |Date        |cdate         |datetime       |N.N|
|   |Ip          |cip           |varchar(15)    |NULL|
|   |Delete      |cdlt          |Boolean        |N.N, Default 0|

|Comment|   |   |   |   |
|-- |------------|--------------|---------------|-----|    
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|
| P |Note_code   |ncode         |Int(10)        |N.N, Auto Incresement|
|   |Recv_code   |recv_code     |Number(5,0)    |N.N  |
|   |Sent_code   |sent_code     |Number(5,0)    |N.N  |
|   |Note        |ncomment      |TEXT           |N.N  |
|   |Date_sent   |ndate         |datetime       |N.N  |
|   |Recv_del    |recv_del      |boolean        |N.N, Default 0|

#### 2-6. Development Process
##### ①. NodeJS server setting + PM2
-> make index.html, image, css and send to client

-> connect to DB (mysql)
##### ②. Front page Desgin
-> make HTML Tags and add 'id', 'class'

-> make css and apply

##### ③. DB table sql
-> make sql to set up DB

##### ④. Server Function Implement
-sign up

-form check

-log in/out

-CRUD (post, comment)

-search

-lost

-info

-message

-user-info

-chat

-admin

-security setup

---
### 3. Extra
#### This is my first Node project.
#### I really tried my best to make it but there are many uncompleted point.
- Validation check of front side is very simple.
- Validation check of server side isn't existed (It was too late to change all process)
#### Plase leave any comment as a "new issue" if you find something to fix or have a opinion about this project.
#### Thank you :) 