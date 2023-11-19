
function App() {
    const [quote, setQuote] = React.useState("");
    const [randomQuote, setRandomQuote] = React.useState({});
    const [color, setColor] = React.useState('black')

    React.useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                const data = await response.json();

                // Assuming data is an array of quotes, set a single quote
                const randomIndex = Math.floor(Math.random() * data.length);
                setQuote(data);

                // Set the entire random quote object
                setRandomQuote(data[randomIndex]);

            } catch (err) {
                console.log(err.message);
            }

        }
        getData();

    }, [])

    
    const colorCode = ['#4A90E2', '#FF6347', '#2E8B57', '#800080', '#4682B4', '#FFD700', '#A52A2A', '#008080', '#8B4513', '#9400D3'];

    function randomColor() {
        const randomIndex = Math.floor(Math.random() * colorCode.length);
        setColor(colorCode[randomIndex]);
    }

    function cleanAuthor(author) {
        // Remove "type.fit" from the author string
        return author.replace(', type.fit', '');
    }

    function randomQuoteGenerate() {
        const randomIndex = Math.floor(Math.random() * quote.length);
        const cleanedAuthor = cleanAuthor(quote[randomIndex].author);
        setRandomQuote({
            text: quote[randomIndex].text,
            author: cleanedAuthor
        });
        randomColor();
    }

    return (
        <div style={{ backgroundColor: color,minHeight:"100vh"}} >
            <div className="container pt-5 " >
                <div className="flex align-items-center justify-content-center">
                    <div className="card  justify center">
                        <div className="card-header">Random Quotes</div>
                        <div className="card-body">{
                                randomQuote ?
                                <>
                                <h5 className="card-title">{(randomQuote.author)  || "No Author"}</h5> 
                                <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                                </>
                                : <h3>Loading.....</h3>
        

                            }
                            <div className="row">
                                <div className="col">
                                        <button onClick={()=> {randomQuoteGenerate(); randomColor();}} className="btn btn-primary mt-2">Change Quote </button>   
                                    <a href="https://twitter.com/login?lang=en" target='_blank' className='btn btn-dark mx-3'>
                                    <i class="fa-brands fa-x-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com/" target='_blank' className='btn btn-danger mx-2'>
                                    <i class="fa-brands fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                            
                         </div>
                    </div>

                </div>
                
                
                
            </div>

        </div>
    );
}


ReactDOM.render(<App />,document.getElementById("app"))