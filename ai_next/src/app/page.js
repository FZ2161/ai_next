"use client"

import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    const myRequest = async ()=>{
      try{
        const ftch = await fetch("http://192.168.0.185:5678/webhook-test/mywebhook", {
          headers: {
            header: "testHeaderValue",
          },
        })
      } catch(err) {
        if(err) {
          console.log(err)
        }
      }
    }
    myRequest()
  },[])

  return (
    <div>
      ok
    </div>
  );
}
