const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex");
const options = { stats: true }
compiler.init(options)
const cors=require('cors')

app.use(bodyP.json({extended:true}))
app.use(bodyP.urlencoded({extended:true}));
app.use(cors())

app.use("/codemirror-5.65.16", express.static("E:/VSCODE_BACKUP/compiler/codemirror-5.65.16"))

app.get("/", function (req, res) {
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("E:/VSCODE_BACKUP/compiler/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang
    try {
        if (lang =="Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000}};
                compiler.compileCPP(envData, code, function (data) {
                    if(data.output){
                        res.send(data);
                     }else{
                         res.send({output:"error1"})
                     }
                });
            } else {
                var envData = { OS: "windows", cmd: "g++", options:{timeout:10000}};
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);
                     }else{
                         res.send({output:"error2"})
                     }
                });
            }
        } else if (lang =="Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if(data.output){
                        res.send(data);
                     }else{
                         res.send({output:"error3"})
                     }
                });
            } else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);
                     }else{
                         res.send({output:"error4"})
                     }
                });
            }
        } else if(lang=="Python"){
            if (!input) {
            
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    console.log(data);
                    if(data.output){
                        res.send(data);
                     }else{
                         res.send({output:"error5"})
                     }
                });
            } else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);
                     }else{
                        res.send({output:"error6"})
                     }
                });
            }
        }
    } catch (e) {
        console.log("error")
    }
})
app.listen(8000)

