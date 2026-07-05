# OLM SUYARI E-Commerce Website

A simple, clean, and modern e-commerce website for the beauty brand OLM SUYARI, built using Node.js, Express, EJS, and MySQL.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Template Engine:** EJS, express-ejs-layouts
- **Database:** MySQL
- **Styling:** Bootstrap 5, Custom CSS
- **Other tools:** Express Session, Multer (for image upload), bcryptjs, connect-flash, dotenv

## Features
- Complete user authentication (Login/Register)
- Admin dashboard to manage products, categories, and view orders
- Product catalog and category-based filtering
- Shopping cart with session storage
- Cash on Delivery checkout system
- Secure password hashing using bcrypt
- Flash messages for feedback
- Clean and modern UI with responsive design

## Installation Instructions

1. **Clone or Download the Repository:**
   Navigate to the project directory:
   \`\`\`bash
   cd project
   \`\`\`

2. **Install Dependencies:**
   Run the following command to install all required Node.js packages:
   \`\`\`bash
   npm install
   \`\`\`

3. **Database Setup:**
   Ensure you have MySQL installed and running locally.
   - Open your MySQL client or terminal.
   - Run the provided `database/init.sql` script to create the database, tables, and insert sample data.
     \`\`\`bash
     mysql -u root -p < database/init.sql
     \`\`\`
   - By default, the script creates a database named `latufat` and inserts an Admin user.
   - **Admin Credentials:**
     - Email: `admin@olmsuyari.com`
     - Password: `admin123`

4. **Environment Variables:**
   - The `.env` file is included in the project root.
   - Update the DB connection details if you have a password set for your root user or if you use a different MySQL username.

5. **Start the Application:**
   Start the Node.js server using:
   \`\`\`bash
   npm start
   # Or for development:
   npm run dev
   \`\`\`
   Wait for the "Successfully connected to MySQL database" and "Server is running on http://localhost:3000" messages.

6. **Access the Website:**
   Open your browser and navigate to \`http://localhost:3000\`.

## Brand Identity
- **Colors:** `#C03A35` (Primary), `#733019` (Secondary), `#F9ABA4` (Accent)
- **Vibe:** Feminine, elegant, and modern luxury beauty.
