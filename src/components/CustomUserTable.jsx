import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import CustomUserModal from './CustomUserModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetData, useDelete, useUpdateDoc, useUploadPic, useDeleteSignlePhoto } from './../firebase/useFirebase'
function CustomUserTable({ title }) {
  const tableHead = ["S. NO", "Profile", "Name", "Phone", "Provider", "Role", "Delete User", "Action"]
  const logo = "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Ffallback.jpg?alt=media&token=483a2d3c-92cf-4c7a-83ac-6cdc582428f9"
  const [user, setUser] = useState("")
  const [forDelete, setForDelete] = useState("")
  const [forEdit, setForEdit] = useState("")
  const [users, setUsers] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [filteredData, setFilteredData] = useState(users)

  const handleDelete = (name) => {
    let data = filteredData.filter((x) => name != x.displayName)
    setFilteredData(data)
  }
  const handleUpdate =async (id, data) => {
    try{
      await useUpdateDoc(id, data, "users")

    }catch(err){
      alert(err)
    }
    
    
  }
  useEffect(() => {
    (async () => {
      await useGetData(setUsers, "users")
    })()
  }, [])
  useEffect(() => {
    setFilteredData(users)
  }, [users])


  return (
    <>
      <h1>{title}</h1>
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
            filteredData && filteredData.map((user, index) => (
              <tr key={index}>
                <td >{++index}</td>
                <td > <img style={{ borderRadius: "50%" }} src={user["photoURL"] || logo} width="50" height="50" /></td>
                <td >{user["displayName"] ?? ""} </td>
                <td >{user["phoneNumber"] ?? ""}</td>
                <td >{user["providerId"] ?? ""}</td>
                <td >
                  <Form className="d-flex">
                    <Form.Group className="" controlId="ControlInput1">
                      <Form.Label>Merchant</Form.Label>
                      <InputGroup.Radio disabled={!(user["role"]["merchant"]?? true)} defaultChecked={user["role"]["merchant"]??"" ? true : false} aria-label="Radio button" />
                    </Form.Group>
                    <Form.Group className="ms-3" controlId="ControlInput2">
                      <Form.Label>User</Form.Label>
                      <InputGroup.Radio disabled={!(user["role"]["user"]??true)} defaultChecked={user["role"]["user"]??"" ? true : false} aria-label="Radio button" />
                    </Form.Group>
                  </Form>
                </td>
                <td >
                  <Button variant="danger" onClick={() => { setUser(user), setForEdit(""), setForDelete("forDelete"), setModalShow(true) }}>Delete</Button>
                </td>
                <td >
                  <Button variant="dark" onClick={() => { setUser(user), setForEdit("forEdit"), setForDelete(""), setModalShow(true) }}>Edit</Button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>


      <CustomUserModal
        show={modalShow}
        forEdit={forEdit}
        forDelete={forDelete}
        useDelete={useDelete}
        useDeleteSignlePhoto = {useDeleteSignlePhoto}
        item={user}
        handleDelete={handleDelete}
        collectionName={"users"}
        handleUpdate={handleUpdate}
        useUploadPic = {useUploadPic}
        onHide={() => setModalShow(false)}
      />
    </>

  );
}

export default CustomUserTable;