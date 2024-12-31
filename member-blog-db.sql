CREATE DATABASE IF NOT EXISTS member_blog;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `parent_comment` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_comment_ibfk_1`(`user_id` ASC) USING BTREE,
  INDEX `post_comment_ibfk_2`(`post_id` ASC) USING BTREE,
  INDEX `paren_comment_ibfk_2`(`parent_comment` ASC) USING BTREE,
  CONSTRAINT `paren_comment_ibfk_2` FOREIGN KEY (`parent_comment`) REFERENCES `comment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `post_comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('061e363a-dc86-4d6e-9cf1-82b79f64fd08', '2024-03-22 20:46:53', 'tranhuunhan', '2024-03-22 20:46:53', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', 'b67fc820-7533-4968-8f91-b5016343c4db', 'nice bro');
INSERT INTO `comment` VALUES ('0918ff8d-fbfa-451a-b5aa-5f224b999ac7', '2024-03-04 12:30:00', 'devhuunhan', '2024-03-04 12:30:00', 'devhuunhan', 0, NULL, 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 'd39bb7eb-ac14-4051-b24d-0bfeaf6273a6', 'nice bro');
INSERT INTO `comment` VALUES ('0d851289-cc51-4e83-b992-f45a15a22840', '2024-03-15 18:06:25', 'user123', '2024-03-15 18:06:25', 'user123', 0, NULL, 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '0d6fe8ef-51be-407c-93da-996d07871509', 'boro');
INSERT INTO `comment` VALUES ('1858238c-e596-4ede-b492-8e339fbf06e1', '2024-03-03 17:11:56', 'tranhuunhan', '2024-03-03 17:11:56', 'tranhuunhan', 0, '87957681-aaf6-4e5c-984c-71e316cc4760', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '4753805c-fa0f-48bb-940a-1039de89f19a', 'reply comment 1');
INSERT INTO `comment` VALUES ('1aa26d12-c44b-4393-a68a-bbcd3b281c16', '2024-03-15 19:32:27', 'tranhuunhan', '2024-03-15 19:32:27', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '1d75eac3-b05d-45be-b44d-7f7340842a94', 'Nice bro!!');
INSERT INTO `comment` VALUES ('1d0cbf7a-a8f0-4c9e-89a8-ca0b42e4e016', '2024-03-15 10:38:26', 'user123', '2024-03-15 10:38:26', 'user123', 0, NULL, 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '0d6fe8ef-51be-407c-93da-996d07871509', 'nice');
INSERT INTO `comment` VALUES ('477b62a5-cd4d-4180-aa13-cc0bcc23b05b', '2024-03-15 19:03:36', 'tranhuunhan', '2024-03-15 19:03:36', 'tranhuunhan', 0, '5c11f0b5-6abe-4094-ad7a-b080c956760b', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '0d6fe8ef-51be-407c-93da-996d07871509', 'ok bro');
INSERT INTO `comment` VALUES ('5c11f0b5-6abe-4094-ad7a-b080c956760b', '2024-03-15 19:03:24', 'devhuunhan', '2024-03-15 19:03:24', 'devhuunhan', 0, '68cdb46c-07ac-4456-91f4-17e6a8544d9c', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '0d6fe8ef-51be-407c-93da-996d07871509', 'nice');
INSERT INTO `comment` VALUES ('68cdb46c-07ac-4456-91f4-17e6a8544d9c', '2024-03-15 18:59:16', 'tranhuunhan', '2024-03-15 18:59:16', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '0d6fe8ef-51be-407c-93da-996d07871509', 'ok');
INSERT INTO `comment` VALUES ('7512cd12-1d5e-494a-96fd-b4b9de1b399c', '2024-03-15 19:26:26', 'user246', '2024-03-15 19:26:26', 'user246', 0, NULL, '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'b67fc820-7533-4968-8f91-b5016343c4db', 'nice bro ');
INSERT INTO `comment` VALUES ('7fa5af95-bcd2-4303-b005-8ae980965063', '2024-03-03 23:43:05', 'tranhuunhan', '2024-03-03 23:43:05', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '4753805c-fa0f-48bb-940a-1039de89f19a', '11pm huhu');
INSERT INTO `comment` VALUES ('87957681-aaf6-4e5c-984c-71e316cc4760', '2024-03-03 17:11:32', 'tranhuunhan', '2024-03-03 17:11:32', 'tranhuunhan', 0, NULL, 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '4753805c-fa0f-48bb-940a-1039de89f19a', 'comment 1');
INSERT INTO `comment` VALUES ('8967211c-e14e-4bfb-9c86-d06de376a492', '2024-03-15 19:02:45', 'devhuunhan', '2024-03-15 19:02:45', 'devhuunhan', 0, '68cdb46c-07ac-4456-91f4-17e6a8544d9c', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '0d6fe8ef-51be-407c-93da-996d07871509', 'nice');
INSERT INTO `comment` VALUES ('8e61b85a-43af-4b12-9b0e-938f29d667cc', '2024-03-15 18:54:21', 'tranhuunhan', '2024-03-15 18:54:21', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '0d6fe8ef-51be-407c-93da-996d07871509', 'wtf');
INSERT INTO `comment` VALUES ('b6b2d120-4ad7-439d-80a2-d40e21349eea', '2024-03-15 19:26:39', 'user246', '2024-03-15 19:26:39', 'user246', 0, NULL, '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'd39bb7eb-ac14-4051-b24d-0bfeaf6273a6', 'nice bro!!');
INSERT INTO `comment` VALUES ('c7f48d31-36de-4afa-a89b-e2b24cb4b851', '2024-03-04 12:22:20', 'devhuunhan', '2024-03-04 12:22:20', 'devhuunhan', 0, 'f8b25ae8-355f-4a5b-96f0-ff39b21ffce6', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '143b51c9-1715-43e3-a9af-52963c0f35cf', 'success');
INSERT INTO `comment` VALUES ('e2fea001-1e99-4cde-8dbd-be491c3b4700', '2024-03-03 23:43:51', 'tranhuunhan', '2024-03-03 23:43:51', 'tranhuunhan', 0, '7fa5af95-bcd2-4303-b005-8ae980965063', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '4753805c-fa0f-48bb-940a-1039de89f19a', 'good night bro 👌');
INSERT INTO `comment` VALUES ('e5fa14f9-18fc-4595-a360-485ada9994c1', '2024-03-04 12:02:44', 'devhuunhan', '2024-03-04 12:02:44', 'devhuunhan', 0, 'f8b25ae8-355f-4a5b-96f0-ff39b21ffce6', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '143b51c9-1715-43e3-a9af-52963c0f35cf', 'hi x3');
INSERT INTO `comment` VALUES ('eaa5fb63-b2f7-4a3f-a896-571d40a8ee59', '2024-03-03 17:10:16', 'tranhuunhan', '2024-03-03 17:10:16', 'tranhuunhan', 0, NULL, 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '4753805c-fa0f-48bb-940a-1039de89f19a', 'comment 1');
INSERT INTO `comment` VALUES ('f265216a-6382-4c19-bdcc-fcf6fda04729', '2024-03-15 19:35:04', 'devhuunhan', '2024-03-15 19:35:04', 'devhuunhan', 0, NULL, 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '1d75eac3-b05d-45be-b44d-7f7340842a94', 'nice ');
INSERT INTO `comment` VALUES ('f8b25ae8-355f-4a5b-96f0-ff39b21ffce6', '2024-03-04 11:23:12', 'tranhuunhan', '2024-03-04 11:23:12', 'tranhuunhan', 0, NULL, '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '143b51c9-1715-43e3-a9af-52963c0f35cf', 'Nice bro');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `receiver` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sender` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_read` tinyint NULL DEFAULT 0,
  `body` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `notification_receiver_fk1`(`receiver` ASC) USING BTREE,
  INDEX `notification_sender_fk1`(`sender` ASC) USING BTREE,
  CONSTRAINT `notification_receiver_fk1` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `notification_sender_fk1` FOREIGN KEY (`sender`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES ('06cd23cc-abc4-41cd-b28c-62e47ee9955f', '2024-03-15 19:03:36', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', 'ok bro', 'New post cua taodfasdfs fsddsf sdfsa', 'COMMENT', 1, 'Replied to your comment');
INSERT INTO `notification` VALUES ('263dbadf-fcc7-47ae-82fc-45c7a60e245b', '2024-03-22 20:46:53', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', 'nice bro', '25 Unnoticeable Features of JavaScript', 'COMMENT', 0, 'Commented on your post');
INSERT INTO `notification` VALUES ('70229e03-d0b2-41fa-a2ac-8c9fce180d9c', '2024-03-15 19:26:26', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'nice bro ', '25 Unnoticeable Features of JavaScript', 'COMMENT', 0, 'Commented on your post');
INSERT INTO `notification` VALUES ('88e679a4-8acd-477c-99d0-47914da20e90', '2024-03-15 19:35:04', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 'nice ', 'UPDATE TEST TITLE POST USER ADMIN USER 246', 'COMMENT', 0, 'Commented on your post');
INSERT INTO `notification` VALUES ('99fcf301-75c4-42cc-b0bb-8ebb37c9233c', '2024-03-15 19:03:24', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 'nice', 'New post cua taodfasdfs fsddsf sdfsa', 'COMMENT', 1, 'Replied to your comment');
INSERT INTO `notification` VALUES ('ee68f97b-8ef8-4d59-9b93-d41ffb228365', '2024-03-15 19:26:39', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'nice bro!!', 'Be a better developer with these Git good practices', 'COMMENT', 1, 'Commented on your post');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `cover_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `view` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `post_user_ibfk_1`(`user_id` ASC) USING BTREE,
  CONSTRAINT `post_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('0d6fe8ef-51be-407c-93da-996d07871509', '2024-03-08 16:40:30', 'devhuunhan', '2024-03-22 20:30:12', 'anonymousUser', 145, 'New post cua taodfasdfs fsddsf sdfsa', '<p>oi troi oi .sfs anbfsdkfb ssd aksdbf kjsdb sfsdfsaddsfsdfsdfsdfs sdfsdf</p>', 'image_20240308_164029.png', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 144);
INSERT INTO `post` VALUES ('143b51c9-1715-43e3-a9af-52963c0f35cf', '2024-03-03 20:48:50', 'tranhuunhan', '2024-03-15 19:35:11', 'anonymousUser', 66, 'guerrilla — Your Personal Censorship Circumvention Toolbox', '<p>For those who are oppressed by inhumane regimes, for those who seek truth.</p>\n<p>As state censorship continues to strike across Asia with greater power, we, regular citizens who can\'t stand digital isolation, seek opportunities to get access to restricted online resources.</p>\n<p><br></p>\n<p>Recently, all of this crap started to hit me more and more.</p>\n<p>That\'s why I decided to set up a set of proxies, and start gathering censorship circumvention techniques pioneered by folks at China in a single project for myself and my friends, but it may be useful for anyone.</p>\n<p><br></p>\n<p>It\'s a small Docker Compose project, a collection of easy-to-deploy censorship circumvention tools for digital guerrillas, as I call it for fun.</p>\n<p><br></p>\n<p>The goal is to have a simple interface for deploying and configuring such tools.</p>\n<p><br></p>\n<p>Right now, it contains only a shadowsocks-rust image and a Fedora image with misc tools like shadowsocks config QR code generator. More circumvention methods, misc tools, and documentation will be added in future, hopefully.</p>\n<p>Yes, shadowsocks is not perfect, but it works for now.</p>\n<p><br></p>\n<p><br></p>\n<p><strong>I think, from now on, there will be more privacy-related posts on my profile.</strong></p>\n<p>🤘Stay safe.</p>', 'image_20240303_204850.png', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 66);
INSERT INTO `post` VALUES ('1d75eac3-b05d-45be-b44d-7f7340842a94', '2024-03-15 19:29:27', 'user246', '2024-03-22 20:55:11', 'anonymousUser', 23, 'UPDATE TEST TITLE POST USER ADMIN USER 246', '<h2><strong><em>1. Rules for naming variables</em></strong></h2>\n<p>Almost all programming languages enforce certain rules on the programmer when naming variables. This is done to prevent one from creating names that could introduce ambiguity into the respective program.</p>\n<p>The rules we must follow when naming variables in JavaScript are as follows:</p>\n<ul>\n <li>Names can only&nbsp;<strong>contain alphanumeric characters</strong>&nbsp;(a-z, A-Z, 0-9) and the _ (underscore) and $ (dollar sign) characters; nothing else. Hence, first-name is invalid since it contains a hyphen (-) which is illegal to put in a variable name.</li>\n <li>Names&nbsp;<strong>can\'t begin with a digit</strong>. Hence, 2nd is invalid.</li>\n <li>Names&nbsp;<strong>can\'t contain spaces</strong>. Hence, first word is invalid.</li>\n <li>Names&nbsp;<strong>can\'t be reserved keywords</strong>. Hence, var is invalid.</li>\n <li><br></li>\n</ul>\n<h2><strong><em>2. Tips for naming variables</em></strong></h2>\n<p>In this section, we aim to discuss a handful of tips to consider when naming variables in JavaScript, including which casing convention to use in order to break long words.</p>\n<p><strong>2.1 Be descriptive</strong></p>\n<p>A variable\'s name shall clearly describe what it\'s meant to hold.</p>\n<p>Suppose that you have to store a user\'s name in a variable. It would be really bad if you name the variable a (or x or u for \'user\', or any random character). The name a doesn\'t tell much about what\'s stored in the variable.</p>\n<p>A much better name would be&nbsp;<strong>username</strong>, or&nbsp;<strong>uname</strong>.</p>\n<p><strong>2.2 Don\'t be overly descriptive</strong></p>\n<p>Suppose we want to create a variable that stores the first name of a user. Being exceptionally descriptive, we could name it&nbsp;<strong>thefirstnameofuser</strong>, although this would be more than the required amount of description.</p>\n<p>A better name would be&nbsp;<strong>firstname</strong>.</p>\n<p><br></p>\n<p><strong>3.3 Abbreviate long words</strong></p>\n<p>Sometimes, it\'s really helpful to abbreviate long words in a given name to short and simple words, given that the abbreviation seems sensible.</p>\n<p>For example, the variable&nbsp;<strong>dbname</strong>&nbsp;could work well instead of&nbsp;<strong>databasename</strong>. Here, we\'ve abbreviated \'database\' to \'db\'.</p>\n<p>But keep in mind that abbreviations don\'t always work well.</p>\n<blockquote>\n For instance, naming a variable that holds the name of an object\'s property as pname would be a complete mess. pname could mean \'property name\' or \'panel name\' or \'previous name\'.\n</blockquote>\n<p>A much better name would be propname — with the word \'property\' abbreviated down to \'prop\'.</p>\n<p><br></p>\n<p><strong>2.4 Use a casing convention to break words</strong></p>\n<p>When a variable\'s name contains more than one word, it\'s desirable to use some casing convention to be able to distinguish between them easily while reading the variable.</p>\n<ul>\n <li><strong>camelCasing</strong>: every word\'s first letter is uppercased except for that of the first word. Camel casing is the casing used in JavaScript. Here are some identifier names from JavaScript:&nbsp;<strong>indexOf</strong>,&nbsp;<strong>getElementById</strong>,&nbsp;<strong>querySelectorAll</strong>.</li>\n <li><strong>PascalCasing</strong>: every word\'s first character is uppercased. C# uses Pascal casing for almost all identifiers. Some examples from C# are as follows:&nbsp;<strong>WriteLine</strong>,&nbsp;<strong>ReadLine</strong>,&nbsp;<strong>GetType</strong>.</li>\n <li><strong>snake_casing:</strong>&nbsp;every word is lowercased and separated from the other using the _ (underscore) character. PHP uses snake casing for most of its predefined functions. Some examples from PHP are as follows:&nbsp;<strong>array_push</strong>,&nbsp;<strong>mysqli_connect</strong>,&nbsp;<strong>str_split</strong>.</li>\n <li><strong>SCREAMING_SNAKE_CASING:</strong>&nbsp;every word is uppercased and separated from the other using the _ (underscore) character. This casing is commonly used to denote constants in many programming languages, including JavaScript. Some examples are:&nbsp;<strong>MAX_VALUE</strong>,&nbsp;<strong>MAX_SAFE_INTEGER</strong>.</li>\n</ul>\n<p><br></p>\n<p><img src=\"image_20240315_192926.jpeg\" width=\"783\" style=\"\"></p>\n<p><br></p>\n<p>updated!!!</p>\n<p><br></p>\n<p>@user246</p>', 'image_20240315_192926.png', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', 22);
INSERT INTO `post` VALUES ('4753805c-fa0f-48bb-940a-1039de89f19a', '2024-03-02 15:53:41', 'devhuunhan', '2024-03-22 20:49:06', 'anonymousUser', 87, 'Async vs Defer in JavaScript: Which is Better?', '<p><strong>Hi everyone! I hope you’re doing good.</strong></p>\n<p>This article will explore an interesting Javascript topic.&nbsp;async&nbsp;and&nbsp;defer&nbsp;are attributes used when including external JavaScript files in HTML documents. They affect how the browser loads and executes the script. Let\'s learn about them in detail.</p>\n<p><br></p>\n<p><img src=\"image_20240302_155341.jpeg\"></p>\n<p><br></p>\n<p><span class=\"ql-size-small\">@devhuunhan</span></p>', 'image_20240302_155341.png', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', 87);
INSERT INTO `post` VALUES ('b67fc820-7533-4968-8f91-b5016343c4db', '2024-03-15 10:42:00', 'user123', '2024-03-22 20:49:46', 'anonymousUser', 10, '25 Unnoticeable Features of JavaScript', '<p>Often, as developers, we write similar types of code, falling into a pattern that, while comfortable, can sometimes feel mundane.</p>\n<p>However, the world of JavaScript is vast, filled with advanced features that, when discovered and used, can transform our development work into something much more exciting and fulfilling.</p>\n<p>In this guide, we will unveil 25 advanced JavaScript features that promise not just to reveal these hidden gems but also to elevate your mastery of JavaScript to unprecedented levels.</p>\n<p>Let’s embark on this journey of discovery together, integrating JavaScript’s advanced capabilities into our coding repertoire to create more efficient, elegant, and powerful applications. It’s time to infuse our development tasks with a newfound sense of fun and creativity.</p>\n<h2><strong>1.Labels for Loop and Block Statements</strong></h2>\n<p>JavaScript allows labeling loops and block statements, enabling precise control with&nbsp;break&nbsp;and&nbsp;continue.</p>\n<pre class=\"ql-syntax\" spellcheck=\"false\">outerLoop: for (let i = 0; i &lt; 5; i++) {\n    innerLoop: for (let j = 0; j &lt; 5; j++) {\n        if (i === 2 &amp;&amp; j === 2) break outerLoop;\n        console.log(`i=${i}, j=${j}`);\n    }\n}\n</pre>\n<p><br></p>\n<p><img src=\"image_20240315_104159.jpeg\" width=\"756\" style=\"\"></p>\n<p><br></p>\n<p><em class=\"ql-size-small\">@user123</em></p>', 'image_20240315_104159.png', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', 10);
INSERT INTO `post` VALUES ('d39bb7eb-ac14-4051-b24d-0bfeaf6273a6', '2024-03-03 20:55:25', 'tranhuunhan', '2024-03-22 20:46:27', 'anonymousUser', 157, 'Be a better developer with these Git good practices', '<p><strong>Update</strong></p>\n<p>If you\'re a developer, you probably use the versioning system called Git on a daily basis. The use of this tool is crucial for the development process of an application, whether working in a team or individually. However, it\'s common to encounter messy repositories, commits with unclear messages that don\'t convey useful information, and misuse of branches, among other issues. Knowing how to use Git correctly and following good practices is essential for those who want to excel in the job market.</p>\n<p><br></p>\n<h2><strong>Naming Conventions for Git Branches</strong></h2>\n<p>When we\'re working with code versioning, one of the main good practices that we should follow is using clear and descriptive names for branches, commits, pull requests, etc. Ensuring a concise workflow for all team members is essential. In addition to gaining productivity, documenting the development process of the project historically simplifies teamwork. By following these practices, you\'ll see benefits soon.</p>\n<p>Based on it, the community created a branch naming convention that you can follow in your project. The use of the following items below is optional, but they can help improve your development skills.</p>\n<p><br></p>\n<p><strong>1. Lowercase:</strong>&nbsp;Don\'t use uppercase letters in the branch name, stick to lowercase;</p>\n<p><strong>2. Hyphen separated:</strong>&nbsp;If your branch name consists of more than one word, separate them with a hyphen. following the kebab-case convention. Avoid PascalCase, camelCase, or snake_case;</p>\n<p><strong>3. (a-z, 0-9):</strong>&nbsp;Use only alphanumeric characters and hyphens in your branch name. Avoid any non-alphanumeric character;</p>\n<p><strong>4. Please, don\'t use continuous hyphens (--).</strong>&nbsp;This practice can be confusing. For example, if you have branch types (such as a feature, bugfix, hotfix, etc.), use a slash (/) instead;</p>\n<p><strong>5. Avoid ending your branch name with a hyphen</strong>. It does not make sense because a hyphen separates words, and there\'s no word to separate at the end;</p>\n<p><strong>6. This practice is the most important:</strong>&nbsp;Use descriptive, concise, and clear names that explain what was done on the branch;</p>\n<p><strong>Wrong branch names</strong></p>\n<ul>\n <li>fixSidebar</li>\n <li>feature-new-sidebar-</li>\n <li>FeatureNewSidebar</li>\n <li>feat_add_sidebar</li>\n</ul>\n<p><strong>Good branch names</strong></p>\n<ul>\n <li>feature/new-sidebar</li>\n <li>add-new-sidebar</li>\n <li>hotfix/interval-query-param-on-get-historical-data</li>\n</ul>\n<p><br></p>\n<p><br></p>\n<p><strong class=\"ql-size-small\"><em>part 2 continue ... </em></strong></p>', 'image_20240306_113817.png', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', 145);

-- ----------------------------
-- Table structure for post_like
-- ----------------------------
DROP TABLE IF EXISTS `post_like`;
CREATE TABLE `post_like`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_like`(`post_id` ASC, `user_id` ASC) USING BTREE,
  CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post_like
