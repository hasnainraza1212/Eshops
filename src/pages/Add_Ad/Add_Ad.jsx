import Form from 'react-bootstrap/Form';
import { useReducer, useEffect, useState } from "react"
import { reducer , ImageNameGenerator} from "./../../utils/Global"
import { useUploadPic, useUploadDoc } from "./../../firebase/useFirebase"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
const Add_Ad = () => {
  const navigate = useNavigate()
  const initialState = {
      adImage: "",
      adLocation: ""
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fad.jpg?alt=media&token=d0e7c922-9278-44f7-9758-2ca5c9f0a9d1")
  const [addImage, setAddImage] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fad.jpg?alt=media&token=d0e7c922-9278-44f7-9758-2ca5c9f0a9d1")
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleUpload = async () => {
    const { adImage, adLocation } = state
    if (downloadUrl && adLocation) {
      setIsLoading(true)
      const data = {
        adLocation,
          adImage: downloadUrl,
      }
      await useUploadDoc(data, "ads")
      setIsLoading(false)
      navigate("/ads")
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
        setAddImage(URL.createObjectURL(image))
        useUploadPic(image, `ads/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])

  return (
    <div>
      <h1>Create Ad</h1>

      <Form>
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Ad Location</Form.Label>
          <Form.Control onChange={(e) => {
            handleInputChange(e)
          }} name="adLocation" type="text" placeholder="top or middle..." />
        </Form.Group>
        <div className="mb-3">
          <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
          <label htmlFor="fileInput">
            <img style={{ borderRadius: "5%" }} src={addImage} width="100%" height="100" />
          </label>
        </div>
        <Button variant="dark" disabled={isLoading} onClick={handleUpload}>{isLoading ? "uploading..." : "Create Add"} </Button>
      </Form>
    </div>
  )
}
export default Add_Ad