import '../../../globals.css'

import { useEffect, useState} from 'react'
import { useEthers} from "@usedapp/core";
import { Contract, ethers } from "ethers";
import {contracts} from "../../helpers/contracts"
import {useFeeInfo, useCreateToken} from "../../helpers/factoryHooks.jsx"
import {formatter} from "../../helpers/formatter"
import { Link } from 'react-router-dom';




export default function FailModal ({isOpen, closeModal}) {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black opacity-70" onClick={closeModal}></div>

          {/* Modal content */}
          <div className="relative bg-base-8 connectbox border-4 border-black py-6 px-10 z-50 max-w-md w-full mx-4 shadow-lg">
            <div className={` text-3xl pb-2 pt-2 text-center`}>
              Fail!
            </div>
            <div className={` text-xl pb-4 pt-2 text-center`}>
              Something went wrong...
            </div> 
          </div>
        </div>
      );

 

}