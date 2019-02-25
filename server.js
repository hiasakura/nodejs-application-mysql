var express = require('express');
var app = express();
var multer = require("multer");
var fs = require("fs");
const auth = require('./auth');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host : "XXXXXXXXXXXXXXXXXXXXXXXX",
	user : "XXXXXXXXXXXXXXXXXXXXXXXX",
	password : "XXXXXXXXXXXXXXXXXXXXXXXX",
	database: "XXXXXXXXXXXXXXXXXXXXXXXX",
});

app.use(auth);

app.set('view engine', 'pug');
app.use(express.static('views'));


// デフォルト処理
app.get('/top', function (req, res) {
	res.render('top', { title: 'トップ'});
});

// ファイルアップロード画面遷移
app.get('/insert_top', function (req, res) {
	res.render('insert_top', { title: 'ファイルデータロード'});
});

// 検索画面遷移
app.get('/search_top', function (req, res) {
	res.render('search_top', { title: '検索トップ'});
});

// データ削除画面遷移
app.get('/delete_top', function (req, res) {
	res.render('delete_top', { title: 'データ削除トップ'});
});

// File Upload & Data load
app.post('/file_upload', multer({dest: '/tmp/samplefup/'}).single('file'), function (req, res) {
    var delSql = "DELETE FROM mytimecard.records WHERE assigned= '" + req.body["assigned"] + "';"
	var insSql = "LOAD DATA LOCAL INFILE '" +req.file.path +"' INTO TABLE mytimecard.records FIELDS TERMINATED BY ',' IGNORE 1 ROWS;"
	// Data Delete 
    connection.query(delSql,
		function(err, results) {
			if(err){
				console.log(err);
			}
		}
	);
	// Data Insert 
    connection.query(insSql,
		function(err, results) {
			if(err){
				console.log(err);
			}

			// Delete tmp file
			fs.unlink(req.file.path, function (err) {
				if(err){
					console.log(err);
				}
			});
		}
	);

	res.render('ins_result', { title: '登録完了'});

});

// Data Delete
app.post('/delete', multer({dest: '/tmp/samplefup/'}).single('file'), function (req, res) {
    var delSql = "DELETE FROM mytimecard.records WHERE assigned= '" + req.body["assigned"] + "';"
	// Data Delete 
    connection.query(delSql,
		function(err, results) {
			if(err){
				console.log(err);
			}
		}
	);
	res.render('del_result', { title: '削除完了'});

});

// Data Search
app.post('/search', multer({dest: '/tmp/samplefup/'}).single('file'), function (req, res) {
    var selSql = "SELECT * FROM mytimecard.records WHERE assigned= '" + req.body["assigned"] + "';"
	// Data Search 
    connection.query(selSql, (err, rows, fields) => {
    	if (err) throw err;
    	res.render('search_result', { title: '検索完了', SearchData: rows});
  	});
});

var server = app.listen(58080, function() {
    console.log("listening at port %s", server.address().port);
});