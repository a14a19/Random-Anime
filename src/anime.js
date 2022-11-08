import React from "react";

class Genres extends React.Component{
    render(){
        return(
            <span>{this.props.gen}, </span>
        )
    }
}

class Anime extends React.Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            image: null,
            name: null,
            status: null,
            r_year: null,
            type: null,
            t_episodes: null,
            genre: [],
            synopsis: null,
            animeUrl: null
        }
    }
    clicked(){
        const randomNum = Math.round(Math.random()*19)
        console.log(randomNum);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ad85a5445mshff52b5e3d51aae1p1cc43ajsn425de8dc17b0',
                'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
            }
        };
        
        const options1 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ad85a5445mshff52b5e3d51aae1p1cc43ajsn425de8dc17b0',
                'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
            }
        };
        fetch('https://gogoanime2.p.rapidapi.com/popular', options)
            .then(response => response.json())
            .then(resp => {
                console.log(resp[randomNum].animeId);
                this.setState({
                    animeUrl: resp[randomNum].animeUrl
                })
                fetch(`https://gogoanime2.p.rapidapi.com/anime-details/${resp[randomNum].animeId}`, options1)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.setState({
                            loading: true,
                            image: data.animeImg,
                            name: data.animeTitle,
                            status: data.status,
                            r_year: data.releasedDate,
                            type: data.type,
                            t_episodes: data.totalEpisodes,
                            genre: data.genres,
                            synopsis: data.synopsis
                        })
                    })
                .catch(err => console.error(err));

            })
        .catch(err => console.error(err));
    }
    render(){
        const gen = this.state.genre.map((g, i) => {
            return <Genres gen={g} key={i}/>
        })
        return(
            <div className="App-header container">
                <button onClick={() => this.clicked()} className="btn">
                    Get Anime!
                </button>
                {
                    this.state.loading &&
                    <div>
                        <a 
                            href={this.state.animeUrl}  
                            target="_blank" 
                            rel="noreferrer"
                        >
                                <img 
                                    src={this.state.image} 
                                    alt="Anime Img" 
                                    className="img-anime"
                                />
                        </a>
                        <p>Name: {this.state.name}</p>
                        <p>Status: {this.state.status}</p>
                        <p>Release Year: {this.state.r_year}</p>
                        <p>Type: {this.state.type}</p>
                        <p>Total Episodes: {this.state.t_episodes}</p>
                        <p>Genres: {gen}.</p>
                        <p>Synopsis: {this.state.synopsis}</p>
                    </div>
                }
            </div>
        )
    }
}

export default Anime;