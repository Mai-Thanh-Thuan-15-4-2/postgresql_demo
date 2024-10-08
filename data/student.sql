CREATE TABLE school.student (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender VARCHAR(10),
    part_time_job BOOLEAN,
    absence_days INTEGER,
    extracurricular_activities BOOLEAN,
    weekly_self_study_hours INTEGER,
    career_aspiration TEXT,
    math_score INTEGER,
    history_score INTEGER,
    physics_score INTEGER,
    chemistry_score INTEGER,
    biology_score INTEGER,
    english_score INTEGER,
    geography_score INTEGER
);

CREATE TABLE school.account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO school.student (first_name, last_name, email, gender, part_time_job, absence_days, extracurricular_activities, weekly_self_study_hours, career_aspiration, math_score, history_score, physics_score, chemistry_score, biology_score, english_score, geography_score)
VALUES
('Nguyễn', 'Văn A', 'nguyenvana@example.com', 'Male', true, 2, false, 5, 'Engineer', 85, 75, 88, 90, 78, 92, 80),
('Trần', 'Thị B', 'tranthib@example.com', 'Female', false, 1, true, 7, 'Doctor', 90, 85, 82, 88, 85, 95, 83),
('Lê', 'Quang C', 'lequangc@example.com', 'Male', true, 3, true, 4, 'Photographer', 70, 68, 75, 72, 76, 78, 80),
('Phạm', 'Minh D', 'phammingd@example.com', 'Male', false, 0, true, 6, 'Software Developer', 95, 90, 92, 94, 89, 93, 87),
('Vũ', 'Hồng E', 'vuhonge@example.com', 'Female', true, 2, false, 5, 'Artist', 88, 78, 85, 86, 84, 89, 81);



INSERT INTO school.account (username, pass, role) VALUES
('user', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('admin', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'admin'),
('user3', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('user4', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'admin'),
('user5', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('user6', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('user7', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'admin'),
('user8', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('user9', '$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3.', 'user'),
('user10', '"$2b$10$fQkgeNVW8mSVF/3JSEvboOE8MBn4lxh.iN7dYsr0y79dR4CQkx.3."', 'admin');
