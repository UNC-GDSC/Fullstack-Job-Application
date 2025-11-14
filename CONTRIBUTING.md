# Contributing to Job Application Portal

First off, thank you for considering contributing to the Job Application Portal! It's people like you that make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous to others.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Fullstack-Job-Application.git
   cd Fullstack-Job-Application
   ```
3. **Install dependencies**:
   ```bash
   npm run install:all
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Setting Up Your Environment

1. **Backend Setup**:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

2. **Frontend Setup** (in a new terminal):
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env if needed
   npm start
   ```

3. **Using Docker** (alternative):
   ```bash
   docker-compose up -d
   ```

### Project Structure

```
Fullstack-Job-Application/
├── backend/           # Node.js/Express backend
│   ├── config/       # Database and configuration
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── __tests__/    # Backend tests
├── frontend/         # React frontend
│   ├── public/       # Static files
│   └── src/          # React components and logic
├── .github/          # GitHub workflows
└── docker-compose.yml
```

## Coding Standards

### JavaScript/Node.js

- Follow the existing code style
- Use ES6+ features where appropriate
- Write meaningful variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused

### React/Frontend

- Use functional components with hooks
- Keep components small and reusable
- Use meaningful component and prop names
- Follow Material UI patterns

### Formatting

We use Prettier and ESLint to maintain code quality:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
feat(api): add pagination to jobs endpoint
fix(frontend): resolve job list rendering issue
docs(readme): update installation instructions
test(backend): add tests for application routes
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features or bug fixes
3. **Ensure all tests pass**:
   ```bash
   npm test
   ```
4. **Format and lint your code**:
   ```bash
   npm run format
   npm run lint
   ```
5. **Update the README.md** if needed
6. **Create a Pull Request** with a clear title and description:
   - Describe what changes you made
   - Reference any related issues
   - Include screenshots if relevant

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated and passing
- [ ] No new warnings introduced
- [ ] Dependent changes merged and published

## Testing

### Backend Tests

```bash
cd backend
npm test                # Run tests
npm run test:watch     # Watch mode
```

### Frontend Tests

```bash
cd frontend
npm test                # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Generate coverage report
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components
- Aim for meaningful test coverage
- Mock external dependencies

## Documentation

### Code Documentation

- Add JSDoc comments for all functions
- Document complex algorithms or business logic
- Keep comments up-to-date with code changes

### API Documentation

When adding or modifying API endpoints:
1. Update the JSDoc comments in route files
2. Update `docs/API.md` with endpoint details
3. Include request/response examples

### README Updates

Update the README when:
- Adding new features
- Changing setup procedures
- Updating dependencies
- Modifying deployment instructions

## Questions?

Feel free to:
- Open an issue for bugs or feature requests
- Start a discussion for questions
- Contact the maintainers

## Attribution

This Contributing Guide is adapted from open-source contribution guidelines and best practices.

---

**Thank you for contributing!** Your efforts help make this project better for everyone.
