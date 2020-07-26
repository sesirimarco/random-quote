import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = (props) => {
	return (
		<blockquote className="m-4 text-center">
			<p className="mb-0" id="text">
				<i className="fa fa-quote-left"></i> {props.quote} <i className="fa fa-quote-right fa"></i>
			</p>
			<footer 
				id="author" 
				className="blockquote-footer align-right"
			>
				{props.author}
			</footer>
		</blockquote>
	);
};
const Share = (props) => {
	const getHashTags = () => {
		return props.author
			.split(' ')
			.join(',');
	};
	return (
		<div>
			<a
				href={`https://twitter.com/intent/tweet?
				text=${props.quote}
				&url=${props.url}
				&hashtags=quotes,${getHashTags()}`}
				title="Share in twitter"
				id="tweet-quote"
				className="btn btn-secondary"
			>
				<i className="fa fa-twitter"></i> Share
			</a>
		</div>
	);
};
const NewQuote = (props) => {
	return (
		<div>
			<button
				id="new-quote"
				onClick={(e) => { props.handleClick() }}
				className="btn btn-primary"
			>
				New quote
      		</button>
		</div>
	);
};
const App = () => {
	const [quotes, setQuotes] = useState([]);
	const [currentQuote, setCurrentQuote] = useState('');
	const [load, setLoad] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc'
		}).then((response) => {
			setQuotes(response.data.quotes);
			setLoad(true);
		}).catch((error) => {
			setError(
					(error && error.message)
					? error.message 
					: {message: 'Network error.'}
				);
      		setLoad(true);
		});
	}, []);
  
    useEffect(() => {
	  setCurrentQuote(getRandomQuote());
	  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quotes]);

	const getRandomQuote = () => {
		return quotes[Math.floor(Math.random() * quotes.length)];
	};
	return (
		<div className="p-5">
			{
				load && error && <div className="alert alert-danger">
					Error: {error.message}
				</div>
			}
			{
				!load && <div className="row text-center align-items-center">
					<div className="col-12 mt-5 pt-5">
						<i className="fa fa-spinner fa-pulse fa-2x"></i>
					</div>
				</div>
			}
			{
				load && <div id="quote-box" className="card">
					<div className="card-body">
						<Quote
							quote={currentQuote.quote}
							author={currentQuote.author}
						/>
						<div className="row justify-content-around">
							<div className="col-xs-6">
								<Share
									quote={currentQuote && currentQuote.quote}
									author={currentQuote && currentQuote.author}
									url={'https://codepen.io/chesiri/pen/gOPyLwo?editors=0011'}
								/>
							</div>
							<div className="col-xs-6">
								<NewQuote handleClick={() => {
									setCurrentQuote(getRandomQuote());
								}} />
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
};
export default App;
