## Prerequisites

Before you begin, make sure your system meets the following requirements:

- **PHP Version**: 8.2 to 8.4
- **Composer**: PHP dependency manager
- **Database**: MySQL (via XAMPP/WAMP)
- **Laravel**: Version 12.x (this is the version for this project, but make sure the required version aligns with your system)

---

## Step 1: Install XAMPP/WAMP

You need to set up a local development environment with XAMPP or WAMP. Both include PHP, MySQL, and Apache.

### For XAMPP:

1. Go to the [XAMPP download page](https://www.apachefriends.org/index.html) and download the appropriate version for your operating system.
2. Run the installer and follow the instructions to install XAMPP.
3. After installation, open the **XAMPP Control Panel** and start **Apache** and **MySQL**.

### For WAMP:

1. Visit the [WAMP Server website](https://www.wampserver.com/en/) and download the latest version.
2. Follow the installation steps to set up WAMP on your system.
3. Once installed, launch WAMP and ensure that the **Apache** and **MySQL** services are running (the WAMP icon in the taskbar should turn green).

---

## Step 2: Install Composer

Composer is a dependency manager for PHP, which you'll need to install before setting up Laravel.

### Installation:

1. Download **Composer** from the [official website](https://getcomposer.org/download/).
2. Follow the installation instructions based on your operating system.
3. Once installed, open a terminal or command prompt and verify that Composer is working:

   ```bash
   composer --version
   ```

---

## Step 3: Clone the Project

Clone the TodoApp Laravel project from GitHub to your local machine:

```bash
git clone https://github.com/MohamedKarabawy/TodoApp.git
cd TodoApp
```

---

## Step 4: Configure the `.env` File

Laravel uses the `.env` file for environment settings like database configurations and application keys. 

1. In the root folder of the project, you’ll find a file named `.env.example`. Duplicate this file and rename it to `.env`.

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file in a text editor and configure the database settings:

   - **DB_CONNECTION**: Set to `mysql`
   - **DB_HOST**: Set to `127.0.0.1` (or `localhost`)
   - **DB_PORT**: Set to `3306` (default MySQL port)
   - **DB_DATABASE**: Set to your database name (e.g., `TodoApp`)
   - **DB_USERNAME**: Set to `root` (default username in XAMPP/WAMP)
   - **DB_PASSWORD**: Set to an empty string if no password is set (default in XAMPP/WAMP)

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=TodoApp
DB_USERNAME=root
DB_PASSWORD=
```

---

## Step 5: Install Project Dependencies

Run `composer install` to install all the necessary dependencies for the project:

```bash
composer install
```

---

## Step 6: Run Migrations

To set up the database structure, run the migrations command. This will create the necessary tables in your database.

```bash
php artisan migrate
```

---

## Step 7: Seed Database with Default Data

The project require seed data (e.g., default categories), you can seed the database by running:

```bash
php artisan db:seed
```

---

## Step 8: Start the Development Server

To start the Laravel development server and view the project in your browser, run the following command:

```bash
php artisan serve
```

This will start the server at `http://127.0.0.1:8000`. Open this URL in your browser to see the application.