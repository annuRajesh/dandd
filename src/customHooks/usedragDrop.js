import { useState } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
export const useDragDrop = () => {
  const [columns, setColumns] = useState(() => {
    const storedColumns = localStorage.getItem("column");
    return storedColumns
      ? JSON.parse(storedColumns)
      : [
          { name: "Todo", templates: [] },
          { name: "Bug", templates: [] },
          { name: "lesson", templates: [] },
        ];
  });
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleSubmit = (values) => {
    const newValue = { ...values, id: Date.now() };
    setColumns((prev) => {
      const updatedColumns = prev.map((item) =>
        item.name === values.category
          ? { ...item, templates: [...item.templates, newValue] }
          : item
      );
      localStorage.setItem("column", JSON.stringify(updatedColumns));
      return updatedColumns;
    });
  };
  const handleDragEnd = (event) => {
    const { active, over, } = event;
    // if (active.id === over.id) return;
    if (
      active.data.current?.sortable.containerId !=
      over?.data.current?.sortable.containerId
    )
      return;
    const sourceCol = columns.find((col) =>
      col.templates.some((item) => item.id === Number(active.id))
    );
    const source = sourceCol.templates.findIndex(
      (item) => item.id === Number(active.id)
    );

    const end = sourceCol.templates.findIndex(
      (item) => item.id === Number(over.id)
    );
    const items = sourceCol.templates;
    const sorted = arrayMove(items, source, end);
    setColumns((prev) => {
      const updatedData = prev.map((col) => {
        if (col.name === sourceCol.name) return { ...col, templates: sorted };
        return col;
      });
      localStorage.setItem("column", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromContainer = active.data.current?.sortable?.containerId;
    const overContainer =
      over?.data?.current?.sortable?.containerId || over?.id;
    if (!fromContainer || !overContainer) return;
    if (fromContainer === overContainer) return;

    const fromCol = columns.find((col) => col.name === fromContainer);
    if (!fromCol) return;
    const endCol = columns.find((col) => col.name === overContainer);
    if (!endCol) return;

    const item = fromCol.templates.find(
      (item) => item.id === Number(active.id)
    );
    if (!item) return;
    const endUpdateCol = {
      ...endCol,
      templates: [...endCol.templates, { ...item, category: overContainer }],
    };
    const fromUpdateCol = {
      ...fromCol,
      templates: fromCol.templates.filter(
        (item) => item.id !== Number(active.id)
      ),
    };
    if (!endUpdateCol || !fromUpdateCol) return;
    setColumns((prev) => {
      const updated = prev.map((col) => {
        if (col.name === fromContainer) return fromUpdateCol;
        if (col.name === overContainer) return endUpdateCol;
        return col;
      });
      localStorage.setItem("column", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId({
      id: active.id,
      title: active.data.current.title,
      desc: active.data.current.description,
    });
  };
  const handleDelete=(id)=>{
   setColumns((prev)=>{
    const updatedColumns= prev.map((i)=>{
      return {...i,templates:i.templates.filter((item)=>item.id!==id)}
    })
localStorage.setItem('column',JSON.stringify(updatedColumns))
return updatedColumns
  
   })
  }
  return {
    columns,
    handleDragEnd,
    handleDragStart,
    handleSubmit,
    sensors,
    handleDragOver,
    activeId,
    handleDelete
  };
};
