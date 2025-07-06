# Career Mentorship Platform

A comprehensive web application for connecting students with career mentors, providing CV building tools, workshop management, and more.

## 🚀 Features

- **User Registration & Profiles**: Separate flows for students and mentors
- **CV Builder**: Guided CV creation with mentor feedback
- **Workshops & Events**: Browse, register, and manage workshops
- **Mentor Directory**: Find and book sessions with industry mentors
- **Chat System**: Direct communication between students and mentors
- **Reviews & Ratings**: Feedback system for mentors and workshops
- **Localization**: Full support for Arabic and English
- **Payment Integration**: Optional payment processing for premium services
- **Admin Dashboard**: Comprehensive management tools
- **AI Session Summaries**: Automated notes and action items from mentoring sessions

## 🏗️ Project Structure

```
src/
├── assets/            # Static assets (images, icons, etc.)
├── components/        # Reusable UI components
│   ├── admin/         # Admin dashboard components
│   ├── auth/          # Authentication components (login/signup)
│   ├── chat/          # Chat interface components
│   ├── common/        # Shared UI elements (buttons, inputs, etc.)
│   ├── cv/            # CV builder components
│   ├── layouts/       # Page layout components
│   ├── mentors/       # Mentor profile and listing components
│   └── workshops/     # Workshop listing and detail components
├── contexts/          # React context providers
│   ├── AuthContext.jsx        # Authentication state management
│   └── LocaleContext.jsx      # Localization management
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   ├── auth/          # Authentication pages
│   ├── chat/          # Chat pages
│   ├── cv/            # CV builder pages
│   ├── mentors/       # Mentor directory pages
│   ├── profile/       # User profile pages
│   └── workshops/     # Workshop pages
├── services/          # API and external service integrations
├── utils/             # Helper functions and utilities
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🛠️ Technology Stack

- **Frontend**: React with functional components
- **Routing**: React Router for navigation
- **UI Components**: Material UI (MUI)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Localization**: i18next for multilingual support
- **Build Tool**: Vite for fast development and optimized builds

## 🔄 Context Providers

### AuthContext

Manages authentication state throughout the application:
- User login/signup
- Session persistence
- Role-based access control (student, mentor, admin)
- Profile management

### LocaleContext

Handles language switching and RTL/LTR layout:
- English and Arabic language support
- Direction management (RTL for Arabic)
- Translation resources

## 📱 Key Components

### Layouts

- **MainLayout**: Base layout with header, footer, and navigation
- **AuthLayout**: Layout for authentication pages
- **AdminLayout**: Layout for admin dashboard

### Common Components

- **LanguageToggle**: Switch between English and Arabic
- **ThemeToggle**: Switch between light and dark mode
- **Pagination**: Reusable pagination component
- **SearchBar**: Global search functionality
- **Rating**: Star rating component for reviews

### Feature-specific Components

- **MentorCard**: Display mentor information in directory
- **WorkshopCard**: Display workshop information in listings
- **CVForm**: Multi-step form for CV creation
- **ChatWindow**: Real-time chat interface
- **BookingCalendar**: Schedule sessions with mentors

## 🔐 Authentication Flow

1. User registration (student or mentor)
2. Profile completion
3. Email verification
4. Login with credentials or social providers
5. Role-based redirection

## 📋 Development Guidelines

- Use functional components with hooks
- Follow the container/presentational component pattern
- Keep components small and focused on a single responsibility
- Use context for global state, props for component-specific state
- Implement proper error handling and loading states
- Write semantic, accessible markup
- Follow Material UI design principles
- Support both RTL and LTR layouts

## 🌐 Localization Strategy

- All user-facing text should use translation keys
- Support for RTL layout in Arabic mode
- Language detection based on browser settings
- User preference stored in local storage

## 👥 Contribution Flow

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdelrhmanRabie3/Df3a.git
   cd Df3a
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Assign yourself to an issue** from the project board or create a new one
2. **Follow the branching strategy**:
   - `feature/` - for new features
   - `bugfix/` - for bug fixes
   - `hotfix/` - for critical fixes
   - `refactor/` - for code refactoring
   - `docs/` - for documentation updates

3. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add mentor search functionality"
   ```
   Follow Conventional Commits format:
   - `feat:` - new feature
   - `fix:` - bug fix
   - `docs:` - documentation changes
   - `style:` - formatting, missing semicolons, etc.
   - `refactor:` - code changes that neither fix bugs nor add features
   - `test:` - adding or refactoring tests
   - `chore:` - updating build tasks, package manager configs, etc.

4. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** against the `develop` branch

### Pull Request Process

1. **Fill out the PR description** with:
   - Description of changes
   - Related issue(s)
   - Screenshots (if applicable)
   - Testing instructions

2. **Request reviews** from at least one team member

3. **Address review comments** and make necessary changes

4. **Squash and merge** once approved

### Code Review Guidelines

- Check for adherence to project structure and coding standards
- Verify that the code solves the intended problem
- Look for potential bugs or edge cases
- Ensure proper test coverage
- Review for performance considerations
- Check for accessibility compliance

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Future Enhancements

- Mobile application
- Video call integration
- AI-powered CV analysis
- Expanded workshop functionality
- Advanced analytics for mentors and admins
- Community forums
