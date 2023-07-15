
import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import PopupWithForm from './PopupWithForm.jsx';


function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeletePopup, setDeleteCardPopup] = React.useState(false);
  const [isImagePopup, setImagePopup] = React.useState(false);




  function handleEditProfileClick() {
    setEditPopupOpen(true)
  }


  function handleEditAvatarClick() {
    setAvatarPopupOpen(true)
  }


  function handleAddPlaceClick() {
    setAddPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);

  }

  function handleDeleteCard() {
    setDeleteCardPopup(true);
  }

  function closeAllPopups() {
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setSelectedCard(null)
    setDeleteCardPopup(false)
    setImagePopup(false)
  }




  return (
    <div className="page">
      <Header />
      <Main

        //1. Обработчики. При клике вызывается функция
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteCard={handleDeleteCard}
      />
      <Footer />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}

      />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        btnText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__input-elements">
          <input id="username" type="text" placeholder="Введите Имя"
            className="popup__input popup__input_type_name" name="username" required minLength="2"
            maxLength="40" />
          <span id="error-username" className="username-error popup__error popup__error_visible"></span>
        </label>
        <label className="popup__input-elements">
          <input id="job" type="text" placeholder="Введите профессию"
            className="popup__input popup__input_type_job" name="job" required minLength="2" maxLength="200" />
          <span id="error-job" className="job-error popup__error popup__error_visible"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        btnText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input id="usernameAdd" type="text" placeholder="Название" className="popup__input popup__input_type_text "
          name="name" required minLength="2" maxLength="30" />
        <span id="error-usernameAdd" className="usernameAdd-error popup__error popup__error_visible"></span>
        <input id="url" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
          name="link" required />
        <span id="error-url" className="url-error popup__error popup__error_visible"></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        btnText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input id="url" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
          name="link" required />
        <span id="error-url" className="url-error popup__error popup__error_visible"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        btnText="Да"
        isOpen={isDeletePopup}
        onClose={closeAllPopups}
      />
    </div>
    
    
  );

};

export default App;
