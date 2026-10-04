# QuickNotes App

QuickNotes is a clean, responsive, and lightweight note-taking web application designed to help users capture, organize, and filter daily thoughts and tasks across multiple categories with local persistence.

## Features
Categorized Note Creation: Add notes under Personal, Work, or Study categories with built-in length and empty-state validation.
Live Search Filtering: Instantly filter notes by keyword as you type in the search bar.
Data Persistence: Automatically saves and loads notes securely via browser `localStorage`.
Responsive Layout: Flexbox form design and CSS cards that adapt fluidly to mobile and desktop displays.
Clear All Option: Quickly reset your workspace with confirmation protection.

## How to Run Locally
1. Clone or download this repository to your local machine:
   ```bash
   git clone [https://github.com/k-eric/quicknotes-app.git](https://github.com/k-eric/quicknotes-app.git)

   What I Learned
Secure DOM Building: Utilizing createElement and textContent instead of innerHTML to prevent injection risks and safely render user inputs.

State Sync & Persistence: Managing application state arrays and synchronizing updates directly with localStorage and JSON formatting.

Responsive UI Styling: Structuring flexible forms and category-themed component cards using CSS custom properties, borders, and media queries.