# ToDoFlow App

This project is a simple **To-Do management application** with a **.NET Core Web API backend** and an **Angular frontend**. It allows users to create, update, toggle, and delete to-dos with support for categories, priorities, and due dates.

## Project Structure

```
/ToDoApp
├── ToDoApp-Api/      # .NET Core Web API backend
├── ToDoApp-Web/      # Angular frontend
├── README.md
├── .gitignore

```

## Backend (.NET API)

### Tech Stack

- .NET Core 8+ Web API
- Entity Framework Core with InMemory Database
- Serilog for structured logging
- RESTful API design with CRUD operations

### Key Features

- API endpoints to manage todos (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Toggle completion status
- Clear all completed todos
- Uses `ILogger` or Serilog for logging
- Well-structured models and services with proper DI
- In-memory database setup for quick testing

### Running the Backend

1. Navigate to the API project:

   ```
   cd ToDoApp-Api/Amili.EDI.ToDoApp.api
   ```

2. Run the API:

   ```
   dotnet run
   ```

3. By default, the API will listen at `http://localhost:{PORT}` as specified in your `launchSettings.json`.

## Frontend (Angular)

### Tech Stack

- Angular v18 (non-standalone modules)
- TypeScript
- CSS with modern styles
- BehaviorSubject state management for syncing todos
- HttpClient for API integration

### Key Features

- Create, edit, delete, and toggle todos
- Filter todos by `All`, `Active`, or `Completed`
- Clear completed todos with live updates
- Sleek, responsive UI layout
- Category and priority selection with icons

### Running the Frontend

1. Navigate to the frontend project:

   ```
   cd ToDoApp-Web
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the dev server:

   ```
   ng serve
   ```

4. Open [http://localhost:4200](http://localhost:4200) to see your app.

## Connecting Frontend and Backend

- The `TodoService` in the Angular app is configured with the API base URL, for example:

  ```
  private apiUrl = 'http://localhost:5285/api/todos';
  ```

- Make sure your backend is running on the expected port.
- Use `HttpClientModule` in `AppModule` to enable HTTP requests.
- CORS should be configured if needed.

## Development Notes

- Keep backend and frontend running in separate terminals.
- Update environment variables and API base URLs as needed for production.
- Commit with a clear `.gitignore` that covers both `.NET` and `Node` artifacts.
