import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useReducer, useState, useEffect } from "react"
import { reducer, removeEmptyValuesFromObject } from "./../../utils/Global"
const CustomModal = ({ onHide = () => { }, show, handleDelete = () => { }, handleUpdate = () => { }, forEdit, forDelete, item, useDelete = () => { }, collectionName = "" }) => {
  const initialState = {
      categoryName: "",
      categoryId: "",
      categoryImage: "",
      subCategories: []

  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {forEdit && "Update" || forDelete && "Delete"} this {item["categoryId"]} Category Permenently!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forDelete && <div className="d-flex align-items-center justify-content-center">
          <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => {
            handleDelete(item["id"]);
            collectionName && useDelete(item?.id, collectionName)
            onHide()
          }}>Delete</Button>
        </div>}
        {forEdit &&
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="ControlInput1">
                  <Form.Label>Banner Location</Form.Label>
                  <Form.Control onChange={(e) => {
                    handleInputChange(e)
                  }} name="bannerLocation" type="text" placeholder="top or middle..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput2">
                  <Form.Label>category Id</Form.Label>
                  <Form.Control onChange={(e) => {
                    handleInputChange(e)
                  }} name="categoryId" type="text" placeholder="fashion or mobile..." />
                </Form.Group>
                </Form>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
                <Button variant="danger" disabled={isDisabled} onClick={() => {
                  setIsLoading(true)
                  setIsDisabled(true)
                  handleUpdate(item["id"], data)
                  setIsLoading(false)
                  !isLoading ? onHide() : ""
                }}>{isLoading ? "Updating..." : "Update"}</Button>
              </div>
            </div>
        }
          </Modal.Body>
    </Modal>
  );
}
export default CustomModal;