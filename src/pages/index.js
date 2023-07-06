import React, { useEffect, useState, useRef } from "react";

export default function home() {
  const [getdata, setGetdata] = useState([]);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    fetch("https://naruto-api.fly.dev/api/v1/characters").then((response) =>
      response.json().then((j) => setGetdata(j))
    );
  }, []);
  // console.log(getdata);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, idx) => {
    dragItem.current = idx;
    // console.log(e.target.innerHTML, "drag start");
  };

  const dragEnter = (e, idx) => {
    dragOverItem.current = idx;
    // console.log(e.target.innerHTML, "drag enter");
  };

  const drop = (e) => {
    const copyListItems = [...getdata];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    setGetdata(copyListItems);
    // console.log(dragItemContent, "onDragEnd");
    finalData(dragItemContent);
  };
  const finalData = (item) => {
    // if (item) {
    //   let temp = [showData, ...item.name];
    //   let temp = setGetdata.p
    //   setShowData(temp);
    //   console.log("item", item);
    // }
    let dup = structuredClone(getdata);
    dup.push(item.name);
    setGetdata(dup)
    
    console.log(dup, "get data");
  };
  return (
    <div className="py-8 pl-8 flex gap-8">
      <div
        className="border-[1px] border-gray-700 w-full p-8"
        // onDragEnd={drop}
      >
        {/* {showBox && ( */}
        <div className="flex bg-gray-600 p-4 gap-4">
          {showData.map((item) => (
            <p className="text-white">{item}</p>
            // <div className="flex ">
            // </div>
            // <img src={item} />
          ))}
        </div>
        {/* )} */}
      </div>
      <div className="border-[1px] border-gray-700 w-80">
        <div className="p-8 flex flex-col gap-3">
          {getdata.map((item, idx) => (
            <div className="">
              <h2
                className="bg-gray-600 flex flex-col gap-2 p-6"
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={drop}
                key={idx}
                draggable
              >
                {item.name}
              </h2>
              {/* <img src={item.images[0]} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
