# HANDEL

## SENG 513 Final Project Report

Group Number:	Group 16

Group Members:	Dominic Hul, Zoe King, Randy Le, Rayce Rossum, Vincent Wong

Project:		Online Trade Application

## 1. INTRODUCTION

### 1.1 Background

*General background.  Why useful, who would use, how it would benefit, etc.*



#### **_"We’re like Uber… but for couriers."_**



The emergence of social media platforms such as Facebook, Instagram, and Snapchat has created a gap in the market for people who have been exposed to products that they would like to buy, but who have no way of obtaining those products without paying outrageous shipping fees.  Our application, Handel, aims to connect these potential buyers with travellers (henceforth referred to as Handelers) who would already be going to the product’s location and would therefore be able to transport those products to the buyer at a fraction of the cost.   

Handel would benefit the buyers who would be able to obtain their desired products and the Handelers who would earn extra money for minimal extra work.  Handel would also benefit economies around the world by adding more customers to their markets. People around the world would be incentivized to shop in markets they were once reluctant to shop in due to hefty shipping and customs fees. By reducing financial overhead and complication, both the buyers and Handelers benefit from and be encouraged to use our application.

### 1.2 Project Goals

*Overall goals of project.  *

The goal of this project was to create a social networking platform that connects buyers and Handelers on a one-to-one basis. In order to differentiate ourselves from other ecommerce businesses and enterprises, our project aims to reduce the overhead that accompanies typical e-commerce transactions. The proposed functionality of this platform was: buyers can post requests for items, Handelers can review and accept requests, and Handelers and buyers can communicate with each other within the app. Additionally, in current businesses and applications, when one buys a product from overseas or from a foreign location, customer support and status updates are almost always absent. Our project aims to reduce automated support and create a more personal experience between client and server.

### 1.3 Project Accomplishments

Given the current implementation, users may register with the website and creating postings or listings for their desired items. If the user is a Handeler, then they may view and filter listings that they can accept. When a Handeler accepts a listing, a conversation will be started and the two users may communicate further about the transaction. Along with the features discussed above, users may update their profile settings, account settings, and if the user is a buyer, they have the option to upgrade their account type to Handeler.



## 2. PROJECT DESCRIPTION

*User manual.  Task descriptions with screenshots and explanations.  Document all UI elements.  Not too technical.  Include instructions for all user groups.*



There are two user types in our application, buyers and Handelers.   Some functionality, such as login/logout, is available to both types.  Other functionality, such as accepting a listing, is limited to one user type exclusively.  The following task descriptions are grouped into the categories: Buyers, Handelers, or All Users.

## **User Type: All Users**

**Login:**

Users who have previously made an account can login by:

1. Entering their username or email.

2. Entering their password.

3. Selecting "Login" to advance to the next screen and begin using the application.

**Create an Account:**


Users can create a new account by:

1. Selecting the "Create an account?" hyperlink.

2. Entering an optional username. Usernames must be greater than 1 character.

3. Entering their email address.

4. Entering a password.

5. Re-typing the password.

6. Selecting the Register button.

**Logout:**


Once users have logged in and are inside the application, they can logout by:

1. Selecting the "My Account" dropdown in the top right.

2. Selecting "Logout".

**Profile Settings:**


Users can edit their profile by:

1. Selecting the "My Account" dropdown in the top right.

2. Selecting "Profile Settings" (currently only profile setting to change is the user’s location).

3. Entering a new location.

4. Pressing the "Submit" button.

**Account Settings:**


Users can edit their account by:

1. Selecting the "My Account" dropdown in the top right.

2. Selecting "Account Settings".

3. Edit password and/or email

4. Pressing the submit button.

**Viewing User Profiles:**


Buyers and Handelers can view their own profile details (username, country, rating, etc.) by:

1. Selecting the "My Account" dropdown in the top right.

2. Selecting "My Profile".



Additionally, Handelers can view the profiles of the buyers who have created a listing by:

1. Selecting the "More" hyperlink on a listed item.

2. Selecting the username hyperlink in the "User" row of the pop-up window.

**Create a Listing:**


Users can create a new listing by:

1. Selecting "Create a Listing" in the top right of the screen.

2. In the pop-up window, entering an item name.

3. Uploading an optional picture of the item.

4. Selecting an optional item location.

5. Entering optional additional details or comments.

6. Selecting "Submit".

**Editing a Listing:**

Once users have created a listing, they can edit that listing by:

1. Selecting the "Edit" hyperlink on the listing that they wish to modify.

2. Users can then edit the item, image, item location, and item description.

**Removing/Closing a Listing:**

Once users have created a listing, they can remove that listing by:

1. Selecting the "Close" hyperlink on the listing that they wish to modify.

