import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useReducer, useState, useEffect } from "react"
import { reducer, removeEmptyValuesFromObject, ImageNameGenerator } from "./../../utils/Global"
const AdCustomModal = ({ onHide = () => { }, show, handleDelete = () => { }, handleUpdate = () => { }, forEdit, forDelete, item, useDelete = () => { }, collectionName = "", useDeleteSignlePhoto = () => { }, useUploadPic = () => { } }) => {
  const initialState = {
    adLocation: "",
    adImage: ""
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("")
  const [addImage, setAddImage] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fad.jpg?alt=media&token=d0e7c922-9278-44f7-9758-2ca5c9f0a9d1")
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleFormatData = () => {
    const formattedData = removeEmptyValuesFromObject({ ...state }, downloadUrl, "adImage")
    setData(formattedData)
  }
  useEffect(() => {
    const { adLocation } = state
    if (adLocation) {
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
        setAddImage(URL.createObjectURL(image))
        useUploadPic(image, `ads/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
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
          {forEdit && "Update" || forDelete && "Delete"} this {item["adLocation"]} Ad Permenently!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forDelete && <div className="d-flex align-items-center justify-content-center">
          <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => {
            handleDelete(item["id"]);
            collectionName && (useDelete(item?.id, collectionName), useDeleteSignlePhoto(item["adImage"]))
            onHide()
          }}>Delete</Button>
        </div>}
        {forEdit &&
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label>Ad Location</Form.Label>
                <Form.Control onChange={(e) => {
                  handleInputChange(e)
                }} name="adLocation" type="text" placeholder="top or middle..." />
              </Form.Group>
            </Form>
            <div className="mb-3">
              <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
              <label htmlFor="fileInput">
                <img style={{ borderRadius: "5%" }} src={addImage} width="100%" height="100" />
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
  )
}
export default AdCustomModal