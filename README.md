# Sundial
## Please ignore this repository.

## Change Log
* July 4, 2016 01:46
    * Commit:
    * Added: Manage Schools Page and School Selection
    * TODO: Implement Manage School Functionality
* June 24, 2016 00:50
    * Commit: 37c70f0f03c0a488088a89e0f8b287aa8bc4f2ee
    * Moved School Registration to User feature
    * Fixed Session Persistence
    * Moved User related pages into a views subdirectory
    * Common database operation without the need of passport will now reside in the operations directory
    * Changed School data model to identify admins by User object IDs
    * Created Navbar
    * /passport/register.js has been deleted and replaced by /operations/createSchool.js
    * Switched to Bootstrap 4
    * **Note: All rendered pages must now be passed a 'user' parameter from req.user**
    * TODO: Implement school query functionality i.e. sundial.io/schoolName
* June 22, 2016 22:50
    * Commit: 9b8f139c71e376e83abd921b9b1211f6ea4a7897
    * Added: links to index page
    * Added: School Registration Functionality
    * ~~TODO: Move School Registration to User feature~~
    * TODO: Add Schedule Adding Functionality
