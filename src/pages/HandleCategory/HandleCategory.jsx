import { useLocation } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetQueryData, useDelete, useUploadPic, useUpdateDoc, useDeleteSignlePhoto } from "./../../firebase/useFirebase"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {ImageNameGenerator} from "./../../utils/Global"
const fallBack = "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3"
const EditCategory = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const queryCategoryId = queryParams.get("categoryId")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [subCategory, setSubCategory] = useState([])
  const [category, setCategory] = useState({})
  const [categoryName, setCategoryName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [forUpdateCategory, setForUpdateCategory] = useState("")
  const [forDeleteCategory, setForDeleteCategory] = useState("")
  const [item, setItem] = useState({})
  const [index, setIndex] = useState("")
  const [preview, setPreview] = useState("")
  const navigate = useNavigate()
  const handlePreview = (type, item) => {
    if (type === "Update Category") {
      return setPreview(category?.["categoryImage"])
    }
    if (type === "Update Sub Category") {
      return setPreview(item?.["categoryImage"])
    }
  }
  useEffect(() => {
    (async () => {
      try {
        await useGetQueryData(setData, "categories", "categoryId", queryCategoryId)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  
  useEffect(() => {
    if (data?.length > 0) {
      setCategory({
        categoryImage: data[0]["categoryImage"],
        categoryId: data[0]["categoryId"],
        categoryName: data[0]["categoryName"]
      });
      if (data[0]?.["subCategories"]?.length > 0) {
        setSubCategory(data[0]["subCategories"]);
      }
    }
  }, [data])

  if (!queryCategoryId) {
    navigate("/all-category")
  }
  return (
    <>
      <h1 className="m-0 p-0">Edit Category</h1>
      {data[0]?.id ? <div className="container-fluid mt-5 p-0">
        <div className="row ms-1">
          <div className="col-md-6 rounded p-0">
            <img className="col-md-11 rounded p-0" src={data[0]["categoryImage"] || fallBack} />
          </div>
          <div className="col-md-6 d-flex align-items-end justify-content-between p-0">
            <div className="">
              {data[0]["categoryId"] ? <p className="m-0 fs-2">Category Id : {data[0]["categoryId"]}</p> : ""}
              {data[0]["categoryName"] ? <p className="m-0 fs-2">Category Name : {data[0]["categoryName"]}</p> : ""}
            </div>
            <div className="">
              <Button variant="danger bi bi-trash2-fill fs-2 me-5"
                onClick={() => {
                  setShow(true)
                  setForUpdateCategory("")
                  setForDeleteCategory("Delete Category")
                }} ></Button>
              <Button variant="dark bi bi-pencil fs-2"
                onClick={() => {
                  setShow(true)
                  setForUpdateCategory("Update Category")
                  setForDeleteCategory("")
                  setCategoryName(category["categoryName"])
                  setCategoryId(category["categoryId"])
                  handlePreview("Update Category")
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div> : "loading..."}

      {subCategory?.length > 0 ? <h1 className="mt-5 ms-1">Edit Sub Category</h1> : ""}
      {data[0]?.id ? subCategory?.map((item, index) => {
        return (
          <div key={index} className="container-fluid mt-5 ">
            <div className="row ">
              <div className="col-md-5 rounded ">
                <img className="rounded col-10" src={item["categoryImage"] || fallBack} />
              </div>
              <div className="col-md-7 d-flex align-items-end justify-content-between p-0">
                <div className="">
                  {item["categoryId"] ? <p className="m-0 fs-2">Category Id : {item["categoryId"]}</p> : ""}
                  {item["categoryName"] ? <p className="m-0 fs-2">Category Name : {item["categoryName"]}</p> : ""}
                </div>
                <div className="">
                  <Button variant="danger bi bi-trash2-fill fs-2 me-5"
                    onClick={() => {
                      setShow(true)
                      setForUpdateCategory("")
                      setForDeleteCategory("Delete Sub Category")
                      setItem(item)
                      setIndex(index)
                    }} ></Button>
                  <Button variant="dark bi bi-pencil fs-2"
                    onClick={
                      () => {
                        setShow(true)
                        setForUpdateCategory("Update Sub Category")
                        setForDeleteCategory("")
                        setCategoryName(item["categoryName"])
                        setCategoryId(item["categoryId"])
                        setItem(item)
                        setIndex(index)
                        handlePreview("Update Sub Category", item)
                      }
                    }
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        )
      }) : "loading..."}
      <Button
        variant={"success fs-2 bi bi-plus-circle-fill"}
        className="ms-auto d-block mt-5"
        onClick={
          () => {
            setShow(true)
            setForDeleteCategory("")
            setForUpdateCategory("Add Sub Category")
            setIsLoading(true)
          }
        }
      ></Button>
      <DeleteCategoryModal
        show={show}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCategoryName={setCategoryName}
        setCategory={setCategory}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        categoryName={categoryName}
        setPreview={setPreview}
        preview={preview}
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        setForDeleteCategory={setForDeleteCategory}
        setForUpdateCategory={setForUpdateCategory}
        data={data[0]}
        forUpdateCategory={forUpdateCategory}
        forDeleteCategory={forDeleteCategory}
        onHide={() => { setShow(false), setForUpdateCategory(""), setForDeleteCategory(""), setPreview(""), setCategoryName(""), setCategoryId("") }}
        item={item}
        index={index}
      />
    </>
  )
}

const DeleteCategoryModal = ({
  show = false, item = {}, preview = "",isLoading=false,setIsLoading=()=>{} , categoryId = "", setSubCategory = () => { }, setCategoryId = () => { }, setCategoryName = () => { },
  categoryName = "", setPreview = () => { }, category = {}, subCategory = [], index = 0, forDeleteCategory = "",
  setForDeleteCategory = () => { }, setForUpdateCategory = () => { }, setCategory = () => { }, forUpdateCategory = "", onHide = () => { }, data = {}
}) => {
  const [image, setImage] = useState(null)
  const [downloadUrl, setDownlodUrl] = useState("")
  const navigate = useNavigate()
  const handleAddSubCategory =async (id) => {
    try{
      let obj;
      setIsLoading(true)
      let subData = [...subCategory]
        subData.push({categoryId, categoryName, categoryImage:downloadUrl})
      setSubCategory(subData)
      obj={
        ...category, subCategories:subData
      }

      await useUpdateDoc(id, obj, "categories")
      setDownlodUrl("")
      setCategoryId("")
      setCategoryName("")
      setPreview("")
      onHide()
      setForUpdateCategory("")
      setIsLoading(false)
    }catch(err){
      alert(err.message)
    }
  }
  const handleDelete = async (id, collectionName) => {
    try {
      
      if (id && collectionName){
          setIsLoading(true)
          if  (category["categoryImage"]){
            await useDeleteSignlePhoto(category["categoryImage"])
          }
          await useDelete(id, collectionName)
          setIsLoading(false)
        }
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
    }

  }
  const handleCategoryDelete = async (id) => {
    handleDelete(id, "categories")
    onHide()
    setForUpdateCategory("")
    setForDeleteCategory("")
    navigate("/all-category")
  }
  const handleSubCategoryDelete = async (id) => {
    try {
      setIsLoading(true)
      let obj
      let subData = [...subCategory]
      await useDeleteSignlePhoto(subData[index]["categoryImage"])
      subData.splice(index, 1)
      setSubCategory(subData)
      obj = { ...category, subCategories: subData }
      await useUpdateDoc(id, obj, "categories")
      onHide()
      setPreview("")
      setForUpdateCategory("")
      setForDeleteCategory("")
      setIsLoading(false)
    } catch (err) {
      alert(err.message)
      setIsLoading(false)

    }

  }

  const handleCategoryUpdate = async (id) => {
    try {
      setIsLoading(true)
      let obj;
      let upData;
      if (downloadUrl) {
        await useDeleteSignlePhoto(category["categoryImage"])
        obj =
        {
          categoryImage: category["categoryImage"] = downloadUrl,
          categoryId: category["categoryId"] = categoryId,
          categoryName: category["categoryName"] = categoryName
        }
        upData = { ...obj, subCategories: subCategory }
      }
      else {
        obj =
        {
          categoryImage: category["categoryImage"] = category["categoryImage"],
          categoryId: category["categoryId"] = categoryId,
          categoryName: category["categoryName"] = categoryName
        }
        upData = { ...obj, subCategories: subCategory }
      }
      await useUpdateDoc(id, upData, "categories")
      navigate("/all-category")
      setCategoryName("")
      setCategoryId("")
      onHide()
      setForUpdateCategory("")
      setForDeleteCategory("")
      setPreview("")
      setDownlodUrl("")
      setIsLoading(false)
    } catch (err) {
      alert(err.message)
      setIsLoading(false)
    }
  }
  const handleSubCategoryUpdate = async (id) => {

    try {
      setIsLoading(true)
      let obj;
      let subData = [...subCategory]
      subData[index]["categoryName"] = categoryName
      subData[index]["categoryId"] = categoryId
      if (downloadUrl) {
        if(subData[index]["categoryImage"]){
          await useDeleteSignlePhoto(subData[index]["categoryImage"])
        }
        subData[index]["categoryImage"] = downloadUrl
      }
      else {
        subData[index]["categoryImage"] = subData[index]["categoryImage"]
      }
      obj = { ...category, subCategories: subData }
      await useUpdateDoc(id, obj, "categories")
      setCategoryName("")
      setCategoryId("")
      onHide()
      setForUpdateCategory("")
      setForDeleteCategory("")
      setDownlodUrl("")
      setPreview("")
      setIsLoading(false)

    } catch (err) {
      alert(err.message)
      setIsLoading(false)
    }

  }
  useEffect(() => {
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
      if (!allowedFormats.includes(image.type)) {
        alert("invalid format")
      } else {
        setPreview(URL.createObjectURL(image))
        useUploadPic(image, `categories/${ImageNameGenerator(image)}`, setDownlodUrl, setIsLoading)
      }
    }
  }, [image])

  useEffect(()=>{
    if(forUpdateCategory === "add sub category"){
      if (categoryId && categoryName && downloadUrl){
        setIsLoading(false)
      }
      else{
        setIsLoading(true)
      }
      }
    
  },[categoryId, categoryName, downloadUrl])


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {
              (forUpdateCategory || forDeleteCategory)
              &&
              <div>
                {
                  forUpdateCategory.toLowerCase().includes("update category")
                    ? `Update Category ${data.categoryId}`
                    : forUpdateCategory.toLowerCase().includes("update sub category")
                      ? `Update Sub Category ${data.categoryId}`
                      : forDeleteCategory.toLowerCase().includes("delete category")
                        ? `Delete Category ${data.categoryId}`
                        : forDeleteCategory.toLowerCase().includes("delete sub category")
                          ? `Delete Sub Category ${data.categoryId}`
                          : forUpdateCategory.toLowerCase().includes("add sub category")
                            ? `Add Sub Category `
                            : ""
                }
              </div>
            }

          </Modal.Title>
        </Modal.Header>
        {forUpdateCategory && <Modal.Body>
          <div className={"my-4"}>
            <input name="file" onChange={(e) => { setImage(e.target.files[0]) }} className="d-none" type="file" id="fileInput" />
            <label htmlFor="fileInput">
              <img style={{ borderRadius: "5%" }} src={preview || fallBack} width="250" height="150" />
            </label>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>
                {
                  forUpdateCategory === "Update Category"
                    ? "Category Id"
                    : forUpdateCategory === "Update Sub Category"
                      ? "Sub Category Id"
                      : forUpdateCategory.toLowerCase().includes("add sub category")
                        ? "Add Sub Category Id"
                        : ""
                }

              </Form.Label>
              <Form.Control
                onChange={(e) => { setCategoryId(e.target.value) }}
                value={categoryId}
                name="categoryId" type="text"
                placeholder={
                  forUpdateCategory === "Update Category"
                    ? "Category Id"
                    : forUpdateCategory === "Update Sub Category"
                      ? "Sub Category Id"
                      : forUpdateCategory.toLowerCase().includes("add sub category")
                        ? "Sub Category Id"
                        : ""
                }

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput2">
              <Form.Label>
                {
                  forUpdateCategory === "Update Category"
                    ? "Category Name"
                    : forUpdateCategory === "Update Sub Category"
                      ? "Sub Category Name"
                      : forUpdateCategory.toLowerCase().includes("add sub category")
                        ? "Add Sub Category Name"
                        : ""
                }
              </Form.Label>
              <Form.Control
                onChange={(e) => { setCategoryName(e.target.value) }}
                value={categoryName}
                name="categoryName" type="text"
                placeholder=
                {
                  forUpdateCategory === "Update Category"
                    ? "Category Name"
                    : forUpdateCategory === "Update Sub Category"
                      ? "Sub Category Name"
                      : forUpdateCategory.toLowerCase().includes("add sub category")
                        ? "Sub Category Name"
                        : ""
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>}

        <Modal.Footer className="d-flex align-items-center justify-content-center">
          {forDeleteCategory && <Button variant={"danger"} disabled={isLoading} onClick={async () => {
            forDeleteCategory === "Delete Category"
              ? await handleCategoryDelete(data.id)
              : await handleSubCategoryDelete(data.id)
          }}>{forDeleteCategory}</Button>}
          {
            forUpdateCategory &&
            <Button disabled={isLoading} variant={"success"} onClick={async () => {
              forUpdateCategory.toLowerCase().includes("update category")
                ? handleCategoryUpdate(data?.id)
                : forUpdateCategory.toLowerCase().includes("update sub category")
                  ? handleSubCategoryUpdate(data?.id)
                  : forUpdateCategory.toLowerCase().includes("add sub category")
                    ?handleAddSubCategory(data.id)
                    : ""
            }}>
              {
                forUpdateCategory.toLowerCase().includes("update sub category")
                ? "Update Sub Category"
                : forUpdateCategory.toLowerCase().includes("add sub category")
                  ? "Add Sub Category"
                :forUpdateCategory.toLowerCase().includes("update category")
                ?"Update Category"
                :"Update"
              }
            
            </Button>
          }
          <Button variant={"dark"} disabled={isLoading} onClick={() => {
            onHide()
            setForUpdateCategory("")
            setForDeleteCategory("")
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default EditCategory