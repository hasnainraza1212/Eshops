import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useReducer, useState, useEffect } from "react"
import { reducer, removeEmptyValuesFromObject } from "./../../utils/Global"
const CustomUserModal = ({ onHide = () => { }, show, handleDelete = () => { }, handleUpdate = () => { }, forEdit, forDelete, item, useDelete = () => { }, collectionName = "" ,useDeleteSignlePhoto = ()=>{} , useUploadPic = () => { }}) => {

  const initialState = {
    bannerLocation: "",
    categoryId: "",
    bannerImage:""
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [isDisabled, setIsDisabled] = useState(true) 
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("")
  const [banner, setBanner] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleFormatData = () => {
    const formattedData = removeEmptyValuesFromObject({ ...state }, downloadUrl,"bannerImage")
    setData(formattedData)
  }
  useEffect(() => {
    const { categoryId, bannerLocation } = state
    if (categoryId || bannerLocation) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    handleFormatData()
  }, [state])
  useEffect(() => {
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
      if (!allowedFormats.includes(image.type)) {
        alert("invalid format")
      } else {
          setBanner(URL.createObjectURL(image))
        useUploadPic(image, `banners/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])
  useEffect(() => {
    if (downloadUrl) {
      handleFormatData()
      setIsDisabled(false)
    }
  }, [downloadUrl])
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
          {forEdit && "Update" || forDelete && "Delete"} this {item["categoryId"]} Banner Permenently!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forDelete && <div className="d-flex align-items-center justify-content-center">
          <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => {
            handleDelete(item["id"]);
            collectionName &&( useDelete(item?.id, collectionName), useDeleteSignlePhoto(item["bannerImage"]))
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
              <div className="mb-3">
                <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
                <label htmlFor="fileInput">
                  <img style={{ borderRadius: "5%" }} src={banner} width="100%" height="100" />
                </label>
              </div>
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
export default CustomUserModal;