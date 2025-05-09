#!/usr/bin/env node
import {program} from "commander";
import fs from "node:fs"
program
     .name("autostack")
     .description("cli tool to automate infrastructure files boilerplate")
     .argument("<arg1>","action type")
     .argument("[arg1]","file type")
     .action((arg1,arg2)=>{
          if(arg1==="init"){
               fs.appendFile(".autostack","lang=python",function (err) {
                   if (err) throw err;
                   console.log('config file created');
               });
          }
         else if(arg1==="gen"){
             if (arg2==="docker"){
                 fs.appendFile("dockerfile","",function (err){
                     if(err)throw err;
                     console.log("dockerfile created")
                 })
             }



             /*fs.appendFile(".autostack","lang=python",function (err) {
                 if (err) throw err;
                 console.log('config file created');
             });*/
         }
     })
program.parse();
