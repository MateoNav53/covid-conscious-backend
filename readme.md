**Project Overview**  
- Covid-Conscious is an accountability app where people log data of how many people they've come within six feet of in the past 14 days.   

**Details on Functionality**
- Users can log into their acount, and enter data on how many people have come within six feet of them per day. Users can also enter which places they've gone and how many people they've come in close contact at that specified place. the home page keeps a total log of how many people they've come in contact with in the past 14 days. The site also provides a Coronavirus FAQ and a link to further resources

**Technologies Used**  
- This application was built with Node.js and MongoDB Cloud Atlas on the backend with ReactJS on the frontend. PassportJS and Json Web Tokens(JWT) are used for user sign-up and login 

**Ideas for Future Improvement**  
1. Add an edit button so users can edit their logs

2. Add the option for users to delete their accounts

3. Ask users what city they live in during registration, and display covid data local to their city/community.  
  
**Notes**  
User login registration system(passport.js, user.js, conditional render functions in navbar.js, register.js, login.js, AuthService.js), Message.js, LogService.js, and Private/Public route files were inspired by the following tutorial series. https://www.youtube.com/playlist?list=PLvTjg4siRgU0HS3cANo7KZ52Wkud083TL
  
**User Stores**  
1.  As a citizen concerned about cotracting COVID-19, I want to log how many people I've been close to so I keep track of my chances of exposure.  

2.  As a person who just contracted COVID-19, I want to look back at out how many people I've come in close contact with so I can reach out to them if possible.  

3.  As an essential worker, I want to log how many people I've come in close contact with along with my coworkers, so we can share data and hold management accountable for hazard pay.  