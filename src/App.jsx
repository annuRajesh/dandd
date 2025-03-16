import { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateModal from "./components/CreateModal";
import Column from "./components/Column";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useDragDrop } from "./customHooks/usedragDrop";
import CardCol from "./components/Card";

function App() {
  const {
    columns,
    handleDragEnd,
    handleDragStart,
    handleSubmit,
    handleDragOver,
    sensors,
    activeId,
    handleDelete
  } = useDragDrop();
  const overlayStyles = {
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    opacity: 0.7,
  };
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center mt-5"
        key={columns}
      >
        <CreateModal columns={columns} handleSubmit={handleSubmit} />
        <DndContext
          collisionDetection={pointerWithin}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        >
          <Column columns={columns} handleDelete={handleDelete}/>
          <DragOverlay style={overlayStyles}>
            {activeId ? (
              <CardCol id={activeId.id} title={activeId.title} description={activeId.desc} handleDelete={handleDelete}/>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
