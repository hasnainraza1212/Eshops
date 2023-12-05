import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import CustomCategoryModal from './CustomCategoryModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetData, useDelete, useUpdateDoc } from './../../firebase/useFirebase'
const CategoryCustomTable = () => {
  const tableHead = ["S. NO", "Category Image", "category Id", "category Name", "Sub Category"]
  const categoryImage = "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/ads%2Fded86be1-d49b-4f27-a201-ebc20999cbe9.jpg?alt=media&token=4282c060-60cd-4d40-b9cc-d5ba5d8d28e9"
  const [category, setCategory] = useState("")
  const [forDelete, setForDelete] = useState("")
  const [forEdit, setForEdit] = useState("")
  const [categories, setCategories] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [filteredData, setFilteredData] = useState(categories)

  const handleDelete = (id) => {
    let data = filteredData.filter((x) => id != x.id)
    setFilteredData(data)
  }
  const handleUpdate = async (id, data) => {
    try {
      await useUpdateDoc(id, data, "categories")

    } catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    (async () => {
      await useGetData(setCategories, "categories")
    })()
  }, [])
  useEffect(() => {
    setFilteredData(categories)
  }, [categories])
  return (
    <div>
      <h1>All Categories</h1>
      <Table responsive>
        <thead>
          <tr >
            {
              tableHead && tableHead.map((headerItem, index) =>
              (
                <th key={index}> {headerItem}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filteredData && filteredData.map((category, index) => (
              <tr key={index}>
                <td >{++index}</td>
                <td > <img style={{ borderRadius: "5%" }} src={category["categoryImage"] || categoryImage} width="100" height="50" /></td>
                <td >{category["categoryId"] ?? ""} </td>
                <td >{category["categoryName"] ?? ""}</td>
                <td >{category["subCategories"].join(" , ") ?? ""}</td>
                <td >
                  <Button variant="danger" onClick={() => { setCategory(category), setForEdit(""), setForDelete("forDelete"), setModalShow(true) }}>Delete</Button>
                </td>
                <td >
                  <Button variant="dark" onClick={() => { setCategory(category), setForEdit("forEdit"), setForDelete(""), setModalShow(true) }}>Edit</Button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>


      <CustomCategoryModal
        show={modalShow}
        forEdit={forEdit}
        forDelete={forDelete}
        useDelete={useDelete}
        item={category}
        handleDelete={handleDelete}
        collectionName={"categories"}
        handleUpdate={handleUpdate}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
export default CategoryCustomTable