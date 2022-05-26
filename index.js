const express = require("express");
const app = express();
const morgan = require("morgan")
// CUSTOMIZED ERROR CLASS
const AppError = require("./appError")


// *****************MIDDLEWARE*****************
app.use(morgan("tiny"));
app.use((req,res,next) => {
	// console.log(req.method, req.path);
	req.requestTime = Date.now();
	next();
});
app.use("/dogs",(req,res,next) => {
	console.log("THIS IS THE DOGS ROUTE");
	next()
})
const auth = (req,res,next) => {
	const {password} = req.query;
	// console.log(req.query.password, password)
	if(password === "545867"){
		next();
	}
		throw new AppError("PLEASE PROVIDE PASSWORD", 401)
}

app.get("/", (req,res) => {
	console.log(req.requestTime)
	res.send("HOME PAGE");
})

app.get("/error", (req,res) => {
	chicken.fly();
})
app.get("/admin", (req,res) => {
	throw new AppError("You are not an admin", 403)
})

app.get("/dogs", (req,res) => {
	res.send("WOOF WOOF");
})
app.get("/secret",auth, (req,res) => {
	res.send("THIS IS THE SECRET PAGE");
})

app.use((req,res,next) => {
	res.status(404).send("PAGE NOT FOUDN");
})

// app.use((err, req, res, next) => {
// 	console.log("*********************************************")
// 	console.log("*******************ERROR********************")
// 	console.log("*********************************************")
// 	console.log(err)
// 	next(err);
// 	res.status(500).send("OH BOY, WE HAVE AN ERROR: ")
// })

app.use((err, req, res, next) => {
	const {status = 500, message = "SOMETHING WENT WRONG"} = err;
	res.status(status).send(message)
})


app.listen(3000, () => {
	console.log("Server running on port 3000");
})