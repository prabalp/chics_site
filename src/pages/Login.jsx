import styled from "styled-components";
import {mobile} from "../responsive";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect} from "react";
import app from "../firebase";
import {Link, useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('haha')
        navigate("/")
      } else {
        // User is signed out
        // ...
      }
      // ...
    });
    return unsubscribe;
  }, );

  const handleLogin = (e) => {  
    e.preventDefault()
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user)
      navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });}
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}  value={email}/>
          <Input placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}  value={password}/>
          <Button onClick={handleLogin}>LOGIN</Button>
          <StyledLink>DO NOT YOU REMEMBER THE PASSWORD?</StyledLink>
          <StyledLink to ={'/register'}>CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