2. If a Handeler has previously accepted the listing. A popup modal will ask to give him/her a rating.
*If multiple Handelers have accepted the listing, the buyer can choose which one to rate.

*Any associated conversations with the listing will also be removed

## **User Type: Buyer**

All of the buyer functionality is also available to Handelers and is therefore detailed above in the section "User Type: All Users".   

## **User Type: Handeler **

**Sorting Listings by Location:**

Handlers can sort listings by buyer location and/or by item location.  This is done by:

1. To sort by buyer location, the handler can select a country from the dropdown menu under the text "Buyer Location".

2. To sort by item location, the handler can select a country from the dropdown menu under the text "Item Location".

3. The user then selects the orange "Submit" button.

4. To reset the filter, Handelers may press the "Reset Filters" button

**Viewing a Listing:**

A Handeler can view a buyer’s listing by:

1. Selecting the "More" hyperlink in the “Further Details” column of the listing.

**Accept a Listing (same image as above):**

Once a Handeler has navigated to a listing, they can accept that listing by:

1. Pressing the "Accept" button on the bottom right of the popup window.  

2. This will start a conversation between the Handeler and buyer. Any further details may be discussed between the two parties.

**Messaging: **

Once a Handeler has accepted a listing, an entry is added to the Handeler and the buyer’s messaging tab. Selecting this tab will open a conversation between the Handeler and the buyer in which they can communicate in real time in order to discuss the details of their delivery. All chat history is shown for the entire conversation. Messages are sent by pressing the enter key when a message is entered into the text input.



3. PROPOSAL COMPARISON

*Compare proposal and final.  Discuss and justify differences and additions.  Technical.*

Between the proposed project and final product, most of the discrepancies would be classified as not implemented with the remaining differences being changed functionalities. The proposed project, while taking scope of the project into consideration, included ambitious and enthusiastic functionality. These functionalities were considered as bonus or convenient. Naturally, most of these features ended up as not implemented, along with other features due to the time constraints of the project and with further understanding of the project requirements.

Some features or functionality regarding user registration were not implemented. One of these registration functionalities is initial verification. In other words, when a user initially registers, they will not be granted full functionality until they verify their account via email confirmation. Additionally, users were intended to have the ability to register as a trusted user by linking one of their other social media accounts or their phone number. To follow up, our initial proposal also considered a variety of security measures such as 2-factor authentication, having limited login attempts, and a Captcha system. These registration and security functionalities were not implemented due to time constraints.

As for general use-case functionalities of the proposed implementation that are not present in the current implementation, these features were generally not implemented due to time constraints. Functionalities regarding viewing user profiles, specifically, specifying on one’s own personal profile what they wish to keep private and public, and viewing a user’s post history are not implemented. In addition, our project had intended to give Handelers the ability to post their own ads (seller ads) that would contain their location, destination(s), and travel dates, so buyers could contact Handelers about an item from their destination(s). Most of these functionalities were not implemented due to the scope of the project. With further understanding of the requirements, we decided not to include these functionalities.

Features that were considered bonus/convenient in the proposed project were mostly not implemented. These features include the following: the ability to request and ping geolocations between users, implementing a Moderator user type, and having an automated payment/transaction system. Having the ability to request and ping geolocations between users would help users find each other. Handelers would also be able to checkpoint their travels so that the buyer could get status update or understanding of their transaction’s progress. Also intended to have implemented, was a Moderator user type. This Moderator user would be able to scan through and view listings on the website. If any particular listing violates the terms of service, the posting will be removed and the user could possibly be reprimanded depending on the level of violation. Finally, the last functionality under the bonus features is the automated payment/transaction system. This feature would allow users to handle their payments online in a quick and secure fashion. With our current implementation, users would contact each other and hash out further details one-on-one through the messaging system.

Given the current implementation, a major difference from the proposed project would be the overlying communication system. In the proposed project, any and all users could chat with one another and given that the proposed project included Handelers being able to post seller ads, both buyers and Handelers would initiating communication. With the current implementation, Handelers are not able to post seller ads, therefore the only initiation of chat would be the Handeler accepting the buyer’s posting. Again, as explained in above sections, once the Handeler accepts a listing, chat will be prompted between the users.

As a result, the main differences between the proposed project and the current implementation of the project, are functionalities that were not implemented due to several factors. The proposal included several ambitious features that were excluded from the final implementation, as well as features that there just wasn’t enough time for. Furthermore, with a clearer understanding of the requirements and scope of the project, choices were made to exclude certain elements, simply because the requirements of the project were already fulfilled. The inclusion or expansion of these functionalities would be considered supplemental.

4. REQUIREMENTS

*Does our project meet requirements? *

