import { useState } from "react";
import { Id } from "../types";

interface Props {
  updateTaskFlag: (id: Id, flagId: Id) => void;
  statusColor: string;
}

function Dot({ statusColor, updateTaskFlag: updateTaskFlag }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editModeHeader, setEditModeHeader] = useState<boolean>(false);
  const [editModeContent, setEditModeContent] = useState<boolean>(false);
  // const [editModeFlag, setEditModeFlag] = useState<boolean>(false);
  // const [flagClass, setFlagClass] = useState<string>(statusPalette);


  console.log(statusColor);

  //   const toggleEditMode = () => {

  //     setEditModeContent((prev) => !prev);
  //     setMouseIsOver(false);
  //   };


  // const toggleFlag = () => {
  //   console.log("flag !!");
  //   setEditModeFlag((prev) => !prev);
  //   setMouseIsOver(false);
  // };

  // const getFlagClass = (): string => {
  //   const statusDetail = defaultFlags.filter(status => task.flagId === status.id);
  //   console.log(task.header,statusDetail[0].color);

  //   return "flex justify-center items-center bg-" + statusDetail[0].color + " px-2 py-1 text-sm dot cursor-pointer";
  // }

  // console.log(statusColor);


  return (
    <div className={"flex justify-center items-center px-2 py-1 text-sm dot cursor-pointer bg-"+statusColor}></div>
  );
}

export default Dot;