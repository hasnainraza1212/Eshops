import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import CustomBannerModal from './CustomBannerModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetData, useDelete, useUpdateDoc, useUploadPic, useDeleteSignlePhoto } from './../../firebase/useFirebase'
const BannerCustomTable = () => {
  const tableHead = ["S. NO", "Banner", "Location", "Category"]
  const bannerImage = "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fbanner.jpg?alt=media&token=4163ddbe-2c00-44be-b3d8-53c1598897f3"
  const [banner, setBanner] = useState("")
  const [forDelete, setForDelete] = useState("")
  const [forEdit, setForEdit] = useState("")
  const [banners, setBanners] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [filteredData, setFilteredData] = useState(banners)

  const handleDelete = (id) => {
    let data = filteredData.filter((x) => id != x.id)
    setFilteredData(data)
  }
  const handleUpdate = async (id, data) => {
    try {
      await useUpdateDoc(id, data, "banners")

    } catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    (async () => {
      await useGetData(setBanners, "banners")
    })()
  }, [])
  useEffect(() => {
    setFilteredData(banners)
  }, [banners])
  return (
    <div>
      <h1>All Banners</h1>
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
            filteredData && filteredData.map((banner, index) => (
              <tr key={index}>
                <td >{++index}</td>
                <td > <img style={{ borderRadius: "5%" }} src={banner["bannerImage"] || bannerImage} width="100" height="50" /></td>
                <td >{banner["bannerLocation"] ?? ""} </td>
                <td >{banner["categoryId"] ?? ""}</td>
                <td >
                  <Button variant="danger" onClick={() => { setBanner(banner), setForEdit(""), setForDelete("forDelete"), setModalShow(true) }}>Delete</Button>
                </td>
                <td >
                  <Button variant="dark" onClick={() => { setBanner(banner), setForEdit("forEdit"), setForDelete(""), setModalShow(true) }}>Edit</Button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>


      <CustomBannerModal
        show={modalShow}
        forEdit={forEdit}
        forDelete={forDelete}
        useDelete={useDelete}
        item={banner}
        handleDelete={handleDelete}
        useUploadPic ={useUploadPic}
        useDeleteSignlePhoto={useDeleteSignlePhoto} 
        collectionName={"banners"}
        handleUpdate={handleUpdate}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
export default BannerCustomTable