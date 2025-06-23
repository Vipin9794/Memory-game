import React from 'react';
import './MemoryGame.css';

class MemoryGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            flippedCards: [],
            matchedCards: [],
            isGameComplete: false,
        };
    }

    componentDidMount() {
        this.initializeGame();
    }

    initializeGame = () => {
        const emojiCodes = [
            0x1F436, // 🐶
            0x1F431, // 🐱
            0x1F42D, // 🐭
            0x1F439, // 🐹
            0x1F430, // 🐰
            0x1F98A  // 🦊
        ];

        const images = emojiCodes.map(code => String.fromCodePoint(code));

        const cards = [...images, ...images]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({ id: index, value: item, flipped: false }));

        this.setState({ cards, flippedCards: [], matchedCards: [], isGameComplete: false });
    };

    handleCardClick = (card) => {
        const { flippedCards, matchedCards, cards } = this.state;

        if (flippedCards.length === 2 || flippedCards.includes(card.id) || matchedCards.includes(card.id)) {
            return;
        }

        const newFlipped = [...flippedCards, card.id];
        this.setState({ flippedCards: newFlipped });

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard.value === secondCard.value) {
                const newMatched = [...matchedCards, firstId, secondId];
                this.setState({ matchedCards: newMatched, flippedCards: [] });

                // Check game complete
                if (newMatched.length === cards.length) {
                    this.setState({ isGameComplete: true });
                }

            } else {
                setTimeout(() => {
                    this.setState({ flippedCards: [] });
                }, 1000);
            }
        }
    };

    render() {
        return (
            <div className="memory-game-container">
                <h2 className="memory-game-title">Memory Game (Class Component)</h2>
                <button className="memory-game-button" onClick={this.initializeGame}>Reset Game</button>

                {this.state.isGameComplete && (
                    <div className="congratulations-message">
                        🎉 Congratulations! You completed the game! 🎉
                    </div>
                )}

                <div className="memory-game-grid">
                    {this.state.cards.map((card) => (
                        <div key={card.id} onClick={() => this.handleCardClick(card)}
                            className="memory-card">
                            {this.state.flippedCards.includes(card.id) || this.state.matchedCards.includes(card.id) ? card.value : '?'}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MemoryGame;
