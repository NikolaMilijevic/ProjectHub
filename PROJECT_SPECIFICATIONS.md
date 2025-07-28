# ProjectHub - Test Project Specifications

## 📋 Project Overview

**ProjectHub** is a modern project management application designed as a test project to evaluate capabilities in full-stack development. The application provides CRUD operations for project management with a clean, responsive UI.

## 🎯 Core Features

### 1. Project Management (CRUD)

- **Create** new projects
- **Read** project list
- **Update** existing projects
- **Delete** projects with confirmation

### 2. Project Properties

- **Basic Information**

  - Title (3-100 characters, required)
  - Description (10-500 characters, required)
  - Client name (2-100 characters, required)

- **Financial & Timeline**

  - Budget (positive number, max 10M)
  - Start date (required)
  - Due date (required, must be after start date)

- **Status & Progress**

  - Status: Planning | In Progress | Completed
  - Priority: Low | Medium | High
  - Progress percentage (0-100%)

- **Metadata**
  - Created date (auto-generated)
  - Updated date (auto-updated)

### 3. User Interface Features

- **Responsive Design**: Mobile, tablet, desktop support
- **View Modes**: Grid and list layouts
- **Real-time Validation**: Form validation with error messages
- **Loading States**: Proper loading indicators
- **Toast Notifications**: Success/error feedback

---

## 🔧 Project Model

{
  "title": "string (required, 3-100 chars)",
  "description": "string (required, 10-500 chars)",
  "client": "string (required, 2-100 chars)",
  "budget": "number (required, min: 0, max: 10000000)",
  "startDate": "YYYY-MM-DD (required)",
  "dueDate": "YYYY-MM-DD (required, after startDate)",
  "status": "planning" | "in-progress" | "completed",
  "priority": "low" | "medium" | "high",
  "progress": "number (0-100)"
}


#### 1. Project Form

- **Layout**: Full-width with sectioned content
- **Sections**:
  - Basic Information
  - Financial & Timeline
  - Status & Progress
- **Validation**: Real-time with error messages
- **Responsive**: 1-3 columns based on screen size


## 📋 Acceptance Criteria

### Frontend

- [ ] Responsive design works on all screen sizes
- [ ] All forms have proper validation
- [ ] Loading states and error handling
- [ ] Consistent component styling
- [ ] TypeScript with no `any` types

### Backend

- [ ] All API endpoints working correctly
- [ ] Proper error handling and status codes
- [ ] Input validation on all routes
- [ ] Database constraints enforced
- [ ] API documentation complete

### Integration

- [ ] Frontend-backend communication working
- [ ] Real-time updates via React Query
- [ ] Error handling across the stack
- [ ] Performance requirements met
- [ ] Cross-browser compatibility verified