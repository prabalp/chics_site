import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import {db} from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "testProducts"));  
      const products = querySnapshot.docs.map((doc) => {
        console.log(doc)
        return doc});
      setProducts(products);
    };
    getProducts();
  }, []);

  console.log(products)
  return (
    <Container>
      {products.map((item) => (
        // <Product item={item} key={item.id} />
        <Product item={item.data()} id= {item.id} key ={item.id}/>
      ))}
    </Container>
  );
};

export default Products;
