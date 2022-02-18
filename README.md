This is Omar fares (cc201010) and Abdelrahman fares (cc201013) project for SSC  SS/2021.

Our project is a simple social media platform where users can register and login into their profiles. They can also chat with 
their friends . ofcourse we can't say that this is a fully functional platform, but we can say that it has the basics that allow it 
to be improved later and be a nice and simple platform.


- Users credentials
  We have set a fixed theme for our project to maintain consistency, Our theme is mainly about the SpongeBob tv series and
  all our characters are the series character and also we used a different font style which will
  make users engage more in the atmosphere of the SpongeBob series.

****It would be great if you could stick to the same theme while adding new users***********

There are 8 users , 2 of them are admins, and the others are normal users

***** Watch out the upper and lower cases while logging in *****

Admin credentials
1- Username:SpongeBob & Password:spongebob
2- Username:Patrik    & Password:patrik

Normal users credentials
3- Username:Sandy   & Password:sandy
4- Username:Eugene  & Password:karbs
5- Username:Pearl   & Password:pearl
6- Username:Gary    & Password:gary
7- Username:Sheldon  & Password:sheldon
8- Username:Squidward   & Password:squidward



- Criteria:
What have we done----
1- Users can be: displayed, added, updated & deleted
2- New users can register themselves, and the password is saved encrypted in the database
3- Users can log in and log out (using JWT)
4- Only users with the role "Administrator" can change data
5- There is a chat with different rooms and users can switch between rooms.
6- There is another table in correspondence with the users that also has its own model, controller and views implemented.


Optional Criteria:
7- Nice overall design that is consistent throughout all views and appealing to a user
8- Documentation: functions have comments that explain what the function does so that you still know
it what your code does if you read it in one year
9- Everything works as expected and there are no unhandled errors or blank pages
10- Code is tidied up, clean and self-explanatory
11- Picture upload works and uses UUID
12- Users can upload/update their profile pictures.
13- The chat uses the name of the user when logged in and else „guest”
14- Only administrators can view all user data
15- Everything was submitted correctly (no node_modules, easy but detailed enough description
for the lecturer how to start the project and test it, etc)


How to start the Project :
1-	When running the server, you will be directed to the home page, In the home page header/navbar you can find all the features you can access
(login, register, chat, users), and when scrolling down you can find an about us button that direct to the about us page ,
which contain more personal information about us “Application developers” , this page can be accessed without the need to login in.

2-	The chatting page is also from the pages that can be accessed without the need to login in,
as the (home page, about us page). When accessing the chat without login , you will find that you can chat as a guest.
but when login, you  are going to be chatting as a user with the name you inserted while login."character FirstName"

3- To access the other features, this can be done either by using the login credentials we mentioned above
or to fill the registration form to be registered as a new user so then you can use the information you inserted
“character Firstname + password” and login.

Note: While registering it isn’t obligatory to add image, and you will be given the default image.

4- Using the normal user login credentials 'not admin' or adding a new user by registering,
will allow you just to view your profile, In addition to  users page but wont allow you to access other users profile/information ,Also you
can use the chat too, and your username/characterName will be there .

5- What can be done also is to Log out "using button in navbar" and then login in again but with the admin credentials, that will allow you to
access all features .You will have  the ability to access all the user’s information "views" and to edit their information and to
delete the user.
