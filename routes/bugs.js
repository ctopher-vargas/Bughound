var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../db');
const fileUpload = require('express-fileupload');
const fs = require("fs");
var middleWare = require('../middleware/index.js');


router.get('/', middleWare.isLoggedIn, function (req, res, next) {
    connection.query("SELECT bugs.bug_id, bugs.problem_summary, programs.program FROM bugs, programs WHERE bugs.prog_id = programs.prog_id;",
        function (err, results) {
            if (err) {
                throw err;
            } else {
                res.render('bugs/index', {bugs: results});
            }

        });

});

router.get('/new', middleWare.isLoggedIn, function (req, res, next) {
    connection.query("SELECT prog_id, program, program_version FROM programs;", function (err, programs) {
        if (err) {
            throw err;
        } else {
            connection.query("SELECT emp_id, username FROM employees;", function (err, users) {
                if (err) {
                    throw err;
                } else {
                    connection.query("SELECT area_id, prog_id, area FROM areas;", function (err, areas) {
                        if (err) {
                            throw err;
                        } else {
                            var program_count = Object.keys(programs).length;
                            res.render('bugs/new', {
                                programs: programs,
                                users: users,
                                areas: areas,
                                program_count: program_count
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/', middleWare.isLoggedIn, function (req, res, next) {
    var sql = 'INSERT INTO bugs(prog_id, area_id, report_type, severity, problem_summary, reproducible, problem,' +
        'suggested_fix, reported_by, date, assigned_to, comments, status, priority, resolution,' +
        'resolution_version, resolved_by, resolved_date, tested_by, tested_date, treat_as) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var reproducible = false;
    if (req.body.reproducible) {
        reproducible = true;
    }

    connection.query(sql, [req.body.prog_id, req.body.area_id, req.body.report_type, req.body.severity,
        req.body.problem_summary, reproducible, req.body.problem, req.body.suggested_fix,
        req.body.reported_by, req.body.date, req.body.assigned_to, req.body.comments,
        req.body.status, req.body.priority, req.body.resolution, req.body.resolution_version,
        req.body.resolved_by, req.body.resolved_date, req.body.tested_by, req.body.tested_date, req.body.treat_as], function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            req.flash("success", " bug successfully entered in the database");
            res.redirect('/home')
        }
    });
});

router.get('/edit/:bug_id', middleWare.isLoggedIn2up, function (req, res, next) {
    let bugSql = "SELECT *, DATE_FORMAT(date, \"%Y-%m-%d\") AS date, DATE_FORMAT(resolved_date, \"%Y-%m-%d\") AS resolved_date, DATE_FORMAT(tested_date, \"%Y-%m-%d\") AS tested_date FROM bugs WHERE bug_id = ?;";
    let areaSql = "SELECT areas.area, programs.program, areas.area_id FROM areas JOIN programs ON areas.prog_id = programs.prog_id WHERE areas.prog_id = ?;";
    let userSql = "SELECT username, emp_id FROM employees;";
    let programVersionSql = "SELECT DISTINCT program_version FROM programs WHERE program = ? ORDER BY program_version ASC;";


    connection.query(bugSql, [req.params.bug_id], function (err, bugs) {
        if (err) {
            throw err;
        } else {
            connection.query(areaSql, [bugs[0].prog_id], function (err, areas) {

                if (err) {
                    throw err;
                } else {
                    connection.query(userSql, function (err, employees) {
                        if (err) {
                            throw err;
                        } else {
                            connection.query("SELECT * FROM bugupload WHERE bug_id = ?", [req.params.bug_id]
                                , function (err, files) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        connection.query(programVersionSql, [areas[0].program], function (err, versions) {
                                            if (err) {
                                                throw err;
                                            } else {
                                                console.log(versions);
                                                res.render('bugs/edit', {
                                                    program: areas[0].program,
                                                    bug: bugs[0],
                                                    areas: areas,
                                                    users: employees,
                                                    files: files,
                                                    versions: versions
                                                });
                                            }

                                        });

                                    }
                                });
                        }
                    });
                }

            });
        }

    });

});

router.put('/edit/:bug_id', middleWare.isLoggedIn2up, function (req, res, next) {

    var reproducible = false;
    if (req.body.reproducible) {
        reproducible = true;
    }

    let sql = "UPDATE bugs SET prog_id = ?, area_id = ?, report_type = ?, severity = ?, problem_summary = ?, reproducible = ?, problem = ?, " +
        "suggested_fix = ?, reported_by = ?, date = ?, assigned_to = ?, comments = ?, status = ?, priority = ?, resolution = ?, " +
        "resolution_version = ?, resolved_by = ?, resolved_date = ?, tested_by = ?, tested_date = ?, treat_as = ? WHERE bug_id = ?";
    let sqlParams = [req.body.prog_id, req.body.area_id, req.body.report_type, req.body.severity,
        req.body.problem_summary, reproducible, req.body.problem, req.body.suggested_fix,
        req.body.reported_by, req.body.date, req.body.assigned_to, req.body.comments,
        req.body.status, req.body.priority, req.body.resolution, req.body.resolution_version,
        req.body.resolved_by, req.body.resolved_date, req.body.tested_by, req.body.tested_date, req.body.treat_as, req.params.bug_id];

    connection.query(sql, sqlParams, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            req.flash("success", " bug successfully updated in the database");
            res.redirect('/home')
        }


    });

});

router.get('/search', middleWare.isLoggedIn, function (req, res, next) {

    connection.query("SELECT prog_id, program FROM programs;", function (err, programs) {
        if (err) {
            throw err;
        } else {
            connection.query("SELECT emp_id, username FROM employees;", function (err, users) {
                if (err) {
                    throw err;
                } else {
                    connection.query("SELECT area_id, prog_id, area FROM areas;", function (err, areas) {
                        if (err) {
                            throw err;
                        } else {
                            var program_count = Object.keys(programs).length;
                            res.render('bugs/search', {
                                programs: programs,
                                users: users,
                                areas: areas,
                                program_count: program_count
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/search', middleWare.isLoggedIn, function (req, res, next) {

    let s = JSON.parse(JSON.stringify(req.body));

    let [sql, sqlParams] = constructSearchQuery(s);

    console.log(sql);
    console.log(sqlParams.toString());

    connection.query(sql, sqlParams, function (err, bugs) {
        if (err) {
            throw err
        } else {
            res.render('bugs/index', {bugs: bugs});
        }
    });


});

router.get('/delete', function (req, res, next) {
    res.render('bugs/delete');
});

router.post('/upload/:bug_id', fileUpload(), middleWare.isLoggedIn2up, function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.attach;
    let filePath = './uploadedfiles/' + file.name;

    // Use the mv() method to place the file somewhere on your server
    file.mv('./uploadedfiles/' + file.name, function (err) {
        if (err)
            return res.status(500).send(err);
        connection.query("INSERT INTO bugupload(bug_id, filepath, filename) VALUES (?, ?, ?)", [req.params.bug_id, filePath, file.name],
            function (err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    res.redirect('/bugs/edit/'+req.params.bug_id);
                }

            });

    });
});

router.get('/file', middleWare.isLoggedIn2up, function (req, res, next) {

    let path = './uploadedfiles/' + req.query.file;
    if (fs.existsSync(path)) {

        res.download(path, function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log(path);

            }

        });

    } else {
        console.log("file doesnt exist");
        res.status(204).send();
    }


});

function constructSearchQuery(s) {
    let sql = '';
    let sqlParams = [];
    for (var key in s) {

        if (s.hasOwnProperty(key) && s[key] != 0) {
            console.log("field filled in from form" + s[key])
            sql += " bugs." + key + " = ? AND";
            sqlParams.push(s[key]);
        }
    }

    if (sqlParams.length === 0)
        sql = "SELECT bugs.bug_id, bugs.problem_summary, programs.program, programs.prog_id FROM bugs INNER JOIN programs ON bugs.prog_id = programs.prog_id;";
    else {
        sql = "SELECT bugs.bug_id, bugs.problem_summary, programs.program, programs.prog_id FROM bugs INNER JOIN programs ON bugs.prog_id = programs.prog_id WHERE" + sql
        sql = sql.substring(0, sql.length - 3);

    }
    return [sql, sqlParams];
}

module.exports = router;
