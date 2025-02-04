I elected to use docker to make it easily testable and reproducable without needing postgres installed locally

Synchronize setting on postgres should be false in production - data loss & conflicts

Seeding module is for testing purposes - in production this would not be included, if needed should add as a script in package.json to separate it from the main app

If I had more time I would implement input sanitization on the filters and POST route
