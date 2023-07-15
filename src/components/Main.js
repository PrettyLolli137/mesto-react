import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserJob] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState();


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([dataUser, dataCards]) => {
                setUserName(dataUser.name);
                setUserJob(dataUser.about);
                setUserAvatar(dataUser.avatar);
                setCards(dataCards);
            })
            .catch(err => console.log(`Что-то пошло не так: ${err}`));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-btn" onClick={onEditAvatar}>
                    <img src={userAvatar ? userAvatar.toString() : ''} alt="Аватар" className="profile__image" />
                </button>
                <div className="profile__info">
                    <div className="profile__informs">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="groups">
            {cards ? (
                    cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </main>
    );
};

export default Main;

/*
{cards ? (
                    cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}


*/
