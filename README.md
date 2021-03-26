# Webový portál TJ Hartvíkovice

Host: [hartal-portal.herokuapp.com](https://hartal-portal.herokuapp.com/)

Heroku: [dashboard.heroku](https://dashboard.heroku.com/apps/hartal-portal/)

## API

- /api/players

  - GET - read list
  - POST - create new
  - /:id
    - GET - get players by ID
    - DELETE - delete existing players
    - UPDATE - update existing players

- /api/trainings
  - GET - read list
  - POST - create new
  - /:id
    - GET - get training by ID
    - DELETE - delete existing training
    - UPDATE - update existing training
