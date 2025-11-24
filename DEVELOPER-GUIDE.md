# Developer Guide - Shinhan Finance Consumer Loan Platform

This guide provides developers with the information needed to contribute to this project.

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/shinhanfinancer/vaytieudung.git

# Navigate to project directory
cd vaytieudung

# Install dependencies
npm install
```

### Available Scripts

```bash
# Run development server
npm run dev

# Run backend server only
npm run server

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
vaytieudung/
├── assets/               # Static assets (CSS, JS, images)
│   ├── css/             # Stylesheets
│   ├── img/             # Images and icons
│   └── js/              # Client-side JavaScript
├── .github/             # GitHub configuration
│   ├── ISSUE_TEMPLATE/  # Issue templates
│   ├── workflows/       # GitHub Actions workflows
│   └── agents/          # Custom agent configurations
├── dist/                # Built/compiled files
├── lib/                 # Third-party libraries (VNPT SDK)
├── models/              # Face recognition models
├── pages/               # HTML pages (Vietnamese/English)
├── public/              # Public assets
├── server/              # Backend server code
├── src/                 # Source code
├── tests/               # Test files
└── web-sdk-version-3.2.0.0/  # eKYC SDK

```

## Key Technologies

### Frontend
- **HTML/CSS/JavaScript**: Core web technologies
- **jQuery**: DOM manipulation and AJAX
- **Bootstrap**: UI framework
- **Slick**: Carousel/slider
- **Service Worker**: Offline support

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB/Mongoose**: Database (optional)
- **Redis**: Caching (optional)

### Third-Party Integrations
- **VNPT eKYC SDK**: Electronic Know Your Customer verification
- **Face-API**: Face detection and recognition
- **Nodemailer**: Email functionality
- **Twilio**: SMS functionality
- **Stripe**: Payment processing

### Development Tools
- **Jest**: Testing framework
- **Babel**: JavaScript transpiler
- **ESLint**: Code linting
- **Webpack**: Module bundler

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run specific test file
npm test -- tests/form.test.js
```

### Test Structure
- `tests/` - Main test directory
- `tests/unit/` - Unit tests
- Test files follow the pattern: `*.test.js`

### Current Test Coverage
- Form validation tests
- Utility function tests
- Face angle detection tests
- Total: 67 tests passing

## Code Quality

### Linting
The project uses ESLint for code quality:

```bash
# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix
```

### Code Style Guidelines
- Use ES6+ features (const, let, arrow functions, etc.)
- Indent with 2 spaces
- Use single quotes for strings
- Add semicolons at the end of statements
- Avoid using `var`, prefer `const` or `let`
- Minimize console.log usage (use console.warn or console.error when needed)

## Contributing

### Workflow
1. Create a new branch from `main`
2. Make your changes
3. Write or update tests
4. Ensure tests pass: `npm test`
5. Ensure code is linted: `npm run lint`
6. Commit with a descriptive message
7. Push and create a pull request

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Issue Templates
Use the appropriate template when creating issues:
- **Bug Report**: For reporting bugs
- **Feature Request**: For requesting new features
- **Technical Improvement**: For code quality or performance improvements
- **Integration Request**: For third-party service integrations

## Security

### Best Practices
- Never commit credentials or API keys
- Use environment variables for sensitive data
- Keep dependencies updated
- Follow OWASP security guidelines
- Implement input validation
- Use HTTPS for all communications

### Reporting Security Issues
Please report security vulnerabilities to: shinhanvietnam@shinhan.com

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
# Add other environment variables as needed
```

### Deployment Checklist
- [ ] Update version in `package.json`
- [ ] Run tests: `npm test`
- [ ] Run linting: `npm run lint`
- [ ] Build for production: `npm run build`
- [ ] Test production build locally
- [ ] Update CHANGELOG.md
- [ ] Create git tag for release
- [ ] Deploy to staging environment
- [ ] Perform smoke tests
- [ ] Deploy to production
- [ ] Monitor for errors

## Troubleshooting

### Common Issues

**Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Tests failing**
```bash
# Make sure dependencies are installed
npm install

# Clear Jest cache
npm test -- --clearCache
```

**ESLint errors**
```bash
# Try automatic fixes
npm run lint:fix

# If that doesn't work, review and fix manually
npm run lint
```

## Resources

- [Project README](./README.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Information Gathering Guide](./INFORMATION-GATHERING.md)

## Support

- **Email**: shinhanvietnam@shinhan.com
- **Hotline**: 1900 1577
- **Repository**: https://github.com/shinhanfinancer/vaytieudung

---

*Last Updated*: 2025-11-19
