import Form from 'react-bootstrap/Form';
import { useReducer, useEffect, useState } from "react"
import { reducer,ImageNameGenerator } from "./../../utils/Global"
import { useUploadPic, useUploadDoc } from "./../../firebase/useFirebase"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
const AddCategory = () => {
  const navigate = useNavigate()
  const initialState = {
    categoryId: "",
    categoryImage: "",
    categoryName: "",
    subCategories: []
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [dynamicCategories, setDynamicCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const [categorypreview, setCategoryPreview] = useState("https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/categories%2F68b70231-df8c-40cd-9aa9-fcc77602d2f0.jpg?alt=media&token=f272acfe-4a94-4a7b-921d-5c6e8a02bf30")
  
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }



  const handleUpload = async () => {
    const { categoryId, categoryName } = state
    if (downloadUrl && categoryId && categoryName ) {
      setIsLoading(true)
      const data = {
        categoryId,
        categoryImage: downloadUrl,
        categoryName,
      }
      await useUploadDoc(data, "categories")
      setIsLoading(false)
      navigate("/all-category")
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
        setCategoryPreview(URL.createObjectURL(image))
        useUploadPic(image, `categories/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])
  useEffect(()=>{
    (downloadUrl && state.categoryId && state.categoryName)? setIsDisabled(false):setIsDisabled(true)
    
  },[downloadUrl, state])

  return (
    <div>
      <h1 className="mb-5">
        Add Category
      </h1>
      <div >
        <div className="mb-3 ">
          <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
          <label htmlFor="fileInput">
            <img style={{ borderRadius: "5%" }} src={categorypreview} width="300px" height="200px" />
          </label>
        </div>
        <Form>
          <Form.Group className="mb-3 " controlId="ControlInput1">
            <Form.Label>Category ID</Form.Label>
            <Form.Control onChange={(e) => {
              handleInputChange(e)
            }} name="categoryId" type="text" placeholder="Clothes or Mobiles..." />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="ControlInput2">
            <Form.Label>Category Name</Form.Label>
            <Form.Control onChange={(e) => {
              handleInputChange(e)
            }} name="categoryName" type="text" placeholder="Men or Women..." />
          </Form.Group>
         
          <div className="mt-4">
            <Button variant="dark" disabled={isDisabled || isLoading} onClick={handleUpload}>{isLoading ? "uploading..." : "Create Category"} </Button>
          </div>
        </Form>
      </div>

    </div>
  )
}
export default AddCategory