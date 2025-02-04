I elected to use docker to make it easily testable and reproducable without needing postgres installed locally.

I added isActive field so I account for soft deletes vs hard deletes. With more time I would add a delete route.

Synchronize setting on postgres should be false in production - data loss & conflicts.

Seeding module is for testing purposes - in production this would not be included, if needed should add as a script in package.json to separate it from the main app.

If I had more time I would implement input sanitization on the filters and POST route.

To prevent DDoS I would add rate-limiting and firewalls, likely using cloudflare or AWS WAF.

To prevent SQL injections I would sanitize all inputs through the validation layer.

To implement organization based service catalogs I would create an organization model with access controls based on the user (eg Admin User).
