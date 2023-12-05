import Form from 'react-bootstrap/Form';
import { useReducer, useEffect, useState } from "react"
import { reducer, roleFinder } from "./../../utils/Global"
import { useUploadPic, useUploadDoc } from "./../../firebase/useFirebase"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
import {ImageNameGenerator} from "./../../utils/Global"
const AddUser = () => {
  const navigate = useNavigate()
  const initialState = {
    displayName: "",
    phoneNumber: "",
    providerId: "",
    role: "",
    photoURL: ""
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Ffallback.jpg?alt=media&token=483a2d3c-92cf-4c7a-83ac-6cdc582428f9")
  const [logo, setLogo] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Ffallback.jpg?alt=media&token=483a2d3c-92cf-4c7a-83ac-6cdc582428f9")
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }

  const handleUpload = async () => {
    const { displayName, phoneNumber, providerId, role } = state
    if (displayName && phoneNumber && providerId && role && downloadUrl) {
      setIsLoading(true)
      const data = {
        displayName,
        phoneNumber,
        providerId,
        role: roleFinder(role),
        photoURL: downloadUrl
      }
      await useUploadDoc(data, "users")
      setIsLoading(false)
      navigate("/")
    } else {
      alert("Fill out all fields!")
    }
  }
  useEffect(() => {
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
      if (!allowedFormats.includes(image.type)) {
        alert("invalid format")
      } else {
        setLogo(URL.createObjectURL(image))
        useUploadPic(image, `users/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])
  useEffect(() => {

  }, [downloadUrl])
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>Add User</h1>
        <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
        <label htmlFor="fileInput">
          <img style={{ borderRadius: "50%" }} src={logo} width="100" height="100" />
        </label>
      </div>

      <Form>
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => {
            handleInputChange(e)
          }} name="displayName" type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ControlInput2">
          <Form.Label>Phone</Form.Label>
          <Form.Control onChange={(e) => {
            handleInputChange(e)
          }} name="phoneNumber" type="tel" placeholder="+11234567890" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ControlInput3">
          <Form.Label>Provider</Form.Label>
          <Form.Select onChange={(e) => {
            handleInputChange(e)
          }} name="providerId" aria-label="Default select">
            <option value="">Select Provider</option>
            <option value="google">Google</option>
            <option value="firebase">Firebase</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ControlInput4">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" onChange={(e) => {
            handleInputChange(e)
          }} aria-label="Default select ">
            <option value="">Select Role</option>
            <option value="merchant">Merchant</option>
            <option value="user">User</option>
          </Form.Select>
        </Form.Group>
        <Button variant="dark" disabled={isLoading} onClick={handleUpload}>{isLoading ? "uploading..." : "create user"} </Button>
      </Form>
    </div>
  )

}
export default AddUser