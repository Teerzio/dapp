import "../../globals.css"
import { useEthers } from "@usedapp/core"
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import LaunchCard from "../components/landing/LaunchCard"
import devpage from "../assets/devpage.svg"


export default function Account (){

    const {account, chainId} = useEthers()
    const [searchParams, setSerchParams] = useSearchParams()
    const [devData, setDevData] = useState([])
    const [devAddr, setDevAddr] = useState("")

    
    useEffect (() => {

        const fetchData = async (devAddress) => {
            try {
                //const response = await axios.get(`https://kek.fm/api/getDev/${devAddress}`) // old implementation using vps
                const response = await axios.get(`https://indexer-rx9n.onrender.com/api/getDev/${devAddress}`) // new implementation using render

                const data = response.data
                console.log("devdata", data)

                const filtered =  data.filter((item, index, self) => index === self.findIndex((t) => (
                    item.timestamp === t.timestamp
                )))

                setDevData(filtered)
            }
           catch(e){console.log("error fetching dev data", e)}

        }

        const devAddress = searchParams.get("account")
        setDevAddr(devAddress)

        fetchData(devAddress)
    },[])

    return(

        <div className="flex flex-col pt-10 items-center mb-10">
            <div className="flex flex-col items-center">
                <div className="font-basic font-extrabold text-2xl mb-4">
                    <img src={devpage}></img>
                </div>
                {
                    <div className="connectbox border-4 border-black bg-base-5 px-4 py-2 font-basic font-semibold text-sm md:text-xl max-w-[300px]">
                        {devAddr.slice(0,10)}...{devAddr.slice(devAddr.length-8,devAddr.length)}
                    </div>
                }
                
            </div>
            <div className="flex flex-col bg-base-5 connectbox border-4 border-black gap-4 items-center w-full mt-20 overflow-x-auto pb-10">
                <div className="font-basic font-extrabold text-2xl pt-2">
                    devs past launches
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-8 p-4 overflow-x-auto">
                    {devData &&
                        devData.map((item,index) => (<LaunchCard key={index} data={item} />))
                    } 
                </div>
            </div> 
        </div>
    )
}