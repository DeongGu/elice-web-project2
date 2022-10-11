CREATE SCHEMA IF NOT EXISTS `shop`;

CREATE TABLE IF NOT EXISTS `shop`.`items` (
  `item_id` varchar(255),
  `item_name` varchar(255),
  `item_desc` varchar(255),
  `status` ENUM ('in_stock', 'on_trading', 'out_of_stock'),
  `user_id` varchar(255),
  `created_dt` varchar(255),
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`item_id`)
);

CREATE TABLE IF NOT EXISTS `shop`.`item_tags` (
  `item_id` varchar(255),
  `tag_name` varchar(255) UNIQUE,
  `created_at` datetime DEFAULT now()
);

CREATE TABLE IF NOT EXISTS `shop`.`item_types` (
  `item_id` varchar(255),
  `code_type_id` varchar(255),
  `code_id` varchar(255),
  `created_at` datetime DEFAULT now()
);

CREATE TABLE IF NOT EXISTS `shop`.`dibs` (
  `dibs_id` varchar(255) PRIMARY KEY,
  `item_id` varchar(255),
  `user_id` varchar(255),
  `created_at` datetime DEFAULT now()
);

CREATE TABLE IF NOT EXISTS `shop`.`orders` (
  `order_id` varchar(255) PRIMARY KEY,
  `item_id` varchar(255),
  `user_id` varchar(255),
  `created_dt` varchar(8),
  `created_at` datetime DEFAULT now()
);

CREATE TABLE IF NOT EXISTS `shop`.`deliveries` (
  `delivery_id` varchar(255) PRIMARY KEY,
  `item_id` varchar(255),
  `status` ENUM ('yet_unknown', 'known', 'on_preparing', 'sended'),
  `delivery_number` int,
  `delivery_dt` varchar(8),
  `created_at` datetime DEFAULT now()
);

CREATE TABLE IF NOT EXISTS `shop`.`reviews` (
  `review_id` varchar(255) PRIMARY KEY,
  `item_id` varchar(255),
  `user_id` varchar(255),
  `review_star` int,
  `review_desc` varchar(255),
  `created_dt` varchar(8),
  `created_at` datetime DEFAULT now()
);


CREATE SCHEMA IF NOT EXISTS `public`;

CREATE TABLE IF NOT EXISTS `public`.`code_types` (
  `code_type_id` varchar(255),
  `code_type_name` varchar(255),
  `code_type_level` int,
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`code_type_id`)
);

CREATE TABLE IF NOT EXISTS `public`.`code_infos` (
  `code_id` varchar(255),
  `code_name` varchar(255),
  `code_number` int,
  `code_desc` varchar(255),
  `code_type_id` varchar(255),
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`code_id`)
);

CREATE TABLE IF NOT EXISTS `public`.`users` (
  `user_id` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `nickname` varchar(255),
  `role` varchar(255),
  `name` varchar(255),
  `phone_number` varchar(255),
  `profile_image` varchar(255),
  `user_desc` varchar(255),
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `public`.`user_ticket` (
  `user_id` varchar(255),
  `earned_ticket` int,
  `used_ticket` int,
  `left_ticket` int,
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `public`.`address` (
  `user_id` varchar(255),
  `address_no` int,
  `address_name` varchar(255),
  `zip_code` varchar(255),
  `road_address` varchar(255),
  `jibun_addr` varchar(255),
  `delivery_name` varchar(255),
  `delivery_phone_number` varchar(255),
  `delivery_message` varchar(255),
  `created_at` datetime DEFAULT now(),
  PRIMARY KEY (`user_id`, `address_no`)
);


CREATE INDEX IF NOT EXISTS `items_status` ON `shop`.`items` (`item_id`, `status`);

ALTER TABLE `shop`.`items` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);

ALTER TABLE `shop`.`item_tags` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`item_types` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`item_types` ADD FOREIGN KEY (`code_type_id`) REFERENCES `public`.`code_types` (`code_type_id`);

ALTER TABLE `shop`.`item_types` ADD FOREIGN KEY (`code_id`) REFERENCES `public`.`code_infos` (`code_id`);

ALTER TABLE `shop`.`dibs` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`dibs` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);

ALTER TABLE `shop`.`orders` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`orders` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);

ALTER TABLE `shop`.`deliveries` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`reviews` ADD FOREIGN KEY (`item_id`) REFERENCES `shop`.`items` (`item_id`);

ALTER TABLE `shop`.`reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);

ALTER TABLE `public`.`code_infos` ADD FOREIGN KEY (`code_type_id`) REFERENCES `public`.`code_types` (`code_type_id`);

ALTER TABLE `public`.`user_ticket` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);

ALTER TABLE `public`.`address` ADD FOREIGN KEY (`user_id`) REFERENCES `public`.`users` (`user_id`);
