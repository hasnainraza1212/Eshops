import Form from 'react-bootstrap/Form';
import { useReducer, useEffect, useState } from "react"
import { reducer , ImageNameGenerator} from "./../../utils/Global"
import { useUploadPic, useUploadDoc } from "./../../firebase/useFirebase"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
const AddBanner = () => {
  const navigate = useNavigate()
  const initialState = {
    bannerImage: "",
    bannerLocation: "",
    categoryId: ""
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3")
  const [banner, setBanner] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3")
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleUpload = async () => {
    const { bannerImage, bannerLocation, categoryId } = state
    if (downloadUrl && bannerLocation && categoryId) {
      setIsLoading(true)
      const data = {
        categoryId,
        bannerLocation,
        bannerImage: downloadUrl,
      }
      await useUploadDoc(data, "banners")
      setIsLoading(false)
      navigate("/banners")
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
        setBanner(URL.createObjectURL(image))
        useUploadPic(image, `banners/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])

  return (
    <div>
      <h1>Add banner</h1>

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
        <div className="mb-3">
          <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
          <label htmlFor="fileInput">
            <img style={{ borderRadius: "5%" }} src={banner} width="100%" height="100" />
          </label>
        </div>
        <Button variant="dark" disabled={isLoading} onClick={handleUpload}>{isLoading ? "uploading..." : "Add Banner"} </Button>
      </Form>
    </div>
  )
}
export default AddBanner