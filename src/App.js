import React, { useEffect, useState } from "react";
import "./App.css";
import OwnerSection from "./OwnerSection";
import UserSection from "./UserSection";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import { LogDescription } from "ethers/lib/utils";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ownersection" element={<OwnerSection />} />
        <Route path="/usersection" element={<UserSection />} />
      </Routes>{" "}
    </div>
  );
}



// image Urls:
// name: chain , Description: chain to connect items
// https://5.imimg.com/data5/SELLER/Default/2023/6/316583982/VU/CT/LD/75370465/heavy-duty-stainless-steel-link-chain-500x500.png,
// name: sticky notes , description: to follow yourself , https://static.vecteezy.com/system/resources/thumbnails/021/095/637/small/3d-render-illustration-of-post-it-icon-office-material-png.png,
// name: bricks , description: for making houses, https://e7.pngegg.com/pngimages/217/602/png-clipart-brick-building-materials-graphy-architectural-engineering-total-seal-llc-browse-and-brick-s-photography-material.png,
//name :anteena , description: for connections,  https://e7.pngegg.com/pngimages/856/821/png-clipart-wireless-router-wi-fi-tp-link-antenna-six-black-antenna-router-computer-network-png-material.png
//name: pen-book , description: to write and read,   https://s3.wp.wsu.edu/uploads/sites/1579/2017/11/form-icon-396x481.png