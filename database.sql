#our database for bughound
CREATE TABLE Bug (
	bug_ID	INT NOT NULL, 
	program VARCHAR(100), 
	report_type INT, 
	severity INT, 
	problem_summary VARCHAR(100), 
	reproducable BOOLEAN,
	problem VARCHAR(255), 
	suggested_fix VARCHAR(255), 
	reported_by VARCHAR(255), 
	date_found  DATE,
	comments VARCHAR(255) 
);

