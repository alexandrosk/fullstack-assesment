# Fullstack-Assessment

In order to assess your suitability for a fullstack developer position at Underwaterpistol we have asked that you complete a short assessment. Your task is to build a `HTTP REST API` that fulfils the requirements set out in the documentation below - you should also include an `index.html` file that connects to your API and lists all records, the specific design of this page is not important but you should attempt to style it with the included `app.scss` file.

Your API can be built with either Ruby, PHP, or Javascript, but we ask that the frontend only uses vanilla Javascript with no libraries or frameworks. Please use the included `app.js` file for frontend script.

We recommend using the live sass compiler extension in VSCode.

This assessment should take between 60 and 90 minutes to complete.

## Instructions

1. Clone this repo locally (do not fork)
2. Create a new public repo on GitHub
3. Change your local remote to your new repository
4. Complete the assessment
5. Submit a link to your repository to Underwaterpistol

## Criteria 

Areas that we will use to assess your suitability include the following:
* Demonstration of git knowledge
* Maintainability of code
* Optimization strategies
* Capabilities with your chosen backend language
* Usage of semantic HTML elements
* Usage of Sass and BEM principles
* Usage of ES6 and otherwise suitable javascript
* Bonus points for frontend flair - e.g. loading states

## Documentation

This is an unsecured public API that serves as an interface for a database including people and their pets. The following endpoints are supported:

### Get

All GET requests should respond with the data requested or an error message.

`GET /people`
Returns a JSON representation of all People records in the database

`GET /pets`
Returns a JSON representation of all Pet records in the database. Includes a foreign key for "Person" owner.

`GET /people/:id`
Returns a JSON representation of a person by ID. Returns 404 if a person is not found with this ID.

`GET /pets/:id`
Returns a JSON representation of a pet by ID. Returns 404 if a pet is not found with this ID.

`GET /people/:id/pets`
Returns an array of a person's pets by ID. Returns a 404 if a person is not found with this ID, but returns an empty array if the person has no pets.

### Post

All POST requests should respond with the data of the newly created resource or an error message.

`POST /people`
Params:
* name `String`
* email `String`
* age `Integer`

Creates a new person record with the specified parameters. Returns 400 if any parameters aren't included (or cannot be cast to the correct type), or returns 201 if a person was created.

`POST /pets`
Params:
* person_id `Integer`
* name `String`
* species `String`
* age `Integer`

Creates a new pet record owned by a specified person. Returns 400 if any parameters aren't included (or cannot be cast to the correct type), 404 if the person specified was not found, or 201 if a pet was created.

### PUT

All PUT requests should respond with the data of the updated resource AFTER updates are persisted, or an error message.

`PUT /people/:id`
Params:
* name `String - optional`
* email `String - optional`
* age `Integer - optional`

Updates an existing person record with any new values in passed parameters. Returns 404 if person wasn't found, 400 if any parameters cannot be cast to the correct type, or 200 if the person was updated. 

`PUT /pets/:id`
Params:
* name `String - optional`
* species `String - optional`
* age `Integer - optional`

Updates an existing pet record with any new values in passed parameters. Returns 403 if the request attempts to change the person_id associated with the pet, 404 if pet wasn't found, 400 if any parameters cannot be cast to the correct type, or 200 if the pet was updated. 

### DELETE

All DELETE requests should respond with the data of the deleted resource BEFORE the record is destroyed, or an error message.

`DELETE /people/:id`
Deletes a specified person and their pets from the database. Returns 404 if the person was not found, or 200 if the person was deleted.

`DELETE /pets/:id`
Deletes a specified pet from the database. Returns 404 if the pet was not found, or 200 if the pet was deleted.
