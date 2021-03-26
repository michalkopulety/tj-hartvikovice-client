# Webový portál TJ Hartvíkovice

Host: [hartal-portal.herokuapp.com](https://hartal-portal.herokuapp.com/)

Heroku: [dashboard.heroku](https://dashboard.heroku.com/apps/hartal-portal/)

MongoDB: [MongoDB Atlas](https://cloud.mongodb.com/v2/605c3a93b1bc6f79e868f2da#clusters)

## API

### Endpoints

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

### Query parameters

- $filter=field operator 'value' and ...
- $select=field1,field2...
- $sort=field1 asc,field2 desc,...
- $top=10
- $expand=trainings
