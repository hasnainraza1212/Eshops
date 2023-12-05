import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useLogin } from "./../../firebase/useFirebase"
import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1.3.2/+esm'
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  // const [accessToken, setAccessToken] = useState("")
  const [formData, setFormData] = useState(
    {
      email: "",
      password: "",
      isAgree: false
    }
  )
  const [errors, setErrors] = useState({})
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    isAgree: yup.bool().required().oneOf([true], 'Terms must be accepted')
  })


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue =
      type === "checkbox"
        ? checked
        : value
    setFormData({
      ...formData,
      [name]: fieldValue
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const obj = { email: formData.email, password: formData.password }
      const user = await useLogin(obj)
      if (user.accessToken) {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("fireBaseAccessToken", user.accessToken)
        // setAccessToken(user.accessToken)
        navigate("/")
      }


    } catch (arrayOfErrors) {
      const objOfErrors = {};
      arrayOfErrors.inner.forEach((error) => {
        objOfErrors[error.path] = error.message
      })
      setErrors(objOfErrors)
    }
  }
// useEffect(()=>{
// const accessToken = localStorage.getItem("fireBaseAccessToken")
// if(accessToken){
//     return navigate("/")
// }
// },[accessToken])

  return (
    <div className = "app">
      <h1>Login</h1>
      <Form>
        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => { handleInputChange(e) }}
            type="email"
            name="email"
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => { handleInputChange(e) }}
            type="password"
            name="password"
            placeholder="Password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            required
            name="isAgree"
            label="Agree to terms and conditions"
            onChange={(e) => { handleInputChange(e) }}
            type="checkbox"
            isInvalid={!!errors.isAgree}
            feedback={errors.isAgree}
            feedbackType="invalid"
            id="validationFormik0"
          />
        </Form.Group>
        <Button onClick={handleLogin} variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}
export default Login


