CREATE TABLE IF NOT EXISTS visit_plans (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(180) NOT NULL,
  visit_date DATE NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_visit_plans_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_visit_plans_user_updated (user_id, updated_at)
);

CREATE TABLE IF NOT EXISTS visit_plan_stops (
  id CHAR(36) NOT NULL PRIMARY KEY,
  plan_id CHAR(36) NOT NULL,
  attraction_id CHAR(36) NOT NULL,
  stop_order INT UNSIGNED NOT NULL,
  scheduled_start TIME NULL,
  duration_minutes INT UNSIGNED NULL,
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
