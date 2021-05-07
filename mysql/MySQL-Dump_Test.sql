CREATE DATABASE IF NOT EXISTS `testproject`;
USE `testproject`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `personen`;
CREATE TABLE `personen` (
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-05-15 00:00:00',
    `vorname` varchar(255) NOT NULL DEFAULT '',
    `nachname` varchar(255) NOT NULL DEFAULT '',
    `alter` int NOT NULL DEFAULT '0',
    `gruppen` varchar(255) NOT NULL DEFAULT '',
    `studiengang` varchar(255) NOT NULL DEFAULT '',
    `wohnort` varchar(255) NOT NULL DEFAULT '',
    `semester` int NOT NULL DEFAULT '0',
    `chats` varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

LOCK TABLES `personen` WRITE;
INSERT INTO `personen`
VALUES (1,'2021-04-02 18:21:26','Richard','Müller',28,'','WI7','Stuttgart',2,''),
       (2,'2021-04-21 15:36:01','Otto','Roller',39,'','IM7','Stuttgart',2,'');
UNLOCK TABLES;

--
-- Table structure for table `nachrichten`
--

DROP TABLE IF EXISTS `nachrichten`;
CREATE TABLE `nachrichten` (
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-05-15 00:00:00',
    `inhalt` varchar(255) NOT NULL DEFAULT '',
    `absender` int NOT NULL DEFAULT '0',
    `empfaenger` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
--    ,FOREIGN KEY (`absender`) REFERENCES personen(`id`),
--    FOREIGN KEY (`empfaenger`) REFERENCES personen(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping Data for nachrichten
--

LOCK TABLES `nachrichten` WRITE;
INSERT INTO `nachrichten`
VALUES (1,'2021-05-01 15:36:01','Hi, wie gehts dir',1,2),
       (2,'2021-05-01 16:02:45','Gut dir?',2,1),
       (3,'2021-05-02 09:50:59','Mir auch danke',1,2),
       (4,'2021-05-02 12:36:12','Kannst du Python?',1,2);
UNLOCK TABLES;