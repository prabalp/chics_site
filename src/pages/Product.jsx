import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import {doc, getDoc, setDoc} from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import {auth, db} from "../firebase"
import { useNavigate } from 'react-router-dom'


// write code such that only the required part in rendered


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  // outline: 2px solid teal;
  // outline-offset: 2px;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  max-height: 60px;
  min-width: 80px;
  &:hover{
      background-color: #f8f4f4;
  }
`;


// // Understand the complet meaning of loader
export async function productLoader({params}){
  const docRef = doc(db, "testProducts", params.id);
  const product = await getDoc(docRef);
  return product.data();
}


const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("Black");
  const [userID, setuserID] = useState("");
  
  const data = useLoaderData();
  console.log(data)
  const navigate = useNavigate();

  // const isSignedIn = async () => {
  //   const user_state = await auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setuserID(user.uid);
  //       return true;
  //     } else {
  //       console.log("User is not signed in")
  //       navigate("/login")
  //       return false;
  //     }
  //   });

  //   return user_state;
  // }
  const addToCart = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuserID(user.uid);
        setDoc(doc(db,"users", user.uid), {
          // code to append to the card item
          cart: [{
            [data.id]: {
              name: data.name,
              image: data.image,
              price: data.price,
              quantity: quantity,
              size: size,
              color: color,
              },
              }],
        }).then(()=>{
          console.log("Item added to cart successfully")
        }).catch((error)=>{
          console.error("Error writing document: ", error);
        });
      } else {
        console.log("User is not signed in")
        navigate("/login")
      }
    });
    // console.log("Added to Cart")
  }

        


    
  

  const addToWishlist = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuserID(user.uid);
        setDoc(doc(db,"users", user.uid), {
          // code to append to the card item
          wishlist: [{
            [data.id]: {
              name: data.name,
              image: data.image,
              price: data.price,
              quantity: quantity,
              size: size,
              color: color,
              },
              }],
        }).then(()=>{
          console.log("Item added to wishlist successfully")
        }).catch((error)=>{
          console.error("Error writing document: ", error);
        });
      } else {
        console.log("User is not signed in")
        navigate("/login")
      }
    })
    // console.log("Added to Wishlist")
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={data.image}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{data.name}</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Price>INR {data.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterSize>
                <FilterSizeOption >Black</FilterSizeOption>
                <FilterSizeOption>Blue</FilterSizeOption>
                <FilterSizeOption>Gray</FilterSizeOption>
              </FilterSize>
              {/* <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" /> */}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>{return quantity == 1 ? 1:setQuantity(quantity-1)}}/>
              <Amount>{quantity}</Amount>
              <Add onClick ={()=>setQuantity(quantity+1)}/>
            </AmountContainer>
            <Button onClick={addToCart}>Add to Cart</Button>
            <Button onClick={addToWishlist}>Wishlist</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
