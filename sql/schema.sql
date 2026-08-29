CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `slug` VARCHAR(80) NOT NULL,
  `description` TEXT NULL,
  `version` VARCHAR(40) NULL,
  `platform` VARCHAR(80) NULL,
  `download_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `file_path` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `download_requests` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(160) NOT NULL,
  `organization` VARCHAR(180) NOT NULL,
  `designation` VARCHAR(120) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `mobile` VARCHAR(32) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `purpose` VARCHAR(500) NOT NULL,
  `ip_address` VARCHAR(64) NOT NULL,
  `user_agent` VARCHAR(512) NULL,
  `consent` TINYINT(1) NOT NULL DEFAULT 0,
  `captcha_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `download_token_hash` CHAR(64) NOT NULL,
  `token_expires_at` DATETIME NOT NULL,
  `authorized` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_download_requests_email` (`email`),
  KEY `idx_download_requests_created_at` (`created_at`),
  KEY `idx_download_requests_ip` (`ip_address`),
  KEY `idx_download_requests_token` (`download_token_hash`),
  CONSTRAINT `fk_download_requests_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `download_events` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `download_request_id` BIGINT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `event_type` ENUM('started', 'completed', 'denied', 'expired', 'error') NOT NULL,
  `ip_address` VARCHAR(64) NOT NULL,
  `user_agent` VARCHAR(512) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_download_events_created_at` (`created_at`),
  KEY `idx_download_events_product` (`product_id`),
  CONSTRAINT `fk_download_events_request`
    FOREIGN KEY (`download_request_id`) REFERENCES `download_requests` (`id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT `fk_download_events_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `contact_enquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `organization` VARCHAR(180) NULL,
  `phone` VARCHAR(32) NULL,
  `enquiry_type` VARCHAR(40) NOT NULL,
  `product` VARCHAR(80) NULL,
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(64) NOT NULL,
  `user_agent` VARCHAR(512) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_created_at` (`created_at`),
  KEY `idx_contact_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(190) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_user_id` INT UNSIGNED NOT NULL,
  `session_hash` CHAR(64) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `ip_address` VARCHAR(64) NULL,
  `user_agent` VARCHAR(512) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_session_hash` (`session_hash`),
  KEY `idx_admin_sessions_expires` (`expires_at`),
  CONSTRAINT `fk_admin_sessions_user`
    FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`name`, `slug`, `description`, `version`, `platform`, `download_enabled`, `file_path`)
VALUES
  ('TraceLens', 'tracelens', 'Digital Evidence & Intelligence Analysis Platform', 'Preview', 'Windows', 0, NULL),
  ('Nigrani', 'nigrani', 'IPDR Forensic Analyzer', '1.0.0', 'Windows', 0, NULL),
  ('KartvyaNama', 'kartavyanama', 'Professional Android application', NULL, 'Android', 1, 'kartavyanama.apk'),
  ('Talash Gateway', 'talash-gateway', 'Secure subscriber information system', NULL, 'Windows', 0, NULL),
  ('EMS', 'ems', 'Employee management system', NULL, 'Windows', 0, NULL),
  ('Task Master / Tapal', 'task-master', 'Task and correspondence management', NULL, 'Windows', 0, NULL)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `version` = VALUES(`version`),
  `platform` = VALUES(`platform`),
  `download_enabled` = VALUES(`download_enabled`);
