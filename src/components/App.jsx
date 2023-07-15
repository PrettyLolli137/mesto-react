
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupImage from './PopupImage';
import PopupWithForm from './PopupWithForm';


function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);



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
  }

  function closeAllPopup() {
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setSelectedCard(null)
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
      />
      <Footer />
      <PopupImage
        card={selectedCard}
        onClose={closeAllPopup}

      />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        btnText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
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
        onClose={closeAllPopup}
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
        onClose={closeAllPopup}
      >
        <input id="url" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
          name="link" required />
        <span id="error-url" className="url-error popup__error popup__error_visible"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        btnText="Да"
      />
    </div>
    
    
  );

};

export default App;
