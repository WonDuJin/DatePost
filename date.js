const fs = require("fs")
const http = require("http")


const server = http.createServer((req,res)=>{

  const staticRoute=(fileName,statusCode,contentType)=>{
    const reatData = fs.readFileSync(fileName,(err)=>{
      if(err) throw err;
    });
    res.writeHead(statusCode,{"Content-Type":contentType})
    res.write(reatData)
    res.end()
  }
  let test =''
  let json ={}
  if(req.method === "POST","GET"){
    let url = req.url
    switch(url){
      case "/" :
        staticRoute("./date.html",200,"text/html")
        break;
      
      case "/post":
        req.on('data',(data)=>{
          test = decodeURI(data) +"\n"+ new Date().toISOString()
          json = JSON.stringify(test)
          console.log(json)
        })
        req.on('end',()=>{
          fs.writeFileSync('date.json',json)
          staticRoute("./date.json",200,"text/json")
        })
    }
  }


})

server.listen(5580,(err)=>{
  
  console.log("서버 가동중....")
  
  if(err) throw err
})
