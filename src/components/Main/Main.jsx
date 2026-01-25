import { useEffect, useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import Preloader from "../Preloader/Preloader";
import { getTodayQuote } from "../../utils/api";
import "./Main.css";


function Main({ entries, isLoading, isLoggedIn, onOpenNewEntry }) {
const [isLoadingQuote, setIsLoadingQuote] = useState(false);
const [quote, setQuote] = useState(null);
const [quoteError, setQuoteError] = useState(false);

useEffect(() => {
    setIsLoadingQuote(true);
    setQuoteError(false);

    getTodayQuote()
    .then((data) => {
        setQuote(data);
    })
    .catch(() => {
        setQuoteError(true);
        setQuote(null);
    })
    .finally(() => {
        setIsLoadingQuote(false);
    });
}, []);


    return (
        <main className="main">
            <header className="main__header">
            <h1 className="main__title">Today</h1>
            <p className="main__subtitle">A quiet space to reflect and write.</p>
            </header>

            {isLoadingQuote ? (
        <Preloader text="Loading quote..." />
      ) : quoteError ? (
        <div className="quote-fallback">Quote unavailable right now. Please try again later.</div>
      ) : quote ? (
        <QuoteCard quote={quote.q} author={quote.a} />
      ) : (
        <div className="quote-fallback">Quote unavailable right now. Please try again later.</div>
      )}

      <section className="journal" aria-label="Journal">
        <div className="journal__header">
          <h3 className="journal__title">Your journal</h3>
          <button className="journal__button" type="button" onClick={onOpenNewEntry} disabled={!isLoggedIn}>
            New Entry
          </button>
        </div>

        {!isLoggedIn ? (
          <ul className="journal__list">
            <li className="journal__empty">Please sign in to view your journal.</li>
          </ul>
        ) : isLoading ? (
          <Preloader text="Loading entries..." />
        ) : entries && entries.length > 0 ? (
          <ul className="journal__list">
            {entries.map((entry) => (
              <li key={entry._id} className="journal__item">
                <h4 className="journal__item-title">{entry.title}</h4>
                <p className="journal__item-body">{entry.body}</p>
                {entry.mood ? <p className="journal__item-mood">{entry.mood}</p> : null}
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