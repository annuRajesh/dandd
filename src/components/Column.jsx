import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DeleteModal from './DeleteModal'
import {
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ColContainer from "./ColContainer";

const Column = ({ columns,handleDelete }) => {
  


  return (
    <div className="d-flex justify-content-center w-100 align-items-center">
      <Container
        fluid
        className="w-100 d-flex justify-content-center mt-5"
        style={{ height: "800px" }}
      >
        <SortableContext
          items={columns.map((col) => col.name)}
          strategy={rectSortingStrategy}
        >
          <Row className="gap-3" style={{ height: "100%" }}>
            {columns?.map((column) => (
              <ColContainer column={column} key={column.name} handleDelete={handleDelete}/>
            ))}
          </Row>
        </SortableContext>
      </Container>
    </div>
  );
};

export default Column;