The original project requirements were:

	![image alt text](image_13.png)

All of the original requirements of the project were met. For further details, a justification for each is given:

## **Single Page Interface**

Aside from the login page for users and the respective registration page, our application’s functionality is confined to one page. On this single page, users may change their profile settings, account settings, create listings, edit their listings (including deletion), view and filter other listings, and accept listings. Additionally, they are able to communicate with each other via the messaging bar at the bottom of the page.

## **Use of mostly HTML, CSS, and JavaScript**

To correspond with the requirements of the course we utilized HTML, CSS and Javascript with jQuery and jQuery plugins for our client side development of Handel.

## **Tested on Chrome and Firefox**

For both usage and testing, we used Google Chrome and Mozilla Firefox for our application. Our application works fine in both, with the exception of a few issues in Firefox. These issues are related to the AdBlock system in Firefox. Google Chrome without AdBlock is recommended for use.

## **Mobile Support**

Our application offers a responsive user interface and therefore works well on mobile platforms. By making extensive use of Bootstrap’s responsive user interface and standard HTML5 elements, our application provides the same functionality and experience for all devices.

## **Node.js on Server**

To correspond with the requirements of the course we utilized Node.js as well as the Express framework for our server side development of Handel.

## **Support for Multiple/Simultaneous Users**

Since our application uses a client/server architecture, multiple and simultaneous users may connect to our website. Users may simultaneously use our application’s features and functionalities, including the ability to communicate with each other via the messaging interface.

## **User Authentication**

Users are prompted to login to our website before usage and may register if they have not yet registered to the system. Our authentication system makes use of libraries from passport.js and cookies in order to retain users’ session information.

## **Persistence**

Persistence is present in our application because users may not only create, edit, and view others’ profiles, but they may create listings of their desired items. These listings persist on the page with locations so they may be filtered out until a user deletes or closes the listing, indicating the deletion or completion of a listing. Messaging histories between users are also saved privately.

## **Interaction Between Users**

Users may interact with each other by accepting each other’s listings. When they accept a listing, chat will be prompted between the respective users and they will further interact with each other for their one-to-one transaction via the messaging system.

5. TECHNOLOGIES

	*Describe and justify technologies used.*

*In this section you will also need to describe in detail how to run your project from the submitted*

*sources. If there are any special requirements to run your project, you must include them here (e.g. operating system, extra libraries, external servers or services).*

## **PostgreSQL **

	PostgreSQL[1] is an open-source object-relational database system.  A PostgreSQL database was used for storing and retrieving all necessary data. PostgreSQL was specifically used for convenience, combined with Heroku. Heroku provides database services, utilizing PostgreSQL.

Five tables were used for for operation of the site:

1. Listings: Stored all data associated with each listing. Listing data included; an ID number, timestamp of when the listing was posted, buyer’s username, item name, image name in file directory, buyer’s location, item location, and  item description/detail.

2. Messages: Held messages within a conversation. Data included; an ID number, timestamp, username of sender, username of receiver, the message, and conversation ID.

3. Messaging: A higher level abstract of the Messages table. Each conversation between a buyer and a Handeler would be identified in one row. Messaging data included; an ID number, timestamp, Handeler username, buyer username, Listing ID number, and a conversation ID.

4. Profiles: Stored data intended for public viewing. Data includes; ID number, timestamp, username, account type (buyer or Handeler), country, rating (if Handeler), and total ratings (if Handeler).

5. User: Held confidential user information. Data includes; an ID number, username, email address, and password hash (passwords hashed using bcrypt with added salt for further security)

## **Bootstrap**

	Bootstrap[2] is an HTML, CSS and JS framework used to develop responsive web applications. Overall, Bootstrap was used for convenience. It allowed for more time and focus in back-end development.

## **Bootstrap Modals**

	Bootstrap Modals[3] are lightweight JavaScript popup windows that are customizable and responsive. Due to a one-page interface requirement, Bootstrap modals made it easier to enable extended features without having the need to hide and show portions of the main page.

## **Languages**

	This application was developed using HTML, CSS, JavaScript, and SQL.

## **Node.js and Express**

	Node.js[4] is an asynchronous event driven JavaScript runtime which was designed to build scalable network applications. We opted on using Node.js Express over plain the Node.js framework, mainly due to its routing features. With Node.js Express, development between contributors was made easier, by utilizing routing to separate modules. Documentation for Node.js Express was also much more comprehensible than that of the regular Node.js framework.  

## **Heroku**

Heroku[5] is a container-based cloud Platform as a Service that is used to deploy, manage, and scale apps. We used Heroku as it provided a free, full service for hosting our web app. Heroku provided our application with both basic web hosting, as well as hosting our PostgreSQL database. Furthermore, Heroku made it easy to deploy our web app whenever updates were made through its GitHub plugin.

