import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import AdCustomModal from './AdCustomModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useGetData, useDelete, useUpdateDoc, useDeleteSignlePhoto, useUploadPic } from './../../firebase/useFirebase'
const AdCustomTable = () => {
  const tableHead = ["S. NO", "Ad", "Location"]
  const adImage = "https://firebasestorage.googleapis.com/v0/b/eshops-bbba3.appspot.com/o/defaultImages%2Fad.jpg?alt=media&token=d0e7c922-9278-44f7-9758-2ca5c9f0a9d1"
  const [ad, setAd] = useState("")
  const [forDelete, setForDelete] = useState("")
  const [forEdit, setForEdit] = useState("")
  const [ads, setAds] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [filteredData, setFilteredData] = useState(ads)
  const handleDelete = (id) => {
    let data = filteredData.filter((x) => id != x.id)
    setFilteredData(data)
  }
  const handleUpdate = async (id, data) => {
    try {
      await useUpdateDoc(id, data, "ads")

    } catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    (async () => {
      await useGetData(setAds, "ads")
    })()
  }, [])
  useEffect(() => {
    setFilteredData(ads)
  }, [ads])
  return (
    <div>
      <h1>All Ads</h1>
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
            filteredData && filteredData.map((ad, index) => (
              <tr key={index}>
                <td >{++index}</td>
                <td > <img style={{ borderRadius: "5%" }} src={ad["adImage"] || adImage} width="100" height="50" /></td>
                <td >{ad["adLocation"] ?? ""} </td>
                <td >
                  <Button variant="danger" onClick={() => { setAd(ad), setForEdit(""), setForDelete("forDelete"), setModalShow(true) }}>Delete</Button>
                </td>
                <td >
                  <Button variant="dark" onClick={() => { setAd(ad), setForEdit("forEdit"), setForDelete(""), setModalShow(true) }}>Edit</Button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>


      <AdCustomModal
        show={modalShow}
        forEdit={forEdit}
        forDelete={forDelete}
        useDelete={useDelete}
        useDeleteSignlePhoto={useDeleteSignlePhoto}
        item={ad}
        useUploadPic={useUploadPic}
        handleDelete={handleDelete}
        collectionName={"ads"}
        handleUpdate={handleUpdate}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
export default AdCustomTable