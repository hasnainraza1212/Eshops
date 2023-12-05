import React, { useState, useEffect } from "react";
import { useGetData } from "./../../firebase/useFirebase"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from "react-router-dom"
const Category = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      await useGetData(setCategories, "categories")
    })()
  }, [])

  const getCategory = () => {
    if (category) {
      navigate(`/handle-category?categoryId=${category}`)
    } else {
      alert("Please select a Category")
    }
  }
  return (
    <div>
      <h1>All Categories</h1>
      <div className="d-flex align-items-center mt-5">
        <div className="labelCategory">Category Id</div>
        <Form.Select onChange={(e) => { setCategory(e.target.value) }}>
          <option>Select Category</option>
          {
            categories && categories.map((item, index) => {
              return (
                <option key={index} value={item["categoryId"]} >{item["categoryId"]}</option>
              )
            })

          }
        </Form.Select>

      </div>
      <div className="mt-4">
        <Button variant="dark" onClick={getCategory} >Search</Button>
      </div>
    </div>
  )
}
export default Category