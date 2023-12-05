import image404 from "./../../images/404.png"
import  "./../../App.css"
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom"
const NotFound = ()=>{
    return (
        <div className="not_found">
            <div>
                <h1 className="mb-4">
                    Ola! Eshoper 404 
                </h1>
                <div className="d-flex align-items-center">
                <p className="m-0">PAGE NOT FOUND</p>
                <Link to="/">
                <Button variant="outline-light" className="ms-5">Go to Home Page</Button>
                </Link>
                </div>
            </div>
            <div className="ms-5">
                <img src={image404} alt="404 not found!" />
            </div>
        </div>
    )
}
export default NotFound