import React, { useEffect, useState } from "react";
// import NavBar from '../components/Nav/Backup'
//import Footer from '../components/Footer/index';
import API from "../utils/API";
import Navbar from "../components/Nav/index";
// import {Container} from '../components/Grid';
import { Card, Button, CardTitle} from "reactstrap";
import "./Home.css";
import Wrapper from "../components/Wrapper";
import { useAppContext } from '../utils/AppContext';

export default function Home(props) {
  const { userHasAuthenticated } = useAppContext();
  const [cards, setCards] = useState([]);

  //Load all books and store them with setCards
  useEffect(() => {
    onLoad();
    loadCards();
  }, []);

  function loadCards() {
    API.getAllRooms()
      .then((res) => {
        console.log(res.data[0].rooms);
        setCards(res.data[0].rooms);
      })
      .catch((err) => console.log(err));
  }

  function onLoad() {
    userHasAuthenticated(true);
  }
  // function onLoad() {
  //   API.getJwt()
  //   .then(res => {
  //     if (res.data === "No Token"){
  //     userHasAuthenticated(false);
  //       props.history.push("/");
  //     }
  //     else {
  //       userHasAuthenticated(true);
  //     }
  //   })
  //   .catch(err => console.log(err))
  //   // setIsAuthenticating(false);
  // }

  const handleLogOutRequest = (e) => {
    console.log("User trying to log out");
    API.outUser()
      .then((res) => {
        console.log(props);
        console.log(res);
        if (res.status === 200) {
          props.history.push("/");
        }
        console.log(`Status:${res.status} Successfully Logged Out`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar logout={() => handleLogOutRequest()} />
      {cards.length ? (
        <Wrapper>
          {cards.map((card) => (
              <Card body inverse key={card._id}
              style={{ 
                backgroundImage: `url(${card.image})`, 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
              <CardTitle><br></br><br></br><br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br></CardTitle>
              <Button href={"google.com"} className="roomBtn">{card.room}</Button>
            </Card>
          ))}
        </Wrapper>
      ) : (
        <>
          <h3>What a gorgeous empty lot!</h3>
          <Button href="/survey">Click me to add rooms!</Button>
        </>
      )}
      
    </>
  );
}
