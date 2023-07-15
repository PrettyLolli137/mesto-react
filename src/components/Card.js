import React from "react";

function Card({ card, onCardClick }) {
    function handleCardClick() {
        onCardClick(card);
    }



    return (
        <ul className="groups__group">
            <li className="groups__element">
                <img
                    className="groups__image groups__image_popup_opened"
                    src={card.link}
                    alt="Фото"
                    onClick={handleCardClick}
                />
                <button className="groups__deletebtn"></button>
                <div className="groups__mask">
                    <h2 className="groups__text">{card.name}</h2>
                    <div className="groups__like-container">
                        <button type="button" className="groups__like">
                            <p className="groups__like-counter">{card.likes.length}</p>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Card;




/*

<ul className="groups__group">
</ul>
*/