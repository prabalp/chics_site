import styled from "styled-components";
import { mobile } from "../responsive";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore, doc, setDoc } from "firebase/firestore"
import { useState} from "react";
import { useNavigate } from 'react-router-dom'
import app from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const Register = () => {
  // create a way to save more info like phone number, address, etc.
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [firstname, setfirstname] = useState("")
const [lastname, setlastname] = useState("")
const [username, setusername] = useState("")
const [phone, setphone] = useState("")
const [address, setaddress] = useState("")



//code for firestore db
const navigate = useNavigate();


const handleRegister = () => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Signed in")
    const user = userCredential.user;
    const db = getFirestore(app);



    setDoc(doc(db, "users", user.uid), {
      email: user.email,
      // uid: user.uid,
      firstname: firstname ,
      lastname: lastname,
      username: username,
      phone: phone,
      address: address,
      cart: [],
      history: [],
    })
    .then(() => {
      console.log("Document successfully written!");
      // alert("Done")
      // history.push("/login")
      navigate("/login")
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    })

    // ...
  })
  .catch((error) => {
    console.log(error.message)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

const handleSubmit = (e) => {
  e.preventDefault();
  handleRegister();
}
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Firstname" onChange={(e)=>{setfirstname(e.target.value)}}  value={firstname}/>
          <Input placeholder="Lastname" onChange={(e)=>{setlastname(e.target.value)}}  value={lastname}/>
          <Input placeholder="Username" onChange={(e)=>{setusername(e.target.value)}}  value={username} />
          <Input placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}  value={email}/>
          <Input placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}  value={password}/>
          <Input placeholder="Confirm Password" onChange={(e)=>{}} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
