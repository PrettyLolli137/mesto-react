import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.jsx";

import api from "../utils/Api.js";

function App() {
  // стейты попапов
  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopup, setDeleteCardPopup] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
 // const [isPreRender, setIsPreRender] = useState(false)

  // стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  // стейт карточек
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");
 // const [isLoadingGif, setIsLoadingGif]  = useState(true)

  function handleEditProfileClick() {
    setEditPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function handleDeleteCard(cardId) {
    setDeleteCardPopup(true);
    setDeleteCardId(cardId);
  }

  function closeAllPopups() {
    setEditPopupOpen(false);
    setAvatarPopupOpen(false);
    setAddPopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopup(false);
    setImagePopup(false);
  }



  useEffect(() => {
   // setIsLoadingGif(true)
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([resData, resCardInfo]) => {
        setCurrentUser(resData);
        setCards(resCardInfo);
     //   setIsLoadingGif(false)
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }, []);




  function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
   // setIsPreRender(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
       // setIsPreRender(false);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
      api.setUserInfo(dataUser)
        .then(res => {
          setCurrentUser(res);
          closeAllPopups()
          reset()
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    }

    function handleUpdateAvatar(dataUser, reset){
      api.updateUserAvatar(dataUser)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }

  function handleAddPlace(cardInfo, reset){
    api.addCard(cardInfo)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
      reset()
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err}`));
}
    
  
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          //1. Обработчики. При клике вызывается функция
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeleteCard}
          cards={cards}
        //  isLoading={isLoadingGif}
        />
        <Footer />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          name="add"
          title="Новое место"
          btnText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
          isOpen={isDeletePopup}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
        //  isPreRender={isPreRender}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
