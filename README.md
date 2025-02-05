## Description

Service Catalog Mockup

Service API supports filtering, sorting, and pagination of list of services. The API also supports fetching a specific service and its versions.

Used https://github.com/nestjs/typescript-starter.git as starter project

## Project setup

```bash
$ npm install
```

## Run the project

```bash
$ docker compose up --build
```

## API Endpoints

### GET /services

List all services with filtering and pagination.

Query Parameters:

- `name`: Search in name
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `isActive`: Filter by active status

### GET /services/:id

Get information about a specific service, including its versions.

### GET /services/:id/versions

Get versions of a specific service.

### POST /services

Create a service.

- `name`: Name of Service
- `description`: Description of Service

## Database

Login to verify records and tables.

```bash
# postgres
http://localhost:5050

# login
admin@admin.com
pgadmin4
```

## Test Plan

Implement unit testing using Jest, mock /services and /services/:id

Example Test Cases
GET /services

GET /services?name=2

GET /services?sortBy=name&sortOrder=DESC

GET /services/:id

GET /services/:id/versions

POST /services

```bash
{
  "name": "Test",
  "description": "Test"
}
```

## Design Considerations

### Data Model

- Services: Core entity containing service information (name, description)
- ServiceVersions: Related entity tracking different versions of each service
- Implemented as a one-to-many relationship between Services and ServiceVersions

### API Design

- REST endpoints
- Pagination and filtering
- Clear separation of concerns (Controllers, Services, Entities)

### Security

- Repository pattern to prevent SQL injection
- Input validation via DTOs

## Assumptions & Tradeoffs

I've assumed this project is an MVP demo for local development purposes. In an enterprise development situation I would not seed the database, have robust authentication flows using OAuth. I elected to not implement authentication for this demo as it may make testing and replicating results harder. With more time I would have implemented a JWT Auth guard with refresh tokens.

I've also assumed that the user would search by service name but not through service description.

I assumed that the GET /services route would only return the services and not the versions as I assumed that would be handled once the user clicks on a card to lead to a specific service in GET /services/:id.

I attempted to keep this project as read-only API with a POST route, with more time I would implement the other CRUD functionality. This would need more input validation and other security concerns with authentication.

Implemented Offset based pagination - tradeoff is slower run time than cursor based pagination when accounting for larger datasets with millions of records.

Versions are stored as strings. In a production environment, I would implement semantic versioning with validation.
