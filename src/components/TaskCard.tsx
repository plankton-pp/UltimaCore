import { JSXElementConstructor, useState } from "react";
import { TrashIcon, MaximizeIcon, PencilIcon } from "../assets/Icons";
import { Id, Task, Flag } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  showTaskDetail: (task: Task) => void;
  deleteTask: (id: Id) => void;
  updateTaskFlag: (id: Id, flagId: Id) => void;
  updateTaskHeader: (id: Id, header: string) => void;
  updateTaskContent: (id: Id, content: string) => void;
  flagElement: JSX.Element;

}

function TaskCard({ task, flagElement, deleteTask: deleteTask, showTaskDetail: showTaskDetail, updateTaskFlag: updateTaskFlag, updateTaskHeader: updateTaskHeader, updateTaskContent: updateTaskContent }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editModeHeader, setEditModeHeader] = useState(false);
  const [editModeContent, setEditModeContent] = useState(false);
  const [editModeFlag, setEditModeFlag] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editModeHeader,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {

    setEditModeContent((prev) => !prev);
    setMouseIsOver(false);
  };

  // const toggleFlag = () => {
  //   console.log("flag !!");
  //   setEditModeFlag((prev) => !prev);
  //   setMouseIsOver(false);
  // };

  // const getFlagClass = (): string => {

  //   return "flex justify-center items-center bg-rose-500 px-2 py-1 text-sm dot cursor-pointer";
  // }
  if (isDragging) {

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-amber-500  cursor-grab relative
      "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      bg-columnBackgroundColor
      w-[330px]
      rounded-md
      flex
      flex-col
      "
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
        bg-zinc-600
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-white
      border-2
      border-t border-l border-r
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-1">
          {flagElement}
          {!editModeHeader && (<div
            className="w-48"
            onClick={() => {
              setEditModeHeader(true);
            }}>{task.header}
          </div>)}
          {editModeHeader && (
            <input
              className="bg-black focus:border-indigo-500 border rounded outline-none px-2 w-48"
              value={task.header}
              onChange={(e) => updateTaskHeader(task.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditModeHeader(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditModeHeader(false);
              }}
            />
          )}
        </div>
        {mouseIsOver && (
          <div>
            <button
              onClick={() => {
                showTaskDetail(task);
              }}
              className="
              stroke-gray-500
              hover:stroke-white
              hover:bg-rose-500
              rounded
              "
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
              className="
              stroke-gray-500
              hover:stroke-white
              hover:bg-rose-500
              rounded
              "
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>

      {!editModeContent && (
        <div className="border-b border-l border-r hover:border-amber-300 rounded-b-md overflow-x-hidden overflow-y-auto min-h-[75px] max-h-[225px]"
          onClick={toggleEditMode}
        >
          <div
            className="h-full rounded-b-md items-center border-columnBackgroundColor border-2 whitespace-pre-wrap p-3 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-amber-200 active:bg-black"
          >
            {task.content}
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={() => {
                showTaskDetail(task);
              }}
              className="
              stroke-gray-500
              hover:stroke-white
              hover:bg-rose-500
              rounded
              mx-2
              "
            >
              <MaximizeIcon />
            </button>
          </div>
        </div>
      )}
      {editModeContent && (
        <div className="border-b border-l border-r border-amber-300 rounded-b-md overflow-x-hidden overflow-y-auto min-h-[75px]">
          <div className="min-h-[200px] items-center border-columnBackgroundColor border-2 whitespace-pre-wrap p-3 border-x-columnBackgroundColor hover:bg-mainBackgroundColor text-amber-200 active:bg-black">
            <textarea
              className="
              min-h-[200px] w-full resize-none border-none rounded bg-transparent focus:outline-none"
              value={task.content}
              autoFocus
              placeholder="Task content here"
              onBlur={toggleEditMode}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  toggleEditMode();
                }

              }}
              onChange={(e) => updateTaskContent(task.id, e.target.value)}
            />
          </div>
        </div>

      )}
    </div>
  );
}

export default TaskCard;