-- ----------------------------
INSERT INTO `post_like` VALUES ('059cf19b-1ab0-46f9-b538-1483b2b74924', '0d6fe8ef-51be-407c-93da-996d07871509', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '2024-03-15 10:38:17');
INSERT INTO `post_like` VALUES ('1a30a5d4-e387-43a4-baaa-49d7548315de', '1d75eac3-b05d-45be-b44d-7f7340842a94', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', '2024-03-15 19:30:15');
INSERT INTO `post_like` VALUES ('1fd10b79-518f-4f59-a527-40e82f1c8905', 'd39bb7eb-ac14-4051-b24d-0bfeaf6273a6', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '2024-03-05 17:35:24');
INSERT INTO `post_like` VALUES ('5de96135-419d-48f2-8e75-5af29e3b220d', 'd39bb7eb-ac14-4051-b24d-0bfeaf6273a6', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '2024-03-08 10:23:58');
INSERT INTO `post_like` VALUES ('6abc10d7-5e3a-4198-b590-2540b8d63a65', 'b67fc820-7533-4968-8f91-b5016343c4db', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', '2024-03-15 19:26:05');
INSERT INTO `post_like` VALUES ('80241833-72d9-4689-a2e0-14d6d5e30578', '143b51c9-1715-43e3-a9af-52963c0f35cf', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '2024-03-04 18:08:47');
INSERT INTO `post_like` VALUES ('89aa0f3d-c88a-4778-b62d-9d2c4bc99e36', 'd39bb7eb-ac14-4051-b24d-0bfeaf6273a6', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '2024-03-15 10:38:39');
INSERT INTO `post_like` VALUES ('cf544bd7-6165-4d7d-988a-2e23aa18efbb', '0d6fe8ef-51be-407c-93da-996d07871509', '14c3c163-8205-40a2-b7a9-c95c0d5deae6', '2024-03-15 19:26:50');
INSERT INTO `post_like` VALUES ('d10f35c6-0fa3-4a8b-89ab-024bd1ee33de', '4753805c-fa0f-48bb-940a-1039de89f19a', 'bb641fc7-07e2-4afd-bd99-6c239acc1698', '2024-03-04 18:08:48');
INSERT INTO `post_like` VALUES ('eb5a3aa2-bc3f-42b2-b8e6-671b3ab3508a', '1d75eac3-b05d-45be-b44d-7f7340842a94', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '2024-03-15 19:33:22');

-- ----------------------------
-- Table structure for refresh_token
-- ----------------------------
DROP TABLE IF EXISTS `refresh_token`;
CREATE TABLE `refresh_token`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `refresh_token`(`refresh_token` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of refresh_token
-- ----------------------------
INSERT INTO `refresh_token` VALUES ('203edfd6-c5cf-4538-81b3-a51ef9e63a74', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZodXVuaGFuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcwOTM1OTY3NiwiZXhwIjoxNzA5NDY3Njc2fQ.HlcNkM52EP0Z5DQiiwBh-n4y95LPvJ9mkH64eCQuAFawuPoq4BV8HMjN5In9Zl9ecYVSf9DdyTR_ROqgn6K5sQ', 'bb641fc7-07e2-4afd-bd99-6c239acc1698');
INSERT INTO `refresh_token` VALUES ('5b0daa17-ee7d-465f-88a1-68f8a9c58118', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMTIzIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcxMDQ3Mzg4MSwiZXhwIjoxNzEwNTgxODgxfQ.fbywJX2OSkwKdT5zVeNxZvAjmMDw8z0w-4zxT79ZJN-eWm5VhBe7ZOLfQB4uYYo0mpyPBuv3YVCrcKTIkKbhug', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d');
INSERT INTO `refresh_token` VALUES ('63c9ed27-f8d2-4552-b6b4-b0a99e7d1691', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFuaHV1bmhhbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MTAzMDY2ODUsImV4cCI6MTcxMDQxNDY4NX0.PBY2jQ2RnQD8WwIvhZ58a2qXrMJUzk-EBrYZ_ByQFfbalt97b8NWTaeFEVOgg32MjBjtw4OAUKs6_ZVE4S9uqA', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75');
INSERT INTO `refresh_token` VALUES ('64f582f3-07ef-4a42-b0e7-beeec1b4e9a9', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFuaHV1bmhhbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MTA0OTg5ODUsImV4cCI6MTcxMDYwNjk4NX0.nvARFHTrEEVfQdBPT74VB5Fni3mOyutAKg-Brkh8LARQVOAxJvSha1LFMEwUfob0X906yUcPTUqoAz9LVv3Fwg', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('26e2a766-0a8a-4311-b5e6-3d072f1ad155', '2024-03-01 23:26:25', 'anonymousUser', '2024-03-01 23:26:25', 'anonymousUser', 0, 'ROLE_ADMIN', 'Role for administrators');
INSERT INTO `role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', '2024-03-01 23:26:12', 'anonymousUser', '2024-03-01 23:26:12', 'anonymousUser', 0, 'ROLE_USER', 'Role for normal user');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `version` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `likes` int NULL DEFAULT 0,
  `bio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '2024-03-02 07:58:38', 'anonymousUser', '2024-03-15 10:38:39', 'user123', 14, 'tranhuunhan', '$2a$10$N8srrzHI/IjegzfUP6PDEeUtxgvIqOhgvDpxcRlpqlVTSuJS5ufw6', 'Tran Huu Nhan', NULL, 'nhandeptrai137@gmail.com', 'image_20240306_103503.jpeg', '0', 3, 'Test');
INSERT INTO `user` VALUES ('14c3c163-8205-40a2-b7a9-c95c0d5deae6', '2024-03-15 19:25:43', 'anonymousUser', '2024-03-15 19:33:22', 'tranhuunhan', 4, 'user246', '$2a$10$4r9IA8GUX1FweWy7KiygoeW3dnPixzfiG164Z71xZIniJlVyDfTry', 'USER TEST 246', NULL, 'user246@gmail.com', 'image_20240315_193122.png', '0', 2, 'Hello im dev java');
INSERT INTO `user` VALUES ('bae65cea-6e59-4b93-b04e-01b279f31dcc', '2024-03-15 10:34:49', 'anonymousUser', '2024-03-15 10:34:49', 'anonymousUser', 0, 'user1', '$2a$10$2LIDf.JB.ATTfBCygsSyfed8er/SFL7waxwYOZsGLp6X5nSetEQK2', 'user1', NULL, 'user1@gmail.com', NULL, '0', 0, NULL);
INSERT INTO `user` VALUES ('bb641fc7-07e2-4afd-bd99-6c239acc1698', '2024-03-02 07:51:21', 'anonymousUser', '2024-03-15 19:26:50', 'user246', 50, 'devhuunhan', '$2a$10$7ZIRQD3/BsVMncIvZJVo4O54cplGrjdcJ9nXeq1RcJIZn313eYywO', 'devhuunhan', NULL, 'devhuunhan@gmail.com', 'image_20240306_171358.png', '0', 4, 'Hi there! Im dev java.');
INSERT INTO `user` VALUES ('ce90692f-5a00-4b09-99bc-17d269396c29', '2024-03-06 08:44:37', 'anonymousUser', '2024-03-06 08:44:37', 'anonymousUser', 0, 'nguoila', '$2a$10$OqBh.vM02N9cXOvcKz7Wtujnrqmve4AMEp724FxsL/hOW7h5Ky2WK', 'nguoila', NULL, 'nguoila@gmail.com', NULL, '0', 0, NULL);
INSERT INTO `user` VALUES ('f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '2024-03-15 10:37:47', 'anonymousUser', '2024-03-15 19:26:05', 'user246', 1, 'user123', '$2a$10$x8nM8V2NL4.GCwCJOEhrGOE1zGtadO6IAEq5cW97EcAV69.08ZWcC', 'user123', NULL, 'user123@gmail.com', NULL, '0', 1, NULL);

-- ----------------------------
-- Table structure for user_bookmark
-- ----------------------------
DROP TABLE IF EXISTS `user_bookmark`;
CREATE TABLE `user_bookmark`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `post_id`) USING BTREE,
  INDEX `user_bookmark_ibfk_1`(`post_id` ASC) USING BTREE,
  CONSTRAINT `user_bookmark_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_bookmark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_bookmark
-- ----------------------------
INSERT INTO `user_bookmark` VALUES ('0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '143b51c9-1715-43e3-a9af-52963c0f35cf', '2024-03-07 15:57:52');
INSERT INTO `user_bookmark` VALUES ('0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '1d75eac3-b05d-45be-b44d-7f7340842a94', '2024-03-15 19:33:23');
INSERT INTO `user_bookmark` VALUES ('0c006c34-0ec0-4e51-8bb2-ba1dc7867c75', '4753805c-fa0f-48bb-940a-1039de89f19a', '2024-03-07 16:13:05');
INSERT INTO `user_bookmark` VALUES ('14c3c163-8205-40a2-b7a9-c95c0d5deae6', '0d6fe8ef-51be-407c-93da-996d07871509', '2024-03-15 19:26:49');
INSERT INTO `user_bookmark` VALUES ('14c3c163-8205-40a2-b7a9-c95c0d5deae6', '1d75eac3-b05d-45be-b44d-7f7340842a94', '2024-03-15 19:30:17');
INSERT INTO `user_bookmark` VALUES ('14c3c163-8205-40a2-b7a9-c95c0d5deae6', 'b67fc820-7533-4968-8f91-b5016343c4db', '2024-03-15 19:26:08');
INSERT INTO `user_bookmark` VALUES ('bb641fc7-07e2-4afd-bd99-6c239acc1698', '143b51c9-1715-43e3-a9af-52963c0f35cf', '2024-03-07 16:35:02');
INSERT INTO `user_bookmark` VALUES ('bb641fc7-07e2-4afd-bd99-6c239acc1698', '1d75eac3-b05d-45be-b44d-7f7340842a94', '2024-03-15 19:34:53');
INSERT INTO `user_bookmark` VALUES ('f78ad1d3-7aea-4039-a125-6dd8bcbeca7d', '0d6fe8ef-51be-407c-93da-996d07871509', '2024-03-15 10:38:30');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', '0c006c34-0ec0-4e51-8bb2-ba1dc7867c75');
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', '14c3c163-8205-40a2-b7a9-c95c0d5deae6');
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', 'bae65cea-6e59-4b93-b04e-01b279f31dcc');
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', 'bb641fc7-07e2-4afd-bd99-6c239acc1698');
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', 'ce90692f-5a00-4b09-99bc-17d269396c29');
INSERT INTO `user_role` VALUES ('8484633f-ba5f-4a3d-b776-a6fdc6c84691', 'f78ad1d3-7aea-4039-a125-6dd8bcbeca7d');

SET FOREIGN_KEY_CHECKS = 1;