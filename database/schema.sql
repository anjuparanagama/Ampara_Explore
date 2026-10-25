-- ========================================================
-- Ampara Explore Tourism Website - Complete Database Schema
-- Compatible with TiDB / MySQL
-- ========================================================

-- 1. Users table (Authentication & Roles)
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Sessions table (User session management)
CREATE TABLE IF NOT EXISTS sessions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sessions_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sessions_expiry (expires_at),
  INDEX idx_sessions_user (user_id)
);

-- 3. Categories table (Attraction categorization)
CREATE TABLE IF NOT EXISTS categories (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Attractions table (Tourist attractions & details)
CREATE TABLE IF NOT EXISTS attractions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  category_id CHAR(36) NOT NULL,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  location VARCHAR(180) NOT NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  image VARCHAR(500) NULL,
  images JSON NULL,
  subtitle TEXT NULL,
  about_title VARCHAR(180) NULL,
  about_paragraphs JSON NULL,
  quote TEXT NULL,
  tips JSON NULL,
  route_desc TEXT NULL,
  distance_km DECIMAL(6,2) NOT NULL DEFAULT 0,
  duration VARCHAR(80) NULL,
  highlights JSON NULL,
  radial_zone VARCHAR(30) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_attractions_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_attractions_category (category_id),
  INDEX idx_attractions_name (name)
);

-- 5. Visit Plans table (User trip / itinerary plans)
CREATE TABLE IF NOT EXISTS visit_plans (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  visit_date VARCHAR(100) NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  total_distance VARCHAR(80) NULL,
  allocated_time VARCHAR(80) NULL,
  cover_image VARCHAR(500) NULL,
  is_bookmarked BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT NULL,
  stops_data JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_visit_plans_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_visit_plans_user_updated (user_id, updated_at)
);

-- 6. Visit Plan Stops table (Individual stops in a visit plan)
CREATE TABLE IF NOT EXISTS visit_plan_stops (
  id CHAR(36) NOT NULL PRIMARY KEY,
  plan_id CHAR(36) NOT NULL,
  attraction_id CHAR(36) NOT NULL,
  stop_order INT UNSIGNED NOT NULL,
  scheduled_start TIME NULL,
  duration_minutes INT UNSIGNED NULL,
  is_visited BOOLEAN NOT NULL DEFAULT FALSE,
  notes VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_plan_stops_plan
    FOREIGN KEY (plan_id) REFERENCES visit_plans(id) ON DELETE CASCADE,
  CONSTRAINT fk_plan_stops_attraction
    FOREIGN KEY (attraction_id) REFERENCES attractions(id) ON DELETE CASCADE,
  UNIQUE KEY uq_plan_attraction (plan_id, attraction_id),
  UNIQUE KEY uq_plan_order (plan_id, stop_order),
  INDEX idx_plan_stops_attraction (attraction_id)
);
