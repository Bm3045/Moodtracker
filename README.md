# Mood Tracker

A lightweight web application for teams to track daily mood check-ins. Employees can submit their current mood along with an optional comment. Admins can view and analyze submissions through a clean, responsive dashboard.

---

## Features

### Employee Interface

* Select mood from predefined options: Happy, Neutral, Sad
* Optional comment box
* Simple and accessible UI
* Responsive design
* Confirmation message after submission

### Admin Dashboard

* View all mood submissions in a table
* Stats cards for total moods, and counts for each type
* Emoji and color-coded mood indicators
* Responsive table layout
* Refresh data manually
* Handles empty and error states gracefully

---

## Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** for UI components
* **Custom ThemeProvider** for dark/light mode
* **Local API routes** for storing/retrieving mood entries (in-memory or mock)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mood-tracker.git
cd mood-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Run the Development Server

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

---

## Usage

### Employee

* Go to `/mood`
* Select a mood, optionally add a comment
* Submit and see confirmation

### Admin

* Visit `/admin`
* View all submissions with date & time
* Analyze mood distribution in stat cards

---

## Folder Structure

```
/app
  /mood         → Mood submission page
  /admin        → Admin dashboard
  /api/mood     → API route for GET/POST moods
/components
  /ui           → Button, Card, Table, ThemeProvider, ModeToggle
/public         → Static assets
```

---

## Dark Mode Support

* Custom `ThemeProvider` based on system preference
* Toggle button (`ModeToggle`) in layout
* Works with Tailwind `dark:` classes

---

## Future Enhancements

* Take Employee name as input and allow to keep anonimity 
* Persist mood data using a database (e.g., Supabase, MongoDB)
* Add date filtering and sorting by Employee names or date/time
* Weekly mood trend graph (chart)
* CSV export option for admin
* Authentication for admin access

---

## License

MIT License © 2025 Malya Srivastava
