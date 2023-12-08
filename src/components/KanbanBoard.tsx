import { PlusIcon } from "../assets/Icons";
import { useMemo, useState } from "react";
import { Column, Flag, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    header: "List Admin",
    content: "List admin APIs for dashboard",
    flagId: "flg02"
  },
  {
    id: "2",
    columnId: "todo",
    header: "Dev Register",
    content: "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
    flagId: "flg02"
  },
  {
    id: "3",
    columnId: "doing",
    header: "Security Testing",
    content: "Conduct security testing",
    flagId: "flg04"
  },
  {
    id: "4",
    columnId: "doing",
    header: "Analyze Comp",
    content: "Analyze competitors",
    flagId: "flg01"
  },
  {
    id: "5",
    columnId: "done",
    header: "Ui Docs",
    content: "Create UI kit documentation",
    flagId: "flg02"
  },
  {
    id: "6",
    columnId: "done",
    header: "Dev Meeting",
    content: "Dev meeting",
    flagId: "flg01"
  },
  {
    id: "7",
    columnId: "done",
    header: "Dashboard Prototype",
    content: "Deliver dashboard prototype",
    flagId: "flg01"
  },
  {
    id: "8",
    columnId: "todo",
    header: "Optimize Perf",
    content: "Optimize application performance",
    flagId: "flg03"
  },
  {
    id: "9",
    columnId: "todo",
    header: "Data Validation",
    content: "Implement data validation",
    flagId: "flg02"
  },
  {
    id: "10",
    columnId: "todo",
    header: "DB Design",
    content: "Design database schema",
    flagId: "flg03"
  },
  {
    id: "11",
    columnId: "todo",
    header: "SSL Integration",
    content: "Integrate SSL web certificates into workflow",
    flagId: "flg03"
  },
  {
    id: "12",
    columnId: "doing",
    header: "Imp Error",
    content: "Implement error logging and monitoring",
    flagId: "flg04"
  },
  {
    id: "13",
    columnId: "doing",
    header: "DnI",
    content: "Design and implement responsive UI",
    flagId: "flg03"
  },
];


const defaultFlags: Flag[] = [
  {
    id: "flg01",
    name: "Calm-Later",
    color:"lime-400",
    abbr: "CL",
  },
  {
    id: "flg02",
    name: "Calm-Now",
    color:"blue-300",
    abbr: "CN",
  },
  {
    id: "flg03",
    name: "Fire-Later",
    color:"amber-300",
    abbr: "FL",
  },
  {
    id: "flg04",
    name: "Fire-Now",
    color:"rose-500",
    abbr: "FN",
  }
];
function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="
        backdrop-blur-sm bg-white/10
        h-80vh
        m-auto flex 
        gap-4 
        p-4 
        rounded 
        rounded-md
        rounded-b-none
        border-rose-500">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  showTaskDetail={showTaskDetail}
                  deleteTask={deleteTask}
                  defaultFlags={defaultFlags}
                  updateTaskFlag = {updateTaskFlag}
                  updateTaskHeader={updateTaskHeader}
                  updateTaskContent={updateTaskContent}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-amber-300
      hover:ring-2
      flex
      gap-2
      "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                showTaskDetail={showTaskDetail}
                deleteTask={deleteTask}
                updateTaskFlag = {updateTaskFlag}
                updateTaskHeader={updateTaskHeader}
                updateTaskContent={updateTaskContent}
                defaultFlags={defaultFlags}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                showTaskDetail={showTaskDetail}
                deleteTask={deleteTask}
                updateTaskFlag = {updateTaskFlag}
                updateTaskHeader={updateTaskHeader}
                updateTaskContent={updateTaskContent}
                defaultFlags={defaultFlags}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      header:`Task ${tasks.length + 1}`,
      content: '',
      flagId: 'flg01'
    };

    setTasks([...tasks, newTask]);
  }

  function showTaskDetail(taskTarget: Task) {
    console.log(taskTarget);
    
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTaskFlag(id: Id, flagId: Id) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, flagId };
    });

    setTasks(newTasks);
  }

  function updateTaskContent(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function updateTaskHeader(id: Id, header: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, header };
    });

    setTasks(newTasks);
  }


  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
