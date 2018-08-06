## Git Commands

* git init - Create a new git repo
* git status - View the changes to your project code
* git add - Add files to staging area
* git commit - Creates a new commit with files from staging area
* git log - View recent commits


## Heroku Command

* heroku login - Login to heroku CLI
* git push heroku master - Deploy to heroku using git


## Project Update Lifecycle

* git add . - Add changes
* git commit -m 'Updated code' - Commit added files with relavent comment
* git push origin master - Push committed files to git repo
* git push heroku master - Push committed files to heroku and deploy the application


## Yarn Commands

* yarn run dev-server - Initializes live dev server and will stay on watch.
* yarn run build:dev - Builds a development build
* yarn run build:prod - Builds a production build


## Some cool tools used

### babel-plugin-transform-class-properties

    ```
    Class properties are compiled to use Object.defineProperty. Static fields are now defined even if they are not initialized.

    Use Case: No need of implementing Constructor in React.Component to bind state and methods.
    ```

### babel-plugin-transform-object-rest-spread

    ```
    By default, this plugin uses Babel's extends helper which polyfills Object.assign. Enabling this option will use Object.assign directly.

    Use Case: We can now use spread operator on objects also like we can for arrays.
    ```

### ReactStrap

    ```
    This library contains React Bootstrap 4 components that favor composition and control.

    Use Case: More readability for Bootstrap class names. 
    ```

