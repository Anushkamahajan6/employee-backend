import * as mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ruchisunil",
  database: "anushka_training",
});
connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("connected");
});
// connection.query("SELECT * From employee", function (err, results, fields) {
//   if (err) {
//     console.log(err);
//   }
//   // console.log(results);
// // });
export default connection;