## **BCrypt**

	BCrypt[6] serves for password hashing. We utilized this for storing user passwords. Each password is hashed with an added salt, for further security. Without knowing the salt value, attackers are much less likely to decrypt the hash.

## **Passport.js**

	Passport.j[7] is an authentication middleware for Node.js, with support for Node.js Express applications. Passport.js was used for basic user authentication, dealing with login and registration functions.

## **Socket.IO**

	Socket.IO[8] is used solely for the messaging feature of the application. This allows our users to communicate in real time without having to refresh the page or load an inbox.

## **Running Handel**

	Handel runs on a standard Node.js stack with PostgreSQL as a backend. In order to run the program locally you must setup a local Postgres server with the name, "handel" and password, “password”. Our database is bootstrapped upon each start of the server giving us a clean install with standard data to work from as well as cleaning up the database on each deploy therefore no tables need to be created manually.

	Once Postgres is installed and configured, open the project folder and run the command "npm install" which will install all the necessary plugins from the Node package manager. After a few minutes this will complete and you will be able to run the program using the command “node index.js”. This command will bootstrap the database and start the application.

6. FUTURE WORK

*Given more time what would we add or change?*

Given more time to work on this project, there are a variety of things that we would implement and change. Most of these changes would consist of the functionalities that we did not include in the implementation, as discussed in the *Proposal Comparison* section, as well as additional work.

Related to security and user information, we would implement the following: 2-step verification, limited login attempts, a Captcha to avoid spam and abuse of the web server, e-mail verification, and allowing users to choose what parameters of their profile they wish to keep public or private. Additionally, we would like to implement the ability for users to view both their own and each other’s post history. For moderation and safety purposes, the implementation of a Moderator user type would be included as well in order to remove posts and control users that violate our terms of service. We would add these features for the sake of increasing the quality of user security, user experience, and user interactions.

In order to increase application functionality, there are many areas we would improve on or add to. An important functionality to implement for our application would be a geolocation feature that allows users to ping/request each other’s locations. We would also implement listings to potentially contain greater detail. For example, rather than just having the item’s location, one could specify the city it may be found in, or further instructions about the item’s location. On top of that, we would implement the ability for Handelers to be able to post their own seller ads. With the addition of this functionality, buyers would be able to initiate chat with Handelers and vice versa through their listings as opposed to the current implementation where Handelers may only accept buyer’s listings. Furthermore, we would implement a feature that allows Handelers to view their currently accepted listings, whereas in the current implementation Handelers may only access these listings through the messaging window. It would also be useful for messaging to display a notification to the user in the application, as well as allow users to respond via email to messages sent within Handel.

Should we decide to take this application/idea to a serious, business-oriented level, we would include the following: an automated, in-application payment system, and an Escrow system. For further success, we would potentially create room for advertisements within the application.

7. CONCLUSIONS

*Anything else we want to talk about.  Link to github repo containing all sources. *

In conclusion, we hope Handel will allow our Handelers to subsidize their travel, and our buyers to get the items they want at a lower cost than traditional shipping methods. Handel has a long way to go to being a marketable product but as a proof of concept we believe we have a solid core concept that given a critical mass of users and more time to develop features could be a viable product in these times of increasing globalization.

[https://github.com/RayceRossum/SENG513-16](https://github.com/RayceRossum/SENG513-16)

[https://off-the-handel.herokuapp.com](https://off-the-handel.herokuapp.com)

8. REFERENCES

[1] PostgreSQL: About. (2017). Postgresql.org. Retrieved 14 April 2017, from https://www.postgresql.org/about/

[2] Mark Otto, a. (2017). Bootstrap · The world's most popular mobile-first and responsive front-end framework.. Getbootstrap.com. Retrieved 14 April 2017, from [http://getbootstrap.com](http://getbootstrap.com)

[3] Bootstrap Modals. (2017). W3schools.com. Retrieved 14 April 2017, from https://www.w3schools.com/bootstrap/bootstrap_modal.asp

[4] Foundation, N. (2017). About | Node.js. Nodejs.org. Retrieved 14 April 2017, from https://nodejs.org/en/about/

[5] About Heroku | Heroku. (2017). Heroku.com. Retrieved 14 April 2017, from https://www.heroku.com/about

[6] Bcrypt. (2017). Wikipedia.com. Retrieved 15 April 2017, from  [https://en.wikipedia.org/wiki/Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)

[7] Passport.js. (2017). Passport.js Retrieved 15 April 2017, from [http://passportjs.org/](http://passportjs.org/)

[8] Socket.io. (2017). Socket.io Retrieved 15 April 2017, from https://socket.io/
