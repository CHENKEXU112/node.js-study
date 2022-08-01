//file:test.js
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./tmp/1.db', function(err) {
    if (err) console.log(err);
    db.run("create table test(name varchar(15))", function() {
        db.run("insert into test values('hello,world')", function() {
            db.all("select * from test", function(err, res) {
                if (!err)
                    console.log(JSON.stringify(res));
                else
                    console.log(err);
            });
        })
    });
});