CREATE DATABASE IF NOT EXISTS `shop`;

USE shop;

CREATE TABLE IF NOT EXISTS `shop`.`user` (
  `id` char(36),
  `email` varchar(255),
  `password` varchar(255),
  `nickname` varchar(255),
  `profile_image` varchar(255),
  `user_desc` text,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `shop`.`item` (
  `id` char(36),
  `item_category` varchar(255),
  `item_name` varchar(255),
  `item_type` json,
  `item_image` json,
  `item_desc` text ,
  `status` enum('inStock','onTrading','outOfStock')  DEFAULT 'inStock',
  `open_chat` varchar(255),
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime,
  `user_id` char(36),
   PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `shop`.`dibs` (
  `id` char(36),
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime,
  `user_id` char(36) ,
  `item_id` char(36) ,
  PRIMARY KEY (`id`));


INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('8801cc92-115b-41d9-a7fc-3511c25ca24b', 'team01@elice.com', '$2a$10$uptIQJ3LGffCvlj064cQwOrlJRIxfLk1WD79bj7SJ6bSyRnyI6imu', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:38:26', '2022-10-19 21:38:26', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('1c4b7001-b3eb-4d15-ad29-b9f97c19d4bf', 'team02@elice.com', '$2a$10$7QocIirRTbvdr7eBz5gWgeUYfInNtBE6WiBeBtXz2/ALKLxE2IDUi', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:38:57', '2022-10-19 21:38:57', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('0801376d-995a-49b7-9c91-bdd60c0c3376', 'team03@elice.com', '$2a$10$JVM3oPZkS/Iz76gdxXDXguvSKWzAjyQ7l2RPfCl1UKOxhIMdZOkDy', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:01', '2022-10-19 21:39:01', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('fbd69008-424a-48a8-a658-de7b1070f846', 'team04@elice.com', '$2a$10$C0AeSF5PNwTDUjKuhxJAOu3nEfaQnQKDCfgMK5cLdlubo0agC/9hO', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:05', '2022-10-19 21:39:05', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('42f1c102-439b-4695-904f-1820c084931e', 'team05@elice.com', '$2a$10$.S3LHCfxSWQ23edNi.7IUun4RHwZF5cMW6ARI3SSW/bVFE0.Gb1V6', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:10', '2022-10-19 21:39:10', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('5ffba34c-79ca-4ac9-ae11-4093425d403d', 'team06@elice.com', '$2a$10$iwIyP3r9Q4u0jMHir.el/uSWDnFM7cz2QWLznAw3GQJQpYloEpF0i', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:16', '2022-10-19 21:39:16', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('5bf29e88-c7cb-4a47-9add-4364d982d290', 'team07@elice.com', '$2a$10$2AbLul2dLrsBNxcsaeLAGOMl2X50MfK895ftrPpkBkCJhweIQBlty', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:20', '2022-10-19 21:39:20', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('f4975cfd-7d4f-46cb-be25-0b546ac65a21', 'team08@elice.com', '$2a$10$5DX5yvQ46hVkBrn4ddzMB..EaOAU2kap5UP8synNlC3tV1OswI7O6', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:25', '2022-10-19 21:39:25', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('4801bc42-566e-47ed-869a-0b3557f05b9a', 'team09@elice.com', '$2a$10$agAdi23hqRoH.YRaknw2Te2xq5.PM.pMaSnYknPWQ0Zru4qTCCrjK', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:30', '2022-10-19 21:39:30', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('4a6cb348-89df-4b4c-ad77-29f82e8f6ff0', 'team10@elice.com', '$2a$10$GmgvgxjuYSGOkoyhAN5ev.9vaYVhcw8aIQUMKSl2LvWLp0CoDQF7a', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:35', '2022-10-19 21:39:35', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('3001e17a-0e1d-42e8-b2c0-0177025039bd', 'team11@elice.com', '$2a$10$/qM7p2oFDvuKrQ3K3bz0PePLYojMlMABvdpPL6VBbTCJIU.iMXdnu', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 21:39:39', '2022-10-19 21:39:39', NULL);
INSERT INTO shop.`user`
(id, email, password, nickname, profile_image, user_desc, created_at, updated_at, deleted_at)
VALUES('1caf2f1d-3514-4448-af0f-b9e386da657d', 'team12@elice.com', '$2a$10$oHmINOsN7Xx1nu9NFR448OBFGIPxaq7BkAiGp2qjCEgcIWwqczNA6', 'tester', '', '안녕하세요, 테스트 계정입니다.', '2022-10-19 22:13:39', '2022-10-19 22:13:39', NULL);


INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('278ffa7d-364e-4c75-83ba-fcfc245c9a8e', '상의', '옷01', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('9e8c88dc-0cbe-4420-876a-96bbfab82cc5', '상의', '옷02', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('8fd9a0c7-f9cc-4272-9481-09e8882881e8', '상의', '옷03', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('48e8506e-1189-46e3-b56d-495c0e7cc3e3', '상의', '옷04', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('e265b213-ff10-4b84-8ada-484aa9d1b68a', '상의', '옷05', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d52e7331-ed3e-4a7b-8277-c4700f4a439f', '상의', '옷06', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f18f638c-1727-49de-89ee-6aadf8a35fca', '상의', '옷07', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('e2a081a5-8b09-417f-91d8-3037d36d25e8', '상의', '옷08', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('126c4610-d05f-4f43-82c0-d6c240a0efbb', '상의', '옷09', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d1dbb555-7eaf-4c6b-a712-bfd4b51b5430', '하의', '옷10', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('ded5b625-0972-43d7-b870-3d9a90924a9a', '하의', '옷11', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('8e9134a0-8ea4-46f3-9a53-2a462b20b621', '하의', '옷12', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('1e4536a6-cda0-49fb-9e80-1ff754ac9c37', '하의', '옷13', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('dede4dde-22ab-41c4-8e0a-9d768581d055', '하의', '옷14', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f7a514e9-0674-4d80-a7ea-265ad09452ef', '하의', '옷15', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2c4e7593-6e88-48b8-83da-76b578564bff', '하의', '옷16', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('1abc06cf-8cfc-4d00-a2e0-b6ff24716914', '하의', '옷17', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('892d8801-4e28-45c8-8b89-a634cc6b6bcb', '하의', '옷18', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('74d425ce-469f-4f37-abc1-1ab366f8e1c5', '하의', '옷19', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('1b4e65de-6b07-40e8-9b66-309006ea9915', '아우터', '옷20', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('e75d5625-0017-4b44-b7fe-3cc54f32ea39', '아우터', '옷21', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('b01681c4-8066-47e8-b343-ddb8ec5071ce', '아우터', '옷22', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('04d067cc-b54a-4281-9904-6a4beb4efdc4', '아우터', '옷23', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d369a9fe-3be2-4dcd-87fb-623c93372983', '아우터', '옷24', '["남자", "상의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('a89acd91-b6cd-4c78-996d-3749fb1c465c', '아우터', '옷25', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('532a6f4c-d494-47d3-810a-38036a9ebcba', '아우터', '옷26', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d6c46a42-d759-4a59-afa8-c9fdb6bc96a4', '아우터', '옷27', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('b85af71f-585d-40fb-a311-a415467ecad6', '아우터', '옷28', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('21f2c414-188d-421c-b902-db3451fb8eba', '아우터', '옷29', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('73dafeb2-b83a-4386-befd-c240644006cc', '아우터', '옷30', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('1db7171d-dea5-4f24-8bda-e2bdaf9cbe43', '아우터', '옷31', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('34caa27d-58b8-4d7f-b869-481015606cd1', '아우터', '옷32', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('29985c4f-39f0-42c8-98cb-657527e21f43', '아우터', '옷33', '["남자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('eadcdd5d-79e7-4fc8-854f-332149ac7008', '아우터', '옷34', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('8588c9c6-8c82-4b29-b0cb-8600d9503ab0', '아우터', '옷35', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f6bd3087-7a83-4c00-8954-da895748e995', '아우터', '옷36', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d82ab686-9d38-4a6b-a9e4-d907ac3e1571', '아우터', '옷37', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('08991d30-50f1-424a-8475-05d31346827b', '아우터', '옷38', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('be907ee4-3a12-41cc-a4ca-ffe7063cb1a8', '아우터', '옷39', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('4c1624e0-706b-42be-b986-89aef56a5e74', '모자', '옷40', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('c2113ecb-4630-4f53-9ef9-9e571bbf6c1a', '모자', '옷41', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('56c3d1ac-7f76-4612-909e-82bc6326262e', '모자', '옷42', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('86518186-d960-407a-ab17-158f1a6ccfd6', '모자', '옷43', '["남자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2d1bd0c2-7cc8-4521-b385-91b88d879942', '모자', '옷44', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('4533a2e7-73be-41f8-816b-a7cb7ae4a57c', '모자', '옷45', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('a900e07e-1ba1-4a5f-8cff-0a32fe43e310', '모자', '옷46', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('bd68c9df-d748-4ae5-ac9b-a7cc5e014049', '모자', '옷47', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('841e52ab-afa3-4193-afb8-dfe532543b0e', '모자', '옷48', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('edc25557-d6b3-4c28-a1c8-2de7d6df2497', '모자', '옷49', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('28d266c2-60ba-4d45-9ee5-583b13d909a7', '기타', '옷50', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('6c859a9c-e6b4-4431-a7a6-58ed17201817', '기타', '옷51', '["여자", "하의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('33464cc1-8eac-4d43-a549-8ab0aca56b4d', '기타', '옷52', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('a540212a-f9a7-4b9c-8301-be8f11be375f', '기타', '옷53', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f86f07ce-86ef-4491-a00b-5380d9797a99', '기타', '옷54', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2ceb0a85-faf0-4a67-bbbd-2a9fb0a5e648', '기타', '옷55', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('6b43db65-1088-47ea-a474-a84a0e286c09', '기타', '옷56', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d8eefb06-3044-40c9-b245-12125f349c6b', '기타', '옷57', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('075db9d7-1ac1-4f29-83db-d6eb07c322eb', '기타', '옷58', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('805f76f2-f93e-4696-8439-465159e2ae6f', '기타', '옷59', '["여자", "상의", "맨투맨"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('8bdbb4c7-c896-422d-9305-54c0002bb924', '기타', '옷60', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('87cbd1ef-c773-4551-beec-dc45871ed2dd', '기타', '옷61', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2cc5554d-0d66-4d06-80b3-6befe786345a', '기타', '옷62', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('764fabb1-fb0d-44cf-aed3-c04ac47dfc3d', '기타', '옷63', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('e1043169-e965-458d-8053-4d3af4cac95e', '기타', '옷64', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f6d0e91c-742d-4ca7-bc86-46dabb315f17', '기타', '옷65', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('5b798d53-2655-442d-be33-9577e0318c48', '기타', '옷66', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('9d000d3d-4977-4fdd-9070-500ee7a884e3', '기타', '옷67', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('e70c49ad-2ca8-416e-8630-ab6f90c5fb2f', '기타', '옷68', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('6c8d7a2d-b926-4385-8b63-2854c3b31d3e', '기타', '옷69', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('3a103981-7c09-4653-90ed-5545d7966253', '상의', '옷70', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('dc0aee82-51a4-4604-bec3-327a52cc788e', '상의', '옷71', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('26661096-8352-44cb-a356-71d04e9c4899', '상의', '옷72', '["여자", "상의", "민소매"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d315e290-2ae8-4882-a09e-baaa37a2feae', '상의', '옷73', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('943217a9-a22a-49ac-a7f1-21d60fe5a4ff', '상의', '옷74', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('0334ace1-1c05-4945-882d-5982f32a1b25', '상의', '옷75', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('271983e2-128f-4d26-8a23-928ecb05597f', '상의', '옷76', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('cd5d2671-9def-4e18-9ffc-c971c4f3716f', '상의', '옷77', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('1ae2e35d-0f16-4a0b-8e32-977ef35adbf0', '상의', '옷78', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('37f5d56e-c819-4a43-880c-306fd11e0075', '상의', '옷79', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('5e33f2d2-abb0-4c29-b9a2-eb21542bab9e', '하의', '옷80', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('7c097e36-8877-47b4-b5e9-0582c0ad8b75', '하의', '옷81', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('7f4dae8d-9f5a-40e2-a80c-3fc9cc8e9306', '하의', '옷82', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('5e25e754-aade-46a2-880e-1d823bfd7b79', '하의', '옷83', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('53d72549-9630-4172-923a-113aa23b5754', '하의', '옷84', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('83e9bf66-7832-492f-9976-3c790dfa5532', '하의', '옷85', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('62ca27ef-95ad-4600-a039-f2fd5b010ed7', '하의', '옷86', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('d7c6b402-21f5-4492-bc9c-29d86771aea7', '하의', '옷87', '["여자", "하의", "반바지"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('bf57aa72-4694-44a8-bcf8-fa9ed8824f41', '하의', '옷88', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('61453205-d461-49b1-982e-2625a8ecd42b', '하의', '옷89', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2f2328d3-ae1b-4e7c-9900-b2b0daa6fe5a', '아우터', '옷90', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('0e475789-7eee-44de-9da2-23786cf9bf8b', '아우터', '옷91', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('acfff2bd-0542-4c77-a7cc-63079c29edb6', '아우터', '옷92', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('55627cd4-f6e7-4b09-8c95-9bca29841fca', '아우터', '옷93', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2a579a60-f705-4377-8e19-fdc41556cb59', '아우터', '옷94', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('5763b69c-3be4-4312-9411-61f09306be16', '아우터', '옷95', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('c819422d-b2b8-4daf-bd8a-1e78fa1eeb2f', '아우터', '옷96', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('906d985f-68be-43d1-a2ed-1513cce29f70', '아우터', '옷97', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('f92c30b0-a80c-4a3e-95b9-68a82861c98e', '아우터', '옷98', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');
INSERT INTO shop.item
(id, item_category, item_name, item_type, item_image, item_desc, status, open_chat, created_at, updated_at, deleted_at, user_id)
VALUES('2780082d-5d6c-4830-84ff-62a8a18e9d3d', '아우터', '옷99', '["여자", "하의", "반팔티"]', NULL, '아끼는 옷 입니다.', 'inStock', NULL, '2022-10-19 22:41:19', '2022-10-19 22:41:19', NULL, '1caf2f1d-3514-4448-af0f-b9e386da657d');

