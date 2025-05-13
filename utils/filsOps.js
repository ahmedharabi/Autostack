import fs from "node:fs";


const addToFile=(data)=>{
    if(fs.existsSync("./autostack.json")){
        const raw=fs.readFileSync("autostack.json","utf-8");
        const config=JSON.parse(raw);
        const newConfig={...config,...data};
        fs.writeFileSync("autostack.json",JSON.stringify(newConfig,null,2));
    }
    else{
        fs.writeFileSync("autostack.json",JSON.stringify(data,null,2));
    }
}


export {addToFile} ;