import { useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import Preloader from "../Preloader/Preloader";
import { SAMPLE_QUOTE } from "../../utils/constants";
import "./Main.css";


function Main({ entries, isLoading, isLoggedIn, onOpenNewEntry }) {
const [isLoadingQuote, setIsLoadingQuote] = useState(false);


    return (
        <main className="main">
            <header className="main__header">
            <h1 className="main__title">Today</h1>
            <p className="main__subtitle">A quiet space to reflect and write.</p>
            </header>

            <QuoteCard quote={SAMPLE_QUOTE.q} author={SAMPLE_QUOTE.a} />


            {isLoadingQuote && <Preloader text="Loading quote..." />}


            <section className="journal" aria-label="Journal">
                <div className="journal__header">
                    <h3 className="journal__title">Your journal</h3>
                    <button 
                    className="journal__button"
                     type="button"
                     onClick={onOpenNewEntry}
                     disabled={!isLoggedIn}>
                        New Entry
                    </button>
                </div>

            {!isLoggedIn ? (
                <ul className="journal__list">
                    <li className="journal__empty">
                        Please sign in to view your journal.</li>
                </ul>
        ) : isLoading ? (
    <Preloader text="Loading entries..." />
        ) : entries && entries.length > 0 ? (
    <ul className="journal__list">
        {entries.map((entry) => (
            <li key={entry._id} className="journal__item">
                <h4 className="journal__item-title">{entry.title}</h4>
                <p className="journal__item-body">{entry.body}</p>
                {entry.mood ? <p className="journal__item-mood">{entry.mood}</p>: null}
            </li>
        ))}
    </ul>
        ) : (
    <ul className="journal__list">
        <li className="journal__empty">
            No entries yet. Click <strong>New entry</strong> to start.
        </li>
    </ul>
 )}
            </section>
        </main>
    );
    }

export default Main;