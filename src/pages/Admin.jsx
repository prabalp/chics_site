import styled from "styled-components";

import { useState, useEffect } from "react";
import {getFirestore, doc, setDoc } from "firebase/firestore"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 } from "uuid";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
    flex-direction: column;
    `;



const Admin = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [name, setName] = useState(['Denim', 'Jumpsuit','Tshirt', 'Shirt', 'Kurta']);
    const [price, setPrice] = useState(0);
  
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {  

          setImageUrls((prev) => [...prev, url]);
        });
      });
    };
  
    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
            console.log(item)
          getDownloadURL(item).then((url) => {  

            setDoc(doc(db, "testProducts", item.name.split('.')[0]), {
                name: name[Math.floor(Math.random() * name.length)],
                price: Math.floor(Math.random() * 1000),
                image: url,
                }).then(() => {
                console.log("Document successfully written!");
                })



            // setImageUrls((prev) => [...prev, url]);
          });
        });

      });
    }, []);
  return (
    // <Container>
    //   <Navbar />
    //   <Announcement />
    //   <Wrapper>
    //     <ImgContainer>
    //       <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
    //     </ImgContainer>
    //     <InfoContainer>
    //       <Title>Denim Jumpsuit</Title>
    //       <Desc>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    //         venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
    //         iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
    //         tristique tortor pretium ut. Curabitur elit justo, consequat id
    //         condimentum ac, volutpat ornare.
    //       </Desc>
    //       <Price>$ 20</Price>
    //       <FilterContainer>
    //         <Filter>
    //           <FilterTitle>Color</FilterTitle>
    //           <FilterColor color="black" />
    //           <FilterColor color="darkblue" />
    //           <FilterColor color="gray" />
    //         </Filter>
    //         <Filter>
    //           <FilterTitle>Size</FilterTitle>
    //           <FilterSize>
    //             <FilterSizeOption>XS</FilterSizeOption>
    //             <FilterSizeOption>S</FilterSizeOption>
    //             <FilterSizeOption>M</FilterSizeOption>
    //             <FilterSizeOption>L</FilterSizeOption>
    //             <FilterSizeOption>XL</FilterSizeOption>
    //           </FilterSize>
    //         </Filter>
    //       </FilterContainer>
    //       <AddContainer>
    //         <AmountContainer>
    //           <Remove />
    //           <Amount>1</Amount>
    //           <Add />
    //         </AmountContainer>
    //         <Button>ADD TO CART</Button>
    //       </AddContainer>
    //     </InfoContainer>
    //   </Wrapper>
    //   {/* <Newsletter /> */}
    //   <Footer />
    // </Container>
    <Container>
        <div className="App">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <input type="text" placeholder="name" />
          <input type="text" placeholder="price" />
          <button onClick={uploadFile}> Upload Image</button>
          {/* {imageUrls.map((url) => {
            return <img src={url} />;
          })} */}
        </div>
    </Container>
  );
};

export default Admin;
