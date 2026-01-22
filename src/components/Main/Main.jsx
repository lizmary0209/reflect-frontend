import { useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import Preloader from "../Preloader/Preloader";
import { SAMPLE_QUOTE } from "../../utils/constants";
import "./Main.css";


function Main() {
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
                    <button className="journal__button" type="button">
                        New Entry
                    </button>
                </div>

                <ul className="journal__list">
                    <li className="journal__empty">
                        No entries yet. Click <strong>New entry</strong> to start.
                    </li>
                </ul>
            </section>
        </main>
    );
    }

export default Main;